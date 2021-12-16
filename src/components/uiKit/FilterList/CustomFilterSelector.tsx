import FilterSelector, {
  FilterSelectorProps,
} from "@ferlab/ui/core/components/filters/FilterSelector";
import {
  getQueryBuilderCache,
  useFilters,
} from "@ferlab/ui/core/data/filters/utils";
import { resolveSyntheticSqon } from "@ferlab/ui/core/data/sqon/utils";
import { Spin } from "antd";
import { useEffect } from "react";
import { useGetAggregations } from "graphql/actions";
import { DocumentNode } from "@apollo/client";

type OwnProps = FilterSelectorProps & {
  index: string;
  query: DocumentNode;
  cacheKey: string;
  onDataLoaded: Function;
};

const CustomFilterSelector = ({
  index,
  query,
  cacheKey,
  dictionary,
  filters,
  filterGroup,
  maxShowing,
  selectedFilters,
  onChange,
  onDataLoaded,
  searchInputVisible,
}: OwnProps) => {
  const { filters: queryFilters } = useFilters();

  const allSqons = getQueryBuilderCache(cacheKey).state;

  const results = useGetAggregations(
    {
      sqon: resolveSyntheticSqon(allSqons, queryFilters),
    },
    query,
    index
  );

  useEffect(() => {
    if (results.data) {
      onDataLoaded(results);
    }
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
