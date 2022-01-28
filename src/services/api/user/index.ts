import EnvironmentVariables from "helpers/EnvVariables";
import keycloak from "auth/keycloak-api/keycloak";
import { IncludeKeycloakTokenParsed } from "common/tokenTypes";
import { TUser, TUserInsert, TUserUpdate } from "./models";
import { sendRequest } from "services/api";

const url = EnvironmentVariables.configFor("USERS_API");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${keycloak.token}`,
});

const fetch = () =>
  sendRequest<TUser>({
    method: "GET",
    url: `${url}/user`,
    headers: headers(),
  });

const create = (body?: Omit<TUserInsert, "keycloak_id">) => {
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
  return sendRequest<TUser>({
    method: "POST",
    url: `${url}/user`,
    headers: headers(),
    data: {
      ...body,
      first_name: body?.first_name || tokenParsed.given_name,
      last_name: body?.last_name || tokenParsed.family_name,
    },
  });
};

const update = (body: TUserUpdate) =>
  sendRequest<TUser>({
    method: "PUT",
    url: `${url}/user`,
    headers: headers(),
    data: body,
  });

const completeRegistration = (body: TUserUpdate) =>
  sendRequest<TUser>({
    method: "PUT",
    url: `${url}/user/complete-registration`,
    headers: headers(),
    data: body,
  });

export const UserApi = {
  fetch,
  create,
  update,
  completeRegistration,
};
