export default class EnvironmentVariables {
  static vars: Record<string, string | undefined> = {
    // GENERAL
    ENV: process.env.NODE_ENV,
    INCLUDE_WEB_ROOT: process.env.REACT_APP_INCLUDE_WEB_ROOT,
    // ARRANGER
    ARRANGER_API: process.env.REACT_APP_ARRANGER_API,
    // KEYCLOAK
    KC_AUTH_SERVER_URL: process.env.REACT_APP_KC_AUTH_SERVER_URL,
    KC_CLIENT_ID: process.env.REACT_APP_KC_CLIENT_ID,
    KC_REALM: process.env.REACT_APP_KC_REALM,
  };

  static configFor({ key }: { key: string }): string {
    return EnvironmentVariables.vars[key] || '';
  }
}
