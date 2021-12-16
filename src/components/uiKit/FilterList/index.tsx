import React, { useState } from "react";
import { Button, Layout } from "antd";
import CustomFilterContainer from "./CustomFilterContainer";
import intl from "react-intl-universal";
import { FilterGroup, FilterInfo } from "./types";
import { ExtendedMappingResults } from "graphql/models";
import { DocumentNode } from "@apollo/client";

// TODO : Extract all variant stuff to make generic
//import SuggesterWrapper from "views/screens/variant/Suggester/Wrapper";
//import Suggester from "views/screens/variant/Suggester";

import styles from "./Filters.module.scss";

type OwnProps = {
  index: string;
  query: DocumentNode;
  cacheKey: string;
  extendedMappingResults: ExtendedMappingResults;
  filterInfo: FilterInfo;
};

const FilterList = ({
  index,
  query,
  cacheKey,
  extendedMappingResults,
  filterInfo,
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
      <div className={styles.expandButtonContainerVariant}>
        <Button onClick={() => setFiltersOpen(!filtersOpen)} type="link">
          {filtersOpen
            ? intl.get("screen.patientvariant.filter.collapse.all")
            : intl.get("screen.patientvariant.filter.expand.all")}
        </Button>
      </div>
      <Layout className={styles.variantFilterWrapper}>
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
                query={query}
                classname={styles.variantFilterContainer}
                filterKey={field}
                extendedMappingResults={extendedMappingResults}
                filtersOpen={filtersOpen}
              />
            ))}
          </div>
        ))}
      </Layout>
    </>
  );
};

export default FilterList;
