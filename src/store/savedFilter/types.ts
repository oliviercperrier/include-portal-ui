import { ISavedFilter } from "@ferlab/ui/core/components/QueryBuilder/types";
import { TUserSavedFilter } from "services/api/savedFilter/models";

export type initialState = {
  defaultFilter?: ISavedFilter;
  savedFilters: TUserSavedFilter[];
  isLoading: boolean;
  isUpdating: boolean;
  error?: string;
};
