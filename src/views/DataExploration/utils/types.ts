import { Key } from 'react';
import { ReportType } from 'services/api/reports/models';

export type TPagingConfig = {
  index: number;
  size: number;
};

export type TPagingConfigCb = (config: TPagingConfig) => void;

export type THandleReportDownload = (
  reportType: ReportType,
  selectedKeys: Key[],
  selectAll: boolean,
) => void;
