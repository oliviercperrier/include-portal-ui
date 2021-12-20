import {
  getQueryBuilderCache,
  useFilters,
} from "@ferlab/ui/core/data/filters/utils";
import { resolveSyntheticSqon } from "@ferlab/ui/core/data/sqon/utils";
import { Layout, Spin } from "antd";
import { DocumentNode } from "@apollo/client";
import { generateFilters } from "graphql/utils/Filters";
import useGetAggregations from "hooks/graphql/useGetAggregations";
import { ExtendedMappingResults } from "graphql/models";

import styles from "./Filters.module.scss";

type OwnProps = {
  index: string;
  query: DocumentNode;
  cacheKey: string;
  extendedMappingResults: ExtendedMappingResults;
};

const GenericFilters = ({
  index,
  query,
  cacheKey,
  extendedMappingResults,
}: OwnProps) => {
  const { filters } = useFilters();
  const allSqons = getQueryBuilderCache(cacheKey).state;
  const results = useGetAggregations(
    {
      sqon: resolveSyntheticSqon(allSqons, filters),
    },
    query,
    index
  );

  return (
    <Spin size="large" spinning={results.loading}>
      <Layout
        className={`${styles.filterWrapper} ${styles.genericFilterWrapper}`}
      >
        {generateFilters(
          results?.aggregations,
          {
            loading: extendedMappingResults.loading,
            data: extendedMappingResults.data,
          },
          styles.customFilterContainer,
          true,
          true,
          true,
          true
        )}
      </Layout>
    </Spin>
  );
};

export default GenericFilters;
