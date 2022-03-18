import { SorterResult } from 'antd/lib/table/interface';
import { TSortDirection } from 'graphql/queries';
import { isArray } from 'lodash';

const titleAndCodeExtractor = (value: string, codeSubstring: string) => {
  if (!value) {
    return null;
  }
  const indexCode = value.indexOf(codeSubstring);

  return {
    title: value.substring(0, indexCode).trim(),
    code: value.substring(indexCode + codeSubstring.length, value.length - 1),
  };
};

export const getOrderFromAntdValue = (order: string): TSortDirection =>
  order === 'ascend' ? 'asc' : 'desc';

export const formatQuerySortList = (sorter: SorterResult<any> | SorterResult<any>[]) => {
  const sorters = (isArray(sorter) ? sorter : [sorter]).filter(
    (sorter) => !!sorter.column || !!sorter.order,
  );

  const r =  sorters.map((sorter) => ({
    field: (sorter.field?.toString()! || sorter.columnKey?.toString()!).replaceAll('__', '.'),
    order: getOrderFromAntdValue(sorter.order!),
  }));

  console.log(r)

  return r
};

// Format is like: Sleep apnea (MONDO:0010535)
export const extractMondoTitleAndCode = (mondo: string) => titleAndCodeExtractor(mondo, '(MONDO:');

// Format is like: Alzheimer disease (HP:0002511)
export const extractPhenotypeTitleAndCode = (phenotype: string) =>
  titleAndCodeExtractor(phenotype, '(HP:');

// Format is like: Feces (NCIT:C13234)
export const extractNcitTissueTitleAndCode = (ncit: string) =>
  titleAndCodeExtractor(ncit, '(NCIT:');
