import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "store/global/types";
import { LANG } from "common/constants";

export const GlobalState: initialState = {
  lang: LANG.EN,
};

const globalSlice = createSlice({
  name: "global",
  initialState: GlobalState,
  reducers: {
    changeLang: (state, action: PayloadAction<LANG>) => ({
      ...state,
      lang: action.payload,
    }),
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;
