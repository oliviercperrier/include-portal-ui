import Keycloak from "keycloak-js";
import EnvVariables from "helpers/EnvVariables";

const keycloak = Keycloak({
  realm: EnvVariables.configFor({ key: "KC_REALM" }),
  url: EnvVariables.configFor({ key: "KC_AUTH_SERVER_URL" }),
  clientId: EnvVariables.configFor({ key: "KC_CLIENT_ID" }),
});

export default keycloak;
