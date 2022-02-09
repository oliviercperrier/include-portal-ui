import { createSlice } from "@reduxjs/toolkit";
import { initialState, MessageType } from "store/report/types";
import { fetchReport } from "store/report/thunks";

export const ReportState: initialState = {
  isLoading: false,
};

const reportSlice = createSlice({
  name: "report",
  initialState: ReportState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReport.pending, (state, action) => {
      state.isLoading = true;
      state.message = {
        content: "Please wait while we generate your report",
        duration: 0,
        type: MessageType.LOADING,
      };
    });
    builder.addCase(fetchReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error as Error;
      state.message = undefined;
    });
    builder.addCase(fetchReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = undefined;
    });
  },
});

export const reportActions = reportSlice.actions;
export default reportSlice.reducer;
