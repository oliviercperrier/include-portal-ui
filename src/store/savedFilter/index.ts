import { useSelector } from 'react-redux';
import {
  DATA_EPLORATION_FILTER_TAG,
  DATA_EXPLORATION_REPO_CACHE_KEY,
} from 'views/DataExploration/utils/constant';
import { savedFilterSelector } from './selector';

export type { initialState as SavedFilterInitialState } from './types';
export { default, SavedFilterState } from './slice';
export const useSavedFilter = (tag?: string, selectedId?: string | null) => {
  const savedFilterState = useSelector(savedFilterSelector);

  if (tag) {
    const filters = savedFilterState.savedFilters.filter((savedFilter) => savedFilter.tag === tag);
    const selectedFilterById = filters.find(({ id }) => id === savedFilterState.selectedId);
    const favoriteFilter = filters.find(({ favorite }) => !!favorite);

    // HACK ask olivier
    if (selectedFilterById || (favoriteFilter && tag === DATA_EPLORATION_FILTER_TAG)) {
      localStorage.removeItem(`query-builder-cache-${DATA_EXPLORATION_REPO_CACHE_KEY}`);
    }

    return {
      ...savedFilterState,
      defaultFilter: selectedFilterById || favoriteFilter,
      savedFilters: filters,
    };
  }

  return savedFilterState;
};
