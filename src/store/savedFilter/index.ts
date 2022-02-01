import { useSelector } from "react-redux";
import { savedFilterSelector } from "./selector";

export type { initialState as SavedFilterInitialState } from "./types";
export { default, SavedFilterState } from "./slice";
export const useSavedFilter = (tag?: string) => {
  const savedFilterState = useSelector(savedFilterSelector);
  if (tag) {
    const filters = savedFilterState.savedFilters.filter(
      (savedFilter) => savedFilter.tag === tag
    );

    return {
      ...savedFilterState,
      defaultFilter: filters.find((filter) => !!filter.favorite),
      savedFilters: filters,
    };
  }

  return savedFilterState;
};
