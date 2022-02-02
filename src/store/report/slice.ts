import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "store/report/types";
import { fetchReport } from "store/report/thunks";

export const ReportState: initialState = {
  isLoading: false,
  error: null,
  message: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState: ReportState,
  reducers: {
    // cleanLogout: (state) => {
    //   keycloak.logout({
    //     redirectUri: window.location.origin,
    //   });
    //
    //   return UserState;
    // },
    // setIsUserLoading: (state, action: PayloadAction<boolean>) => ({
    //   ...state,
    //   isLoading: action.payload,
    // }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReport.pending, (state, action) => {
      state.isLoading = true;
      state.message = action.payload;
    });
    builder.addCase(fetchReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error as Error;
    });
    builder.addCase(fetchReport.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const reportActions = reportSlice.actions;
export default reportSlice.reducer;
