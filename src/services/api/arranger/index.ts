import EnvironmentVariables from 'helpers/EnvVariables';
import {
  ARRANGER_API_COLUMN_STATE_URL,
  ARRANGER_API_DOWNLOAD_URL,
  ARRANGER_API_PROJECT_URL,
} from 'provider/ApolloProvider';
import { sendRequest } from 'services/api';
import { ArrangerColumnStateResults, ArrangerPhenotypes, IStatistics } from './models';

const ARRANGER_API_URL = EnvironmentVariables.configFor('ARRANGER_API');
const ARRANGER_PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');

const headers = () => ({
  'Content-Type': 'application/json',
});

const fetchStatistics = () =>
  sendRequest<IStatistics>({
    method: 'GET',
    url: `${ARRANGER_API_URL}/statistics`,
    headers: headers(),
  });

const fetchPhenotypes = <T = any>(data: ArrangerPhenotypes) => {
  return sendRequest<T>({
    method: 'POST',
    url: `${ARRANGER_API_URL}/phenotypes`,
    data: { ...data, project: ARRANGER_PROJECT_ID },
  });
};

const graphqlRequest = <T = any>(data: { query: any; variables: any }) =>
  sendRequest<T>({
    method: 'POST',
    url: ARRANGER_API_PROJECT_URL,
    data,
  });

const download = <T = any>(data: URLSearchParams) =>
  sendRequest<T>({
    method: 'POST',
    url: ARRANGER_API_DOWNLOAD_URL,
    data,
  });

const columnStates = (data: { query: any; variables: any }) =>
  sendRequest<ArrangerColumnStateResults>({
    method: 'POST',
    url: ARRANGER_API_COLUMN_STATE_URL,
    data,
  });

export const ArrangerApi = {
  fetchStatistics,
  graphqlRequest,
  download,
  fetchPhenotypes,
  columnStates,
};
