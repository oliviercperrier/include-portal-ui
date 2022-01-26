import { useState } from "react";
import { Button, Layout } from "antd";
import CustomFilterContainer from "./CustomFilterContainer";
import intl from "react-intl-universal";
import { FilterGroup, FilterInfo } from "./types";
import { ExtendedMappingResults } from "graphql/models";

import styles from "./Filters.module.scss";
import { ISyntheticSqon } from "@ferlab/ui/core/data/sqon/types";

export type TCustomFilterMapper = (filters: ISyntheticSqon) => ISyntheticSqon;

type OwnProps = {
  index: string;
  cacheKey: string;
  extendedMappingResults: ExtendedMappingResults;
  filterInfo: FilterInfo;
  filterMapper?: TCustomFilterMapper
};

const FilterList = ({
  index,
  cacheKey,
  extendedMappingResults,
  filterInfo,
  filterMapper
}: OwnProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      {/*filterInfo.suggester && (
        <SuggesterWrapper
          tooltipMessage={filterInfo.suggester.tooltipTitle()}
          title={filterInfo.suggester.title()}
        >
          <Suggester
            suggestionType={filterInfo.suggester.suggestionType}
            title={filterInfo.suggester.title()}
            placeholderText={filterInfo.suggester.placeholder()}
          />
        </SuggesterWrapper>
      )*/}
      <div className={styles.filterExpandBtnWrapper}>
        <Button onClick={() => setFiltersOpen(!filtersOpen)} type="link">
          {filtersOpen
            ? intl.get("components.filterList.collapseAll")
            : intl.get("components.filterList.expandAll")}
        </Button>
      </div>
      <Layout className={styles.filterWrapper}>
        {filterInfo.groups.map((group: FilterGroup, i) => (
          <div key={index}>
            {group.title ? (
              <div className={styles.filterGroupTitle}>
                {intl.get(group.title)}
              </div>
            ) : null}
            {group.fields.map((field) => (
              <CustomFilterContainer
                key={field}
                index={index}
                cacheKey={cacheKey}
                classname={styles.customFilterContainer}
                filterKey={field}
                extendedMappingResults={extendedMappingResults}
                filtersOpen={filtersOpen}
                filterMapper={filterMapper}
              />
            ))}
          </div>
        ))}
      </Layout>
    </>
  );
};

export default FilterList;
