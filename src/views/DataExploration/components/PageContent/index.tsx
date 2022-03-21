import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import {
  ExperimentOutlined,
  FileTextOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  DATA_EPLORATION_FILTER_TAG,
  DATA_EXPLORATION_REPO_CACHE_KEY,
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import intl from 'react-intl-universal';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';
import { getQueryBuilderCache, useFilters } from '@ferlab/ui/core/data/filters/utils';
import { STATIC_ROUTES } from 'utils/routes';
import { getQueryBuilderDictionary } from 'utils/translation';
import { Space, Tabs } from 'antd';
import {
  combineExtendedMappings,
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from 'views/DataExploration/utils/mapper';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { useParticipants } from 'graphql/participants/actions';
import { useDataFiles } from 'graphql/files/actions';
import { useBiospecimen } from 'graphql/biospecimens/actions';
import SummaryTab from 'views/DataExploration/components/tabs/Summary';
import BiospecimensTab from 'views/DataExploration/components/tabs/Biospecimens';
import DataFilesTabs from 'views/DataExploration/components/tabs/DataFiles';
import ParticipantsTab from 'views/DataExploration/components/tabs/Participants';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createSavedFilter,
  deleteSavedFilter,
  fetchSavedFilters,
  setSavedFilterAsDefault,
  updateSavedFilter,
} from 'store/savedFilter/thunks';
import { useSavedFilter } from 'store/savedFilter';
import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import { useHistory } from 'react-router-dom';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { isEmpty } from 'lodash';

import styles from './index.module.scss';

type OwnProps = {
  fileMapping: ExtendedMappingResults;
  biospecimenMapping: ExtendedMappingResults;
  participantMapping: ExtendedMappingResults;
  tabId?: string;
};

const addTagToFilter = (filter: ISavedFilter) => ({
  ...filter,
  tag: DATA_EPLORATION_FILTER_TAG,
});

const PageContent = ({
  fileMapping,
  biospecimenMapping,
  participantMapping,
  tabId = TAB_IDS.SUMMARY,
}: OwnProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filters }: { filters: ISyntheticSqon } = useFilters();
  const { savedFilters, defaultFilter } = useSavedFilter(DATA_EPLORATION_FILTER_TAG);
  const allSqons = getQueryBuilderCache(DATA_EXPLORATION_REPO_CACHE_KEY).state;

  const [participantQueryConfig, setParticipantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [biospecimenQueryConfig, setBiospecimenQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [datafilesQueryConfig, setDatafilesQueryConfig] = useState(DEFAULT_QUERY_CONFIG);

  const participantResolvedSqon = mapFilterForParticipant(resolveSyntheticSqon(allSqons, filters));
  const biospecimenResolvedSqon = mapFilterForBiospecimen(resolveSyntheticSqon(allSqons, filters));
  const fileResolvedSqon = mapFilterForFiles(resolveSyntheticSqon(allSqons, filters));

  const participantResults = useParticipants({
    first: participantQueryConfig.size,
    offset: participantQueryConfig.size * (participantQueryConfig.pageIndex - 1),
    sqon: participantResolvedSqon,
    sort: isEmpty(participantQueryConfig.sort)
      ? [{ field: 'participant_id', order: 'asc' }]
      : participantQueryConfig.sort,
  });

  const fileResults = useDataFiles({
    first: datafilesQueryConfig.size,
    offset: datafilesQueryConfig.size * (datafilesQueryConfig.pageIndex - 1),
    sqon: fileResolvedSqon,
    sort: isEmpty(datafilesQueryConfig.sort)
      ? [{ field: 'file_id', order: 'asc' }]
      : datafilesQueryConfig.sort,
  });

  const biospecimenResults = useBiospecimen({
    first: biospecimenQueryConfig.size,
    offset: biospecimenQueryConfig.size * (biospecimenQueryConfig.pageIndex - 1),
    sqon: biospecimenResolvedSqon,
    sort: isEmpty(biospecimenQueryConfig.sort)
      ? [{ field: 'sample_id', order: 'asc' }]
      : biospecimenQueryConfig.sort,
  });

  useEffect(() => {
    dispatch(fetchSavedFilters(DATA_EPLORATION_FILTER_TAG));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setParticipantQueryConfig({
      ...participantQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    setBiospecimenQueryConfig({
      ...biospecimenQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    setDatafilesQueryConfig({
      ...datafilesQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  const facetTransResolver = (key: string) => {
    const title = intl.get(`facets.${key}`);
    return title
      ? title
      : combineExtendedMappings([participantMapping, fileMapping, biospecimenMapping])?.data?.find(
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
    <Space direction="vertical" size={24} className={styles.dataExplorePageContent}>
      <QueryBuilder
        className="data-exploration-repo__query-builder"
        headerConfig={{
          showHeader: true,
          showTools: true,
          defaultTitle: intl.get('screen.dataExploration.queryBuilder.defaultTitle'),
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
        history={history}
        enableCombine
        enableShowHideLabels
        IconTotal={<UserOutlined size={18} />}
        cacheKey={DATA_EXPLORATION_REPO_CACHE_KEY}
        currentQuery={isEmptySqon(filters) ? {} : filters}
        loading={participantMapping.loading || fileResults.loading || biospecimenResults.loading}
        total={participantResults.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver)}
      />
      <Tabs
        type="card"
        activeKey={tabId || TAB_IDS.SUMMARY}
        onChange={(key) => {
          if (!history.location.pathname.includes(key)) {
            history.push(`${STATIC_ROUTES.DATA_EXPLORATION}/${key}${window.location.search}`);
          }
        }}
      >
        <Tabs.TabPane
          tab={
            <span>
              <PieChartOutlined />
              {intl.get('screen.dataExploration.tabs.summary.title')}
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
              {intl.get('screen.dataExploration.tabs.participants.title', {
                count: participantResults.total,
              })}
            </span>
          }
          key={TAB_IDS.PARTICIPANTS}
        >
          <ParticipantsTab
            results={participantResults}
            setQueryConfig={setParticipantQueryConfig}
            queryConfig={participantQueryConfig}
            sqon={participantResolvedSqon}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <ExperimentOutlined />
              {intl.get('screen.dataExploration.tabs.biospecimens.title', {
                count: biospecimenResults.total,
              })}
            </span>
          }
          key={TAB_IDS.BIOSPECIMENS}
        >
          <BiospecimensTab
            results={biospecimenResults}
            setQueryConfig={setBiospecimenQueryConfig}
            queryConfig={biospecimenQueryConfig}
            sqon={biospecimenResolvedSqon}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FileTextOutlined />
              {intl.get('screen.dataExploration.tabs.datafiles.title', {
                count: fileResults.total,
              })}
            </span>
          }
          key={TAB_IDS.DATA_FILES}
        >
          <DataFilesTabs
            results={fileResults}
            setQueryConfig={setDatafilesQueryConfig}
            queryConfig={datafilesQueryConfig}
            sqon={fileResolvedSqon}
          />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
};

export default PageContent;
