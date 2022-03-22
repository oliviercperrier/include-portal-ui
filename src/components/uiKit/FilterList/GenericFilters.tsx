import { Layout, Spin } from 'antd';
import { DocumentNode } from '@apollo/client';
import { generateFilters } from 'graphql/utils/Filters';
import useGetAggregations from 'hooks/graphql/useGetAggregations';
import { ExtendedMappingResults } from 'graphql/models';
import { useHistory } from 'react-router-dom';

import styles from './Filters.module.scss';

type OwnProps = {
  index: string;
  query: DocumentNode;
  sqon: any;
  extendedMappingResults: ExtendedMappingResults;
};

const GenericFilters = ({ index, query, sqon, extendedMappingResults }: OwnProps) => {
  const history = useHistory();
  const results = useGetAggregations(
    {
      sqon,
    },
    query,
    index,
  );

  return (
    <Spin size="large" spinning={results.loading}>
      <Layout className={`${styles.filterWrapper} ${styles.genericFilterWrapper}`}>
        {generateFilters({
          aggregations: results?.aggregations,
          extendedMapping: extendedMappingResults,
          className: styles.customFilterContainer,
          filtersOpen: true,
          filterFooter: true,
          showSearchInput: true,
          useFilterSelector: true,
          history,
          index,
        })}
      </Layout>
    </Spin>
  );
};

export default GenericFilters;
