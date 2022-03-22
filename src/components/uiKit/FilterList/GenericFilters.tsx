import { getQueryBuilderCache, useFilters } from '@ferlab/ui/core/data/filters/utils';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
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
  cacheKey: string;
  extendedMappingResults: ExtendedMappingResults;
};

const GenericFilters = ({ index, query, cacheKey, extendedMappingResults }: OwnProps) => {
  const history = useHistory();
  const { filters } = useFilters();
  const allSqons = getQueryBuilderCache(cacheKey).state;
  const results = useGetAggregations(
    {
      sqon: resolveSyntheticSqon(allSqons, filters),
    },
    query,
    index,
  );

  return (
    <Spin size="large" spinning={results.loading}>
      <Layout className={`${styles.filterWrapper} ${styles.genericFilterWrapper}`}>
        {generateFilters({
          aggregations: results?.aggregations,
          extendedMapping: {
            loading: extendedMappingResults.loading,
            data: extendedMappingResults.data,
          },
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
