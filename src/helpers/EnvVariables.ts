export default class EnvironmentVariables {
  static vars: Record<string, string | undefined> = {
    // GENERAL
    ENV: process.env.NODE_ENV,
    INCLUDE_WEB_ROOT: process.env.REACT_APP_INCLUDE_WEB_ROOT,
    // APIS
    ARRANGER_API: process.env.REACT_APP_ARRANGER_API_URL,
    ARRANGER_PROJECT_ID: process.env.REACT_APP_ARRANGER_PROJECT_ID,
    USERS_API: process.env.REACT_APP_USERS_API_URL,
    RIFF_API: process.env.REACT_APP_RIFF_API_URL,
    FENCE_AUTH_CLIENT_URI: process.env.REACT_APP_FENCE_AUTH_CLIENT_URI,
    FENCE_AUTH_REFRESH_URI: process.env.REACT_APP_FENCE_REFRESH_URI,
    FENCE_AUTH_TOKENS_URI: process.env.REACT_APP_FENCE_TOKENS_URI,
    // KEYCLOAK
    KC_AUTH_SERVER_URL: process.env.REACT_APP_KC_AUTH_SERVER_URL,
    KC_CLIENT_ID: process.env.REACT_APP_KC_CLIENT_ID,
    KC_REALM: process.env.REACT_APP_KC_REALM,
    // USERSNAP
    USER_SNAP_API_KEY: process.env.REACT_APP_USER_SNAP_API_KEY,
  };

  static configFor(key: string): string {
    return EnvironmentVariables.vars[key] || "";
  }
}

export const getEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_${key}`] as any) || defaultValue;

export const getFTEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_FT_${key}`] as any) || defaultValue;
