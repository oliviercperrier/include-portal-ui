import EnvironmentVariables from "helpers/EnvVariables";
import keycloak from "auth/keycloak-api/keycloak";
import { sendRequest } from "services/api";
import {
  TRiffEntity,
  TRiffEntityCreate,
  TRiffEntityUpdate,
  TUpdateFilterArg,
} from "./models";
import {
  RIFF_TYPES,
  TRiffContent,
  TRiffSavedFilterContent,
} from "store/riff/types";

const url = EnvironmentVariables.configFor("RIFF_API");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${keycloak.token}`,
});

const fetchRiffUser = () =>
  sendRequest<TRiffEntity<TRiffContent>[]>({
    method: "GET",
    url: `${url}/user/${keycloak.tokenParsed?.sub}`,
    headers: headers(),
  });

const createRiffEntity = <TReturnContent = TRiffContent>(
  data: TRiffEntityCreate<TRiffContent>
) => {
  return sendRequest<TRiffEntity<TReturnContent>>({
    method: "POST",
    url: `${url}/shorten`,
    headers: headers(),
    data: {
      userid: keycloak.tokenParsed?.sub,
      ...data,
    },
  });
};

const updateSavedFilter = (
  updateData: TUpdateFilterArg & { riffId: string }
) => {
  const data: TRiffEntityUpdate<TRiffSavedFilterContent> = {
    alias: updateData.savedFilter.title,
    content: {
      riffType: RIFF_TYPES.FILTER,
      filterType: updateData.type,
      filter: updateData.savedFilter,
    },
    sharedPublicly: false,
  };
  return sendRequest<TRiffEntity<TRiffSavedFilterContent>>({
    method: "PUT",
    url: `${url}/${updateData.riffId}`,
    headers: headers(),
    data: data,
  });
};

const deleteSavedFilter = (riffId: string) => {
  return sendRequest<boolean>({
    method: "DELETE",
    url: `${url}/${riffId}`,
    headers: headers(),
    data: {
      userid: keycloak.tokenParsed?.sub,
    },
  });
};

export const RiffApi = {
  fetchRiffUser,
  updateSavedFilter,
  deleteSavedFilter,
  createRiffEntity,
};
