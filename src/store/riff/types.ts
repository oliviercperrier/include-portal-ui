import { ISavedFilter } from "@ferlab/ui/core/components/QueryBuilder/types";
import { TRiffEntity } from "services/api/riff/models";

export enum RIFF_TYPES {
  FILTER = "filter",
  SET = "set",
}

export enum SAVED_FILTER_TYPES {
  EXPLORATION = "exploration", // search page: data-exploration
}

export enum SET_TYPES {}

export interface TRiffSavedFilterContent {
  riffType: RIFF_TYPES.FILTER;
  filterType: SAVED_FILTER_TYPES;
  filter: ISavedFilter;
}

export interface TRiffSavedSetContent {
  riffType: RIFF_TYPES.SET;
  setType: SET_TYPES;
  set: any;
}

export type TRiffContent = TRiffSavedFilterContent | TRiffSavedSetContent;

export type initialState = {
  entities: TRiffEntity<TRiffContent>[];
  isLoading: boolean;
  error?: string;
};
