import { TSortableItems } from '@ferlab/ui/core/layout/SortableGrid/SortableItem';
import { SorterResult } from 'antd/lib/table/interface';
import { TSortDirection } from 'graphql/queries';
import { isArray } from 'lodash';
import { Typography } from 'antd';

const { Text } = Typography;

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

  const r = sorters.map((sorter) => ({
    field: (sorter.field?.toString()! || sorter.columnKey?.toString()!).replaceAll('__', '.'),
    order: getOrderFromAntdValue(sorter.order!),
  }));

  return r;
};

// Format is like: Sleep apnea (MONDO:0010535)
export const extractMondoTitleAndCode = (mondo: string) => titleAndCodeExtractor(mondo, '(MONDO:');

export const formatMondoTitleAndCode = (mondo: string) => {
  const mondoInfo = extractMondoTitleAndCode(mondo);
  return (
    <Text>
      {mondoInfo?.title} <Text type="secondary">(MONDO:{mondoInfo?.code})</Text>
    </Text>
  );
};

// Format is like: Alzheimer disease (HP:0002511)
export const extractPhenotypeTitleAndCode = (phenotype: string) =>
  titleAndCodeExtractor(phenotype, '(HP:');

export const formatHpoTitleAndCode = (phenotype: string) => {
  const phenotypeInfo = extractPhenotypeTitleAndCode(phenotype);
  return (
    <Text>
      {phenotypeInfo?.title} <Text type="secondary">(HP:{phenotypeInfo?.code})</Text>
    </Text>
  );
};

// Format is like: Feces (NCIT:C13234)
export const extractNcitTissueTitleAndCode = (ncit: string) =>
  titleAndCodeExtractor(ncit, '(NCIT:');

export const orderCardIfNeeded = (cards: TSortableItems[], userCardConfig: string[] | undefined) =>
  userCardConfig
    ? cards.sort((a, b) => {
        return userCardConfig.indexOf(a.id) > userCardConfig.indexOf(b.id) ? 1 : -1;
      })
    : cards;
