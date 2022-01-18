import { ReactElement } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphqlBackend, GraphqlProvider } from "provider/types";
import EnvironmentVariables from "helpers/EnvVariables";
import keycloak from "auth/keycloak-api/keycloak";

const ARRANGER_API = EnvironmentVariables.configFor("ARRANGER_API");
const PROJECT_ID = EnvironmentVariables.configFor("ARRANGER_PROJECT_ID");
const FHIR_API = EnvironmentVariables.configFor("FHIR_API");

const fhirLink = createHttpLink({
  uri: `${FHIR_API}/$graphql`,
});

const arrangerLink = createHttpLink({
  uri: `${ARRANGER_API}/${PROJECT_ID}/graphql`,
});

const getAuthLink = () =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${keycloak.token}`,
    },
  }));

const backendUrl = (backend: GraphqlBackend) =>
  backend === GraphqlBackend.FHIR ? fhirLink : arrangerLink;

const Provider = ({
  children,
  backend = GraphqlBackend.FHIR,
}: GraphqlProvider): ReactElement => {
  const header = getAuthLink();

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: header.concat(backendUrl(backend)),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;