import EnvironmentVariables from "helpers/EnvVariables";
import keycloak from "initKeycloak";
import { IncludeKeycloakTokenParsed } from "common/tokenTypes";
import { TUser, TUserInsert } from "./models";
import { sendRequest } from "services/api";

const url = EnvironmentVariables.configFor("USERS_API");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${keycloak.token}`,
});

const fetchUser = () => {
  return sendRequest<TUser>({
    method: "GET",
    url: `${url}/user`,
    headers: headers(),
  });
};

const createUser = (body?: Omit<TUserInsert, "keycloak_id">) => {
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
  return sendRequest<TUser>({
    method: "POST",
    url: `${url}/user`,
    headers: headers(),
    data: {
      ...body,
      keycloak_id: tokenParsed.sub,
      first_name: body?.first_name || tokenParsed.given_name,
      last_name: body?.last_name || tokenParsed.family_name,
    },
  });
};

export const UserApi = {
  fetchUser,
  createUser,
};
