import EnvironmentVariables from "helpers/EnvVariables";
import keycloak from "auth/keycloak-api/keycloak";
import {
  TUserSavedFilter,
  TUserSavedFilterInsert,
  TUserSavedFilterUpdate,
} from "./models";
import { sendRequest } from "services/api";

const url = `${EnvironmentVariables.configFor("USERS_API")}/saved-filters`;

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${keycloak.token}`,
});

const fetchAll = (tag?: string) =>
  sendRequest<TUserSavedFilter[]>({
    method: "GET",
    url: `${url}${tag ? "/tag/" + tag : ""}`,
    headers: headers(),
  });

const fetchById = (id: string) =>
  sendRequest<TUserSavedFilter>({
    method: "GET",
    url: `${url}/${id}`,
    headers: headers(),
  });

const create = (body: TUserSavedFilterInsert) => {
  return sendRequest<TUserSavedFilter>({
    method: "POST",
    url,
    headers: headers(),
    data: body,
  });
};

const update = (id: string, body: TUserSavedFilterUpdate) =>
  sendRequest<TUserSavedFilter>({
    method: "PUT",
    url: `${url}/${id}`,
    headers: headers(),
    data: body,
  });

const setAsDefault = (id: string, body: TUserSavedFilterUpdate) =>
  sendRequest<TUserSavedFilter>({
    method: "PUT",
    url: `${url}/${id}/default`,
    headers: headers(),
    data: body,
  });

const destroy = (id: string) =>
  sendRequest<string>({
    method: "DELETE",
    url: `${url}/${id}`,
    headers: headers(),
  });

export const SavedFilterApi = {
  fetchAll,
  fetchById,
  create,
  update,
  destroy,
  setAsDefault,
};
