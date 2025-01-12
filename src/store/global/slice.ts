import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "store/global/types";
import { LANG } from "common/constants";
import intl from "react-intl-universal";
import locales from "locales";

export const GlobalState: initialState = {
  lang: LANG.EN,
};

const globalSlice = createSlice({
  name: "global",
  initialState: GlobalState,
  reducers: {
    changeLang: (state, action: PayloadAction<LANG>) => {
      intl.init({
        currentLocale: action.payload,
        locales,
      });

      return {
        ...state,
        lang: action.payload,
      }
    },
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;
