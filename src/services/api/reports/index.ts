import EnvironmentVariables from "helpers/EnvVariables";
import keycloak from "auth/keycloak-api/keycloak";
import {ReportConfig, ReportType} from "./models";
import isEmpty from "lodash/isEmpty";
import { format } from "date-fns";
import downloader from "common/downloader";

const url = EnvironmentVariables.configFor("REPORTS_API_URL");
const arrangerProjectId = EnvironmentVariables.configFor("ARRANGER_PROJECT_ID");

const REPORTS_ROUTES = {
  [ReportType.CLINICAL_DATA]: `${url}/reports/clinical-data`,
  [ReportType.CLINICAL_DATA_FAM]: `${url}/reports/family-clinical-data`,
  [ReportType.BIOSEPCIMEN_DATA]: `${url}/reports/biospecimen-data`,
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
  } else {
    reportSqon = config.sqon;
  }
  
  return downloader({
    // @ts-ignore
    url: REPORTS_ROUTES[name],
    method: "POST",
    data: {
      sqon: {
        op: "and",
        content: [
          {
            op: "in",
            content: { field: "study.study_id", value: ["SD_Z6MWD3H0"] },
          },
        ],
      },
      projectId: arrangerProjectId,
      filename: format(new Date(), `[${name}_]YYYYMMDD[.xlsx]`),
    },
    headers: headers(),
  });
};

export const ReportApi = {
  generateReport,
};
