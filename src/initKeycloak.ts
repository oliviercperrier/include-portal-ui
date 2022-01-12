import Keycloak from "keycloak-js";
import EnvVariables from "helpers/EnvVariables";

const keycloak = Keycloak({
  realm: EnvVariables.configFor("KC_REALM"),
  url: EnvVariables.configFor("KC_AUTH_SERVER_URL"),
  clientId: EnvVariables.configFor("KC_CLIENT_ID"),
});

export default keycloak;
