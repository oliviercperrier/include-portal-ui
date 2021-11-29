import EnvVariables from "helpers/EnvVariables";
//import { initializeApi } from "services/api";
const initializeApi = () => {};

const fetchPublicStats = async () => {
  const api: any = initializeApi();
  return api({
    url: `${EnvVariables.configFor({ key: "ARRANGER_API" })}/statistics`,
    body: null,
    method: "GET",
  });
};

export default fetchPublicStats;
