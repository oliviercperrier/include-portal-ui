import { createAction } from "@reduxjs/toolkit";
import { GlobalActionsEnum } from "store/global/types";
import { LANG } from "utils/constants";

export const GlobalActions = {
  changeLang: createAction<LANG>(GlobalActionsEnum.CHANGE_LANG),
};
