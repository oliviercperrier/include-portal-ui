import { IQueryConfig } from 'common/searchPageTypes';

export const SCROLL_WRAPPER_ID = 'variants-scroll-wrapper';

export const VARIANT_REPO_QB_ID = 'variant-repo-key';

export const VARIANT_FILTER_TAG = 'variant';

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
  sort: [],
};

export enum TAB_IDS {
  SUMMARY = 'summary',
  VARIANTS = 'variants',
}
