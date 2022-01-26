import { ISavedFilter } from "@ferlab/ui/core/components/QueryBuilder/types";
import { SAVED_FILTER_TYPES } from "store/riff/types";

export type TRiffEntity<T> = {
  id: string;
  alias: string;
  content: T;
  sharedPublicly: boolean;
  creationDate: string;
  updateDate: string;
};

export type TRiffEntityUpdate<T> = Omit<
  TRiffEntity<T>,
  "id" | "creationDate" | "updateDate"
>;

export type TRiffEntityCreate<T> = Omit<
  TRiffEntity<T>,
  "id" | "creationDate" | "updateDate"
>;

export type TUpdateFilterArg = {
  savedFilter: ISavedFilter;
  type: SAVED_FILTER_TYPES;
};
