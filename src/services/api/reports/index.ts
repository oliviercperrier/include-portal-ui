import EnvironmentVariables from "helpers/EnvVariables";
import keycloak from "auth/keycloak-api/keycloak";
import { ReportConfig } from "./models";
import { sendRequest } from "services/api";
import isEmpty from "lodash/isEmpty";
import { format } from 'date-fns';

const url = EnvironmentVariables.configFor("REPORTS_API_URL");
const arrangerProjectId = EnvironmentVariables.configFor("ARRANGER_PROJECT_ID");

export const RP_PARTICIPANT_FILE_REPO_KEY = 'clinicalDataFileRepo';
export const RP_CLINICAL_DATA_KEY = 'clinicalData';
export const RP_FAM_CLINICAL_DATA_KEY = 'familyClinicalData';
export const RP_FAM_CLINICAL_DATA_FILE_REPO_KEY = 'familyClinicalDataFileRepo';
export const RP_BIOSPECIMEN_DATA_KEY = 'biospecimenData';
export const RP_BIOSPECIMEN_FILE_REPO_DATA_KEY = 'biospecimenDataFileRepo';

const REPORTS_ROUTES = {
  [RP_PARTICIPANT_FILE_REPO_KEY]: `${url}/reports/clinical-data`,
  [RP_CLINICAL_DATA_KEY]: `${url}/reports/clinical-data`,
  [RP_FAM_CLINICAL_DATA_KEY]: `${url}/reports/family-clinical-data`,
  [RP_FAM_CLINICAL_DATA_FILE_REPO_KEY]: `${url}/reports/family-clinical-data`,
  [RP_BIOSPECIMEN_DATA_KEY]: `${url}/reports/biospecimen-data`,
  [RP_BIOSPECIMEN_FILE_REPO_DATA_KEY]: `${url}/reports/biospecimen-data`,
};

const headers = () => ({
  "Content-Type": "application/json",
  Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  Authorization: `Bearer ${keycloak.token}`,
});

const generateReport = (config: ReportConfig) => {
  const name = config.name;

  //TODO do we need google analytics tracking?
  let reportSqon;

  if (!config.sqon || isEmpty(config.sqon)) {
    reportSqon = {
      op: "and",
      content: [],
    };
    //TODO - do we support for files?
  // } else if (isSqonFromFileRepo(name)) {
  //   reportSqon = await buildSqonFromFileRepoForReport(name, config.sqon);
  } else {
    reportSqon = config.sqon;
  }

  return sendRequest({
    // @ts-ignore
    url: REPORTS_ROUTES[name],
    method: "POST",
    data: {
      sqon: reportSqon,
      projectId: arrangerProjectId,
      filename: format(new Date(), `[${name}_]YYYYMMDD[.xlsx]`),
    },
    headers: headers(),
  });
};

export const ReportApi = {
  generateReport,
};
