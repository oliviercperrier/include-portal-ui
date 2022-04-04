import EnvironmentVariables from 'helpers/EnvVariables';
import keycloak from 'auth/keycloak-api/keycloak';
import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { TUser, TUserInsert, TUserUpdate } from './models';
import { sendRequest } from 'services/api';

const USER_API_URL = `${EnvironmentVariables.configFor('USERS_API')}/user`;

const headers = () => ({
  'Content-Type': 'application/json',
});

const fetch = () =>
  sendRequest<TUser>({
    method: 'GET',
    url: USER_API_URL,
    headers: headers(),
  });

const create = (body?: Omit<TUserInsert, 'keycloak_id'>) => {
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
  return sendRequest<TUser>({
    method: 'POST',
    url: USER_API_URL,
    headers: headers(),
    data: {
      ...body,
      email: body?.email || tokenParsed.email || tokenParsed.identity_provider_identity,
      first_name: body?.first_name || tokenParsed.given_name,
      last_name: body?.last_name || tokenParsed.family_name,
    },
  });
};

const search = (pageIndex?: number, pageSize?: number) =>
  sendRequest<{
    users: TUser[];
    total: number;
  }>({
    method: 'GET',
    url: `${USER_API_URL}/search`,
    headers: headers(),
    params: {
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 15,
    },
  });

const update = (body: TUserUpdate) =>
  sendRequest<TUser>({
    method: 'PUT',
    url: USER_API_URL,
    headers: headers(),
    data: body,
  });

export const UserApi = {
  search,
  fetch,
  create,
  update,
};
