import EnvironmentVariables from 'helpers/EnvVariables';
import { sendRequest } from 'services/api';
import {
  ICavaticaBillingGroup,
  ICavaticaCreateProjectBody,
  ICavaticaListPayload,
  ICavaticaProject,
  ICavaticaProjectChild,
  ICavaticaProjectMember,
} from './models';

const url = EnvironmentVariables.configFor('CAVATICA_API');
const token = process.env.REACT_APP_CAVATICA_TOKEN!; // temporary

const headers = () => ({
  'Content-Type': 'application/json',
  'X-SBG-Auth-Token': token,
});

const fetchProjects = () =>
  sendRequest<ICavaticaListPayload<ICavaticaProject>>({
    method: 'GET',
    url: `${url}/projects`,
    headers: headers(),
  });

const fetchProjetMembers = (projectId: string) =>
  sendRequest<ICavaticaListPayload<ICavaticaProjectMember>>({
    method: 'GET',
    url: `${url}/projects/${projectId}/members`,
    headers: headers(),
  });

const fetchBillingGroups = () =>
  sendRequest<ICavaticaListPayload<ICavaticaBillingGroup>>({
    method: 'GET',
    url: `${url}/billing/groups`,
    headers: headers(),
  });

const createProject = (data: ICavaticaCreateProjectBody) =>
  sendRequest<ICavaticaProject>({
    method: 'POST',
    url: `${url}/projects`,
    headers: headers(),
    data,
  });

const listFilesAndFolders = (parentId: string, isProject: boolean = false) =>
  sendRequest<ICavaticaListPayload<ICavaticaProjectChild>>({
    method: 'GET',
    url: `${url}/files`,
    headers: headers(),
    params: {
      [isProject ? 'project' : 'parent']: parentId,
    },
  });

export const CavaticaApi = {
  fetchProjects,
  fetchProjetMembers,
  fetchBillingGroups,
  createProject,
  listFilesAndFolders,
};
