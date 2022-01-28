import { useSelector } from "react-redux";
import { savedFilterSelector } from "./selector";

export type { initialState as SavedFilterInitialState } from "./types";
export { default, SavedFilterState } from "./slice";
export const useSavedFilter = (tag?: string) => {
  const savedFilterState = useSelector(savedFilterSelector);
  if (tag) {
    return {
      ...savedFilterState,
      savedFilters: savedFilterState.savedFilters.filter(
        (savedFilter) => savedFilter.tag === tag
      ),
    };
  }

  return savedFilterState;
};
