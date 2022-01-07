import { KeycloakTokenParsed } from "keycloak-js";

export type AlterTypes = "success" | "info" | "warning" | "error";

export interface IncludeKeycloakTokenParsed extends KeycloakTokenParsed {
  groups: string[];
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  identity_provider: string;
  identity_provider_identity: string;
}
