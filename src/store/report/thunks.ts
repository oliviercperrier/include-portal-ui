import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReportApi } from "services/api/reports";
import { ReportConfig } from "../../services/api/reports/models";
import { notification } from "antd";
import intl from "react-intl-universal";

const fetchReport = createAsyncThunk<
  void,
  {
    data: ReportConfig;
    callback?: () => void;
  },
  { rejectValue: string }
>("report/generateReport", async (args, thunkAPI) => {
  try {
    notification.info({
      message: intl.get("report.inProgress.title"),
      description: intl.get("report.inProgress.fetchReport"),
    });
    await ReportApi.generateReport(args.data).then((_) =>
      notification.success({
        message: intl.get("report.inProgress.title"),
        description: intl.get("report.inProgress.fetchReport"),
      })
    );
  } catch (e) {
    notification.error({
      message: intl.get("report.inProgress.title"),
      description: intl.get("report.inProgress.fetchReport"),
    });
  }
});

export { fetchReport };
