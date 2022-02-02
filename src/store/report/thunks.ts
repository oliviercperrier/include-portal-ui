import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReportApi } from "services/api/reports";
import { ReportConfig } from "../../services/api/reports/models";

const fetchReport = createAsyncThunk<
  void,
  {
    data: ReportConfig;
    callback?: () => void;
  },
  { rejectValue: string }
>("report/generateReport", async (args, thunkAPI) => {
  await ReportApi.generateReport(args.data);
});

export { fetchReport };
