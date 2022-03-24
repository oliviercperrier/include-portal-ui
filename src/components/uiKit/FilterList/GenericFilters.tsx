import { Layout, Spin } from 'antd';
import { generateFilters } from 'graphql/utils/Filters';
import useGetAggregations from 'hooks/graphql/useGetAggregations';
import { ExtendedMappingResults } from 'graphql/models';
import { useHistory } from 'react-router-dom';
import { AGGREGATION_QUERY } from 'graphql/queries';

import styles from './Filters.module.scss';

type OwnProps = {
  index: string;
  field: string;
  sqon: any;
  extendedMappingResults: ExtendedMappingResults;
};

const GenericFilters = ({ index, field, sqon, extendedMappingResults }: OwnProps) => {
  const history = useHistory();
  const results = useGetAggregations(
    {
      sqon,
    },
    AGGREGATION_QUERY(index, [field], extendedMappingResults),
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
