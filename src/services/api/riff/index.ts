import EnvironmentVariables from "helpers/EnvVariables";
import keycloak from "auth/keycloak-api/keycloak";
import { sendRequest } from "services/api";
import { TRiffEntity, TRiffEntityCreate } from "./models";
import { TRiffContent } from "store/riff/types";

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

export const RiffApi = {
  fetchRiffUser,
  createRiffEntity,
};
