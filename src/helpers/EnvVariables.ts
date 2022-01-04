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
    // USERSNAP
    USER_SNAP_API_KEY: process.env.REACT_APP_USER_SNAP_API_KEY,
  };

  static configFor({ key }: { key: string }): string {
    return EnvironmentVariables.vars[key] || "";
  }
}

export const getEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_${key}`] as any) || defaultValue;

export const getFTEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_FT_${key}`] as any) || defaultValue;
