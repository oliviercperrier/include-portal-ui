import { TRiffEntity } from "services/api/riff/models";

export enum RIFF_TYPES {
  SET = "set",
}

export enum SET_TYPES {}

export interface TRiffSavedSetContent {
  riffType: RIFF_TYPES.SET;
  setType: SET_TYPES;
  set: any;
}

export type TRiffContent = TRiffSavedSetContent;

export type initialState = {
  entities: TRiffEntity<TRiffContent>[];
  isLoading: boolean;
  error?: string;
};
