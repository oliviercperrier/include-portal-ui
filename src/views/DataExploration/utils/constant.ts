import { STATIC_ROUTES } from 'utils/routes';

export const DATA_EXPLORATION_REPO_CACHE_KEY = 'data-exploration-repo-key';

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const DATA_EPLORATION_FILTER_TAG = 'data-exploration';
export const FILTER_TAG_PAGE_MAPPING: Record<string, string> = {
  [DATA_EPLORATION_FILTER_TAG]: STATIC_ROUTES.DATA_EXPLORATION,
};

export const SELECTED_SAVED_FILTER_PARAMS_KEY = 'selectedFilterId';

export const DEFAULT_PAGING_CONFIG = {
  index: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

export enum TAB_IDS {
  SUMMARY = 'summary',
  PARTICIPANTS = 'participants',
  BIOSPECIMENS = 'biospecimens',
  DATA_FILES = 'datafiles',
}
