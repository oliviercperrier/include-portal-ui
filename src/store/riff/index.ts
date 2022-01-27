import { useSelector } from "react-redux";
import { TRiffEntity } from "services/api/riff/models";
import { riffSelector } from "./selector";
import {
  RIFF_TYPES,
  SAVED_FILTER_TYPES,
  SET_TYPES,
  TRiffSavedFilterContent,
  TRiffSavedSetContent,
} from "./types";

export type { initialState as RiffInitialState } from "./types";
export { default, RiffState } from "./slice";
export const useRiff = () => useSelector(riffSelector);

export const useSavedFilters = (type: SAVED_FILTER_TYPES) =>
  (
    useSelector(riffSelector).entities.filter(
      (entity) =>
        entity.content.riffType === RIFF_TYPES.FILTER &&
        entity.content?.filterType === type
    ) as TRiffEntity<TRiffSavedFilterContent>[]
  ).map((entity) => entity.content.filter);

export const useSavedSets = (type: SET_TYPES) =>
  useSelector(riffSelector).entities.filter(
    (entity) =>
      entity.content.riffType === RIFF_TYPES.SET &&
      entity.content?.setType === type
  ) as TRiffEntity<TRiffSavedSetContent>[];
