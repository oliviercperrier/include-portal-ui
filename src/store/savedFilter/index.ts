import { useSelector } from 'react-redux';
import { savedFilterSelector } from './selector';

export type { initialState as SavedFilterInitialState } from './types';
export { default, SavedFilterState } from './slice';
export const useSavedFilter = (tag?: string, selectedId?: string | null) => {
  const savedFilterState = useSelector(savedFilterSelector);

  if (tag) {
    const filters = savedFilterState.savedFilters.filter((savedFilter) => savedFilter.tag === tag);
    const selectedFilterById = filters.find(({ id }) => id === savedFilterState.selectedId);
    const favoriteFilter = filters.find(({ favorite }) => !!favorite);

    return {
      ...savedFilterState,
      defaultFilter: selectedFilterById || favoriteFilter,
      savedFilters: filters,
    };
  }

  return savedFilterState;
};
