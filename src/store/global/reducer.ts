import { createReducer } from "@reduxjs/toolkit";
import { GlobalActions } from "store/global/actions";
import { initialState } from "store/global/types";
import { LANG } from "utils/constants";
import intl from "react-intl-universal";
import locales from "locales";

export const GlobalState: initialState = {
  lang: LANG.EN,
};

export default createReducer(GlobalState, (builder) => {
  builder
    .addCase(GlobalActions.changeLang, (state, action) => {
      intl.init({
        currentLocale: action.payload,
        locales,
      });
      return {
        ...state,
        lang: action.payload,
      };
    })
    .addDefaultCase((state, action) => state);
});
