import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import {
  ExperimentOutlined,
  FileTextOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  DATA_EPLORATION_FILTER_TAG,
  DATA_EXPLORATION_QB_ID,
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import intl from 'react-intl-universal';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';
import { STATIC_ROUTES } from 'utils/routes';
import { getQueryBuilderDictionary } from 'utils/translation';
import { Space, Tabs } from 'antd';
import {
  combineExtendedMappings,
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from 'utils/fieldMapper';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { useParticipants } from 'graphql/participants/actions';
import { useDataFiles } from 'graphql/files/actions';
import { useBiospecimen } from 'graphql/biospecimens/actions';
import SummaryTab from 'views/DataExploration/components/PageContent/tabs/Summary';
import BiospecimensTab from 'views/DataExploration/components/PageContent/tabs/Biospecimens';
import DataFilesTabs from 'views/DataExploration/components/PageContent/tabs/DataFiles';
import ParticipantsTab from 'views/DataExploration/components/PageContent/tabs/Participants';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createSavedFilter,
  deleteSavedFilter,
  setSavedFilterAsDefault,
  updateSavedFilter,
} from 'store/savedFilter/thunks';
import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { INDEXES } from 'graphql/constants';
import { numberWithCommas } from 'utils/string';
import useQBStateWithSavedFilters from 'hooks/useQBStateWithSavedFilters';
import copy from 'copy-to-clipboard';

import styles from './index.module.scss';
import { getCurrentUrl } from 'utils/helper';
import { SHARED_FILTER_ID_QUERY_PARAM_KEY } from 'common/constants';
import { globalActions } from 'store/global';

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
  const { queryList, activeQuery, selectedSavedFilter, savedFilterList } =
    useQBStateWithSavedFilters(DATA_EXPLORATION_QB_ID, DATA_EPLORATION_FILTER_TAG);

  const [selectedFilterContent, setSelectedFilterContent] = useState<ReactElement | undefined>(
    undefined,
  );

  const [participantQueryConfig, setParticipantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [biospecimenQueryConfig, setBiospecimenQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [datafilesQueryConfig, setDatafilesQueryConfig] = useState(DEFAULT_QUERY_CONFIG);

  const participantResolvedSqon = mapFilterForParticipant(
    resolveSyntheticSqon(queryList, activeQuery),
  );
  const biospecimenResolvedSqon = mapFilterForBiospecimen(
    resolveSyntheticSqon(queryList, activeQuery),
  );
  const fileResolvedSqon = mapFilterForFiles(resolveSyntheticSqon(queryList, activeQuery));

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
  }, [JSON.stringify(activeQuery)]);

  const facetTransResolver = (key: string) => {
    const title = intl.get(`facets.${key}`);
    return title
      ? title
      : combineExtendedMappings([participantMapping, fileMapping, biospecimenMapping])?.data?.find(
          (mapping: ExtendedMapping) => key === mapping.field,
        )?.displayName || key;
  };

  const getSqonAndMappingByIndex = (index: INDEXES) => {
    switch (index) {
      case INDEXES.FILE:
        return {
          sqon: fileResolvedSqon,
          mapping: fileMapping,
        };
      case INDEXES.BIOSPECIMEN:
        return {
          sqon: biospecimenResolvedSqon,
          mapping: biospecimenMapping,
        };
      default:
        return {
          sqon: participantResolvedSqon,
          mapping: participantMapping,
        };
    }
  };

  const handleOnUpdateFilter = (filter: ISavedFilter) => dispatch(updateSavedFilter(filter));
  const handleOnSaveFilter = (filter: ISavedFilter) =>
    dispatch(createSavedFilter(addTagToFilter(filter)));
  const handleOnDeleteFilter = (id: string) => dispatch(deleteSavedFilter(id));
  const handleOnSaveAsFavorite = (filter: ISavedFilter) =>
    dispatch(setSavedFilterAsDefault(addTagToFilter(filter)));
  const handleOnShareFilter = (filter: ISavedFilter) => {
    copy(`${getCurrentUrl()}?${SHARED_FILTER_ID_QUERY_PARAM_KEY}=${filter.id}`);
    dispatch(
      globalActions.displayMessage({
        content: 'Copied share url',
        type: 'success',
      }),
    );
  };

  return (
    <Space direction="vertical" size={24} className={styles.dataExplorePageContent}>
      <QueryBuilder
        id={DATA_EXPLORATION_QB_ID}
        className="data-exploration-repo__query-builder"
        headerConfig={{
          showHeader: true,
          showTools: true,
          defaultTitle: intl.get('components.querybuilder.defaultTitle'),
          options: {
            enableEditTitle: true,
            enableDuplicate: true,
            enableFavoriteFilter: false,
            enableShare: true,
          },
          selectedSavedFilter: selectedSavedFilter,
          savedFilters: savedFilterList,
          onShareFilter: handleOnShareFilter,
          onUpdateFilter: handleOnUpdateFilter,
          onSaveFilter: handleOnSaveFilter,
          onDeleteFilter: handleOnDeleteFilter,
          onSetAsFavorite: handleOnSaveAsFavorite,
        }}
        facetFilterConfig={{
          enable: true,
          onFacetClick: (filter) => {
            const index = filter.content.index!;
            const field = filter.content.field;
            const { sqon, mapping } = getSqonAndMappingByIndex(index as INDEXES);
            setSelectedFilterContent(
              <GenericFilters
                queryBuilderId={DATA_EXPLORATION_QB_ID}
                index={index}
                field={dotToUnderscore(field)}
                sqon={sqon}
                extendedMappingResults={mapping}
              />,
            );
          },
          selectedFilterContent: selectedFilterContent,
          blacklistedFacets: ['participant_id', 'sample_id', 'file_id'],
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<UserOutlined size={18} />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
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
                count: numberWithCommas(participantResults.total),
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
                count: numberWithCommas(biospecimenResults.total),
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
                count: numberWithCommas(fileResults.total),
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
