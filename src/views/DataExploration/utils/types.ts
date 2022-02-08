import { Key } from 'react';
import { TAB_IDS } from './constant';

export type TPagingConfig = {
  index: number;
  size: number;
};

export type TPagingConfigCb = (config: TPagingConfig) => void;

export type RowSelection = {
  selectedRows: Key[];
  onRowSelection: (selectedKey: Key, type: TAB_IDS) => void;
  onAllRowSelection: (selectedRowKeys: Key[], type: TAB_IDS, selected: boolean) => void;
  allRowSelected: boolean;
};
