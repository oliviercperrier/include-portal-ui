import FilterSelector, {
  FilterSelectorProps,
} from '@ferlab/ui/core/components/filters/FilterSelector';
import { getQueryBuilderCache, useFilters } from '@ferlab/ui/core/data/filters/utils';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { Spin } from 'antd';
import { useEffect } from 'react';
import useGetAggregations from 'hooks/graphql/useGetAggregations';
import { ExtendedMappingResults } from 'graphql/models';
import { AGGREGATION_QUERY } from 'graphql/queries';
import { TCustomFilterMapper } from '.';

type OwnProps = FilterSelectorProps & {
  index: string;
  cacheKey: string;
  filterKey: string;
  onDataLoaded: Function;
  extendedMappingResults: ExtendedMappingResults;
  filterMapper?: TCustomFilterMapper;
};

const CustomFilterSelector = ({
  index,
  cacheKey,
  filterKey,
  dictionary,
  filters,
  filterGroup,
  maxShowing,
  selectedFilters,
  onChange,
  onDataLoaded,
  searchInputVisible,
  extendedMappingResults,
  filterMapper,
}: OwnProps) => {
  const { filters: queryFilters } = useFilters();

  const allSqons = getQueryBuilderCache(cacheKey).state;

  const resolvedSqon = filterMapper
    ? filterMapper(resolveSyntheticSqon(allSqons, queryFilters))
    : resolveSyntheticSqon(allSqons, queryFilters);
  const results = useGetAggregations(
    {
      sqon: resolvedSqon,
    },
    AGGREGATION_QUERY(index, [filterKey], extendedMappingResults),
    index,
  );

  useEffect(() => {
    if (results.data) {
      onDataLoaded(results);
    }
    // eslint-disable-next-line
  }, [results.aggregations]);

  return (
    <Spin spinning={results.loading}>
      <FilterSelector
        dictionary={dictionary}
        filterGroup={filterGroup}
        filters={filters}
        maxShowing={maxShowing}
        onChange={onChange}
        searchInputVisible={searchInputVisible}
        selectedFilters={selectedFilters}
      />
    </Spin>
  );
};

export default CustomFilterSelector;
