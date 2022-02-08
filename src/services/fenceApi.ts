import jwtDecode from "jwt-decode";

import { isDecodedJwtExpired } from "utils/jwt";
import { FENCE_NAMES } from "common/fenceTypes";
import { DecodedJwt } from "common/tokenTypes";
import EnvironmentVariables from "helpers/EnvVariables";
import { sendRequest } from "./api";

const DCF = FENCE_NAMES.dcf;
const GEN3 = FENCE_NAMES.gen3;

const RESPONSE_TYPE = "code";

const GEN3_SCOPE = "openid+data+user";
const DCF_SCOPE = "openid+user";
const FENCE_AUTH_CLIENT_URI = EnvironmentVariables.configFor(
  "FENCE_AUTH_CLIENT_URI"
);
const FENCE_AUTH_REFRESH_URI = EnvironmentVariables.configFor(
  "FENCE_AUTH_REFRESH_URI"
);
const FENCE_AUTH_TOKENS_URI = EnvironmentVariables.configFor(
  "FENCE_AUTH_TOKENS_URI"
);
const GEN3_API_ROOT = EnvironmentVariables.configFor("GEN3_API");
const DCF_API_ROOT = EnvironmentVariables.configFor("DCF_API");
const IDP = EnvironmentVariables.configFor("IDP");

const getScope = (fenceName: FENCE_NAMES) => {
  switch (fenceName) {
    case GEN3:
      return GEN3_SCOPE;
    case DCF:
      return DCF_SCOPE;
    default:
      return "";
  }
};

// Fetch all fence auth_client details on page load for pages needing the fence API.
//  When connecting to a fence, the window.open call has to happen in the same synchronus callstack
//  as the event handler, so client_id and redirect_uri must be available at all times.
const PROVIDERS = {
  gen3: { fenceUri: GEN3_API_ROOT },
  dcf: { fenceUri: DCF_API_ROOT },
};

/*
 * Connect To A Fence
 *  Opens a new tab/window that calls to fence provider, sending our client ID and redirect URL
 *  Then this starts a 1 second repeating interval that checks for a new api token in the key manager
 *  This lasts for 1 Minute before failing outright (no effect or state change)
 */
const TEN_MINUTES_IN_MS = 1000 * 60 * 10;

export const fenceConnect = async (fence: FENCE_NAMES) => {
  const authCliUri = `${FENCE_AUTH_CLIENT_URI}?fence=${fence}`;
  const authCliRawResponse = await fetch(authCliUri);
  const authCliResponse = await authCliRawResponse.json();
  const redirectUri = authCliResponse.redirect_uri;
  const clientId = authCliResponse.client_id;

  const { fenceUri } = PROVIDERS[fence];
  const scope = getScope(fence);
  // eslint-disable-next-line max-len
  const url = `${fenceUri}/user/oauth2/authorize?client_id=${clientId}&response_type=${RESPONSE_TYPE}&scope=${scope}&redirect_uri=${redirectUri}&idp=${IDP}`;
  const authWindow = window.open(url)!;
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      if (authWindow.closed) {
        try {
          const token = await fetchTokenThenRefreshIfNeeded(fence);
          clearInterval(interval);
          resolve(token);
        } catch (e) {
          clearInterval(interval);
          reject({ msg: "Error occurred while fetching Fence Access Token." });
        }
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      reject("nothing");
    }, TEN_MINUTES_IN_MS);
  });
};

export const fetchAccessToken = async (fenceName: FENCE_NAMES) => {
  const { data } = await sendRequest({
    method: "GET",
    url: `${FENCE_AUTH_TOKENS_URI}?fence=${fenceName}`,
  });
  return data.access_token;
};

export const fetchRefreshedAccessToken = async (fenceName: FENCE_NAMES) => {
  const { data } = await sendRequest({
    method: "POST",
    url: `${FENCE_AUTH_REFRESH_URI}?fence=${fenceName}`,
  });
  return data.access_token;
};

const fetchTokenThenRefreshIfNeeded = async (fenceName: FENCE_NAMES) => {
  let token = await fetchAccessToken(fenceName);
  const decodedToken = jwtDecode<DecodedJwt>(token);
  if (isDecodedJwtExpired(decodedToken)) {
    token = await fetchRefreshedAccessToken(fenceName);
  }
  return token;
};

export const getFenceConnection = async (
  fenceName: FENCE_NAMES
): Promise<{ data: any; error: any }> => {
  const token = await fetchTokenThenRefreshIfNeeded(fenceName);
  const { fenceUri } = PROVIDERS[fenceName];
  const { data, error } = await sendRequest({
    url: `${fenceUri}/user/user`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  /** @namespace data.project_access*/
  return {
    data: { ...data, projects: data.project_access, error },
    error,
  }; //Backward compatibility.
};

/*
 * Delete Tokens (Disconnect)
 */
export const deleteFenceTokens = async (fenceName: FENCE_NAMES) => {
  await sendRequest({
    method: "DELETE",
    url: `${FENCE_AUTH_TOKENS_URI}?fence=${fenceName}`,
  });
};
