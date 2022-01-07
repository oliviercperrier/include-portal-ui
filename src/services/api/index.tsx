import axios, { AxiosError, AxiosRequestConfig } from "axios";
import keycloak from "initKeycloak";

const apiInstance = axios.create();

interface ApiResponse {
  data: any | undefined;
  error: AxiosError | undefined;
}

apiInstance.interceptors.request.use(
  (config) => {
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
  }
);

export const sendRequest = async (config: AxiosRequestConfig) => {
  return apiInstance
    .request(config)
    .then(
      (response): ApiResponse => ({
        data: response.data,
        error: undefined,
      })
    )
    .catch(
      (err): ApiResponse => ({
        data: undefined,
        error: err,
      })
    );
};

export default apiInstance;
