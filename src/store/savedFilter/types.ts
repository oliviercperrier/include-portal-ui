import { TUserSavedFilter } from "services/api/savedFilter/models";

export type initialState = {
  savedFilters: TUserSavedFilter[];
  isLoading: boolean;
  isUpdating: boolean;
  error?: string;
};
