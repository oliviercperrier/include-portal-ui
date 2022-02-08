import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../../utils/constant';
import { Key } from 'react';

export const DATA_EPLORATION_FILTER_TAG = 'data-exploration';

export enum TAB_IDS {
  SUMMARY = 'summary',
  PARTICIPANTS = 'participants',
  BIOSPECIMENS = 'biospecimens',
  DATA_FILES = 'datafiles',
}

export const DEFAULT_PAGING_CONFIG = {
  index: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

export type RowSelection = {
  selectedRows: Key[];
  onRowSelection: (selectedKey: Key, type: TAB_IDS) => void;
  onAllRowSelection: (selectedRowKeys: Key[], type: TAB_IDS, selected: boolean) => void;
  allRowSelected: boolean;
};
