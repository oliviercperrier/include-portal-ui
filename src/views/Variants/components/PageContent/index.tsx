import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';
import { STATIC_ROUTES } from 'utils/routes';
import { getQueryBuilderDictionary } from 'utils/translation';
import { Space, Tabs } from 'antd';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createSavedFilter,
  deleteSavedFilter,
  setSavedFilterAsDefault,
  updateSavedFilter,
} from 'store/savedFilter/thunks';
import { useSavedFilter } from 'store/savedFilter';
import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  TAB_IDS,
  VARIANT_FILTER_TAG,
  VARIANT_REPO_QB_ID,
} from 'views/Variants/utils/constants';
import { useVariant } from 'graphql/variants/actions';
import SummaryTab from './tabs/Summary';
import { combineExtendedMappings } from 'utils/fieldMapper';
import VariantsTab from './tabs/Variants';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';

import styles from './index.module.scss';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  tabId?: string;
};

const addTagToFilter = (filter: ISavedFilter) => ({
  ...filter,
  tag: VARIANT_FILTER_TAG,
});

const PageContent = ({ variantMapping, tabId = TAB_IDS.SUMMARY }: OwnProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { queryList, activeQuery } = useQueryBuilderState(VARIANT_REPO_QB_ID);
  const { savedFilters, defaultFilter } = useSavedFilter(VARIANT_FILTER_TAG);

  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const variantResolvedSqon = resolveSyntheticSqon(queryList, activeQuery);

  const variantResults = useVariant({
    first: variantQueryConfig.size,
    offset: variantQueryConfig.size * (variantQueryConfig.pageIndex - 1),
    sqon: variantResolvedSqon,
    sort: isEmpty(variantQueryConfig.sort)
      ? [{ field: 'variant_id', order: 'asc' }]
      : variantQueryConfig.sort,
  });

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  const facetTransResolver = (key: string) => {
    const title = intl.get(`facets.${key}`);
    return title
      ? title
      : combineExtendedMappings([variantMapping])?.data?.find(
          (mapping: ExtendedMapping) => key === mapping.field,
        )?.displayName || key;
  };

  const handleOnUpdateFilter = (filter: ISavedFilter) => dispatch(updateSavedFilter(filter));
  const handleOnSaveFilter = (filter: ISavedFilter) =>
    dispatch(createSavedFilter(addTagToFilter(filter)));
  const handleOnDeleteFilter = (id: string) => dispatch(deleteSavedFilter(id));
  const handleOnSaveAsFavorite = (filter: ISavedFilter) =>
    dispatch(setSavedFilterAsDefault(addTagToFilter(filter)));

  return (
    <Space direction="vertical" size={24} className={styles.variantsPageContent}>
      <QueryBuilder
        id={VARIANT_REPO_QB_ID}
        className="variants-repo__query-builder"
        headerConfig={{
          showHeader: true,
          showTools: true,
          defaultTitle: intl.get('components.querybuilder.defaultTitle'),
          options: {
            enableEditTitle: true,
            enableDuplicate: true,
            enableFavoriteFilter: false,
          },
          selectedSavedFilter: defaultFilter,
          savedFilters: savedFilters,
          onUpdateFilter: handleOnUpdateFilter,
          onSaveFilter: handleOnSaveFilter,
          onDeleteFilter: handleOnDeleteFilter,
          onSetAsFavorite: handleOnSaveAsFavorite,
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<UserOutlined size={18} />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        total={variantResults.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver)}
        getResolvedQueryForCount={() => ({ op: 'and', content: [] })}
        fetchQueryCount={() => {
          return new Promise((resolve, reject) => {
            resolve(1);
          });
        }}
      />
      <Tabs
        type="card"
        activeKey={tabId || TAB_IDS.SUMMARY}
        onChange={(key) => {
          if (!history.location.pathname.includes(key)) {
            history.push(`${STATIC_ROUTES.VARIANT}/${key}${window.location.search}`);
          }
        }}
      >
        <Tabs.TabPane
          tab={
            <span>
              <PieChartOutlined />
              {intl.get('screen.variants.tabs.summary.title')}
            </span>
          }
          key={TAB_IDS.SUMMARY}
        >
          <SummaryTab />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <UserOutlined />
              {intl.get('screen.variants.tabs.variants.title', {
                count: variantResults.total,
              })}
            </span>
          }
          key={TAB_IDS.VARIANTS}
        >
          <VariantsTab
            results={variantResults}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            sqon={variantResolvedSqon}
          />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
};

export default PageContent;
