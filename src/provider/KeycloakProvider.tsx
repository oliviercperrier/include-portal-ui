import React, { ReactElement } from "react";
import {
  AuthClientError,
  AuthClientEvent,
} from "@react-keycloak/core/lib/types";
import EnvVariables from "helpers/EnvVariables";
import { ReactKeycloakProvider as KeycloakProvider } from "@react-keycloak/web";
import keycloak from "initKeycloak";

export interface IProvider {
  children: React.ReactNode;
}

const eventLogger = (eventType: AuthClientEvent, error?: AuthClientError) => {
  if (EnvVariables.configFor({ key: "ENV" }) === "development" && error) {
    console.error("eventLogger ", "eventType ", eventType);
    console.error("eventLogger ", error);
  }
};

const Keycloak = ({ children }: IProvider): ReactElement => (
  <KeycloakProvider authClient={keycloak} onEvent={eventLogger}>
    {children}
  </KeycloakProvider>
);

export default Keycloak;
