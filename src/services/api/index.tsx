import axios, { AxiosError, AxiosRequestConfig } from "axios";
import keycloak from "auth/keycloak-api/keycloak";

const apiInstance = axios.create();

interface ApiResponse<T = any> {
  data: T | undefined;
  error: AxiosError | undefined;
}

apiInstance.interceptors.request.use((config) => {
  // set Authorization headers on a per request basis
  // setting headers on axios get/put/post or common seems to be shared across all axios instances

  const token = keycloak?.token;
  if (token) {
    config.headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    };
  }

  return config;
});

export const sendRequest = async <T,>(config: AxiosRequestConfig) => {
  return apiInstance
    .request<T>(config)
    .then(
      (response): ApiResponse<T> => ({
        data: response.data,
        error: undefined,
      })
    )
    .catch(
      (err): ApiResponse<T> => ({
        data: undefined,
        error: err,
      })
    );
};

export default apiInstance;
