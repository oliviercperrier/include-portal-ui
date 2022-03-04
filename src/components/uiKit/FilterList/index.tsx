import { useState } from 'react';
import { Button, Layout, Typography } from 'antd';
import CustomFilterContainer from './CustomFilterContainer';
import intl from 'react-intl-universal';
import { FilterGroup, FilterInfo } from './types';
import { ExtendedMappingResults } from 'graphql/models';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import SuggesterWrapper from 'components/uiKit/Suggester/Wrapper';
import Suggester from 'components/uiKit/Suggester';
import cx from 'classnames';

import styles from './Filters.module.scss';

export type TCustomFilterMapper = (filters: ISqonGroupFilter) => ISyntheticSqon;

type OwnProps = {
  index: string;
  cacheKey: string;
  extendedMappingResults: ExtendedMappingResults;
  filterInfo: FilterInfo;
  filterMapper?: TCustomFilterMapper;
};

const { Text } = Typography;

const FilterList = ({
  index,
  cacheKey,
  extendedMappingResults,
  filterInfo,
  filterMapper,
}: OwnProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      {filterInfo.suggester && (
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
      )}
      <div className={styles.filterExpandBtnWrapper}>
        <Button onClick={() => setFiltersOpen(!filtersOpen)} type="link">
          {filtersOpen
            ? intl.get('components.filterList.collapseAll')
            : intl.get('components.filterList.expandAll')}
        </Button>
      </div>
      <Layout className={styles.filterWrapper}>
        {filterInfo.groups.map((group: FilterGroup, i) => (
          <div key={i} className={styles.filtersGroup}>
            {group.title ? (
              <Text type="secondary" className={styles.filterGroupTitle}>
                {group.title}
              </Text>
            ) : null}
            {group.fields.map((field) => (
              <CustomFilterContainer
                key={field}
                index={index}
                cacheKey={cacheKey}
                classname={cx(styles.customFilterContainer, styles.filter)}
                filterKey={field}
                extendedMappingResults={extendedMappingResults}
                filtersOpen={filtersOpen}
                filterMapper={filterMapper}
              />
            ))}
            {group.customs?.map((custom, i) => (
              <div key={i} className={cx(styles.customFilterWrapper, styles.filter)}>
                {custom}
              </div>
            ))}
          </div>
        ))}
      </Layout>
    </>
  );
};

export default FilterList;
