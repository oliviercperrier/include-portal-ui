import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReportApi } from "services/api/reports";
import { ReportConfig } from "services/api/reports/models";
import { message, notification } from "antd";
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
    message.loading({
      content: "Please wait while we generate your report",
      key: "report_pending",
      duration: 0,
    });
    await ReportApi.generateReport(args.data).then((_) => {
      message.destroy("report_pending");
      notification.success({
        message: intl.get("report.onSuccess.title"),
        description: intl.get("report.onSuccess.fetchReport"),
      });
    });
  } catch (e) {
    message.destroy("report_pending");
    notification.error({
      message: intl.get("report.error.title"),
      description: (
        <div>
          {intl.get("report.error.message")}
          <a href="mailto:support@includedrc.org">
            {intl.get("report.error.support")}
          </a>
        </div>
      ),
      duration: 10,
    });
  }
});

export { fetchReport };
