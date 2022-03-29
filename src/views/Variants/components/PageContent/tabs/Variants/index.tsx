import { IQueryResults } from 'graphql/models';
import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { getProTableDictionary } from 'utils/translation';
import { useEffect, useState } from 'react';
import { useFilters } from '@ferlab/ui/core/data/filters/utils';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { scrollToTop, formatQuerySortList } from 'utils/helper';
import { ITableVariantEntity, IVariantEntity } from 'graphql/variants/models';
import { DEFAULT_PAGE_SIZE, SCROLL_WRAPPER_ID } from 'views/Variants/utils/constants';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IVariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  sqon?: ISqonGroupFilter;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: 'variant_id',
    title: 'Variant ID',
  },
];

const VariantsTab = ({ results, setQueryConfig, queryConfig, sqon }: OwnProps) => {
  const { filters }: { filters: ISyntheticSqon } = useFilters();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  return (
    <ProTable<ITableVariantEntity>
      tableId="variants_table"
      columns={defaultColumns}
      wrapperClassName={styles.variantTabWrapper}
      loading={results.loading}
      enableRowSelection={true}
      initialSelectedKey={selectedKeys}
      showSorterTooltip={false}
      onChange={({ current, pageSize }, _, sorter) =>
        setQueryConfig({
          pageIndex: current!,
          size: pageSize!,
          sort: formatQuerySortList(sorter),
        })
      }
      headerConfig={{
        itemCount: {
          pageIndex: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          total: results.total,
        },
      }}
      bordered
      size="small"
      pagination={{
        current: queryConfig.pageIndex,
        pageSize: queryConfig.size,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results.total,
        onChange: () => scrollToTop(SCROLL_WRAPPER_ID),
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default VariantsTab;
