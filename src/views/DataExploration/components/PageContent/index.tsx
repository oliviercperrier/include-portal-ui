import QueryBuilder from "@ferlab/ui/core/components/QueryBuilder";
import {
  ExperimentOutlined,
  FileTextOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import history from "utils/history";
import {
  DATA_EXPLORATION_REPO_CACHE_KEY,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "views/DataExploration/utils/constant";
import intl from "react-intl-universal";
import { ExtendedMapping, ExtendedMappingResults } from "graphql/models";
import {
  getQueryBuilderCache,
  useFilters,
} from "@ferlab/ui/core/data/filters/utils";
import { STATIC_ROUTES } from "utils/routes";
import { getQueryBuilderDictionary } from "utils/translation";
import { Space, Tabs } from "antd";
import {
  mapFilterForParticipant,
  combineExtendedMappings,
  mapFilterForFiles,
  mapFilterForBiospecimen,
} from "views/DataExploration/utils/mapper";
import { resolveSyntheticSqon } from "@ferlab/ui/core/data/sqon/utils";
import { useParticipants } from "graphql/participants/actions";
import { useDataFiles } from "graphql/files/actions";
import { useBiospecimen } from "graphql/biospecimens/actions";

import SummaryTab from "views/DataExploration/components/tabs/Summary";
import BiospecimensTab from "views/DataExploration/components/tabs/Biospecimens";
import DataFilesTabs from "views/DataExploration/components/tabs/DataFiles";
import ParticipantsTab from "views/DataExploration/components/tabs/Participants";
import { useState } from "react";

import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { createSavedFilter, deleteSavedFilter } from "store/savedFilter/thunks";
import { useSavedFilter } from "store/savedFilter";

interface OwnProps {
  fileMapping: ExtendedMappingResults;
  biospecimenMapping: ExtendedMappingResults;
  participantMapping: ExtendedMappingResults;
  tabId?: string;
}

const DATA_EPLORATION_FILTER_TAG = "data-exploration";

export enum TAB_IDS {
  SUMMARY = "summary",
  PARTICIPANTS = "participants",
  BIOSPECIMENS = "biospecimens",
  DATA_FILES = "datafiles",
}

const DEFAULT_PAGING_CONFIG = {
  index: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

const PageContent = ({
  fileMapping,
  biospecimenMapping,
  participantMapping,
  tabId = TAB_IDS.SUMMARY,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { savedFilters } = useSavedFilter();
  const { filters } = useFilters();
  const allSqons = getQueryBuilderCache(DATA_EXPLORATION_REPO_CACHE_KEY).state;
  const [pagingConfigParticipant, setPagingConfigParticipant] = useState(
    DEFAULT_PAGING_CONFIG
  );
  const [pagingConfigBiospecimen, setPagingConfigBiospecimen] = useState(
    DEFAULT_PAGING_CONFIG
  );
  const [pagingConfigFile, setPagingConfigFile] = useState(
    DEFAULT_PAGING_CONFIG
  );

  const participantResults = useParticipants({
    first: pagingConfigParticipant.size,
    offset: pagingConfigParticipant.size * (pagingConfigParticipant.index - 1),
    sqon: resolveSyntheticSqon(allSqons, mapFilterForParticipant(filters)),
    sort: [],
  });

  const fileResults = useDataFiles({
    first: pagingConfigFile.size,
    offset: pagingConfigFile.size * (pagingConfigFile.index - 1),
    sqon: resolveSyntheticSqon(allSqons, mapFilterForFiles(filters)),
    sort: [],
  });

  const biospecimenResults = useBiospecimen({
    first: pagingConfigBiospecimen.size,
    offset: pagingConfigBiospecimen.size * (pagingConfigBiospecimen.index - 1),
    sqon: resolveSyntheticSqon(allSqons, mapFilterForBiospecimen(filters)),
    sort: [],
  });

  const facetTransResolver = (key: string) => {
    const title = intl.get(`facets.${key}`);
    return title
      ? title
      : combineExtendedMappings([
          participantMapping,
          fileMapping,
          biospecimenMapping,
        ])?.data?.find((mapping: ExtendedMapping) => key === mapping.field)
          ?.displayName || key;
  };

  return (
    <Space
      direction="vertical"
      size={24}
      className={styles.dataExplorePageContent}
    >
      <QueryBuilder
        className="data-exploration-repo__query-builder"
        headerConfig={{
          showHeader: true,
          showTools: true,
          defaultTitle: intl.get(
            "screen.dataExploration.queryBuilder.defaultTitle"
          ),
          options: {
            enableEditTitle: true,
            enableDuplicate: true,
          },
          savedFilters: savedFilters,
          onSaveFilter: (filter) =>
            dispatch(
              createSavedFilter({
                ...filter,
                tag: DATA_EPLORATION_FILTER_TAG,
              })
            ),
          onDeleteFilter: (id) => dispatch(deleteSavedFilter(id)),
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<UserOutlined size={18} />}
        history={history}
        cacheKey={DATA_EXPLORATION_REPO_CACHE_KEY}
        currentQuery={filters?.content?.length ? filters : {}}
        loading={
          participantMapping.loading ||
          fileResults.loading ||
          biospecimenResults.loading
        }
        total={participantResults.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver)}
      />
      <Tabs
        type="card"
        activeKey={tabId || TAB_IDS.SUMMARY}
        onChange={(key) => {
          if (!history.location.pathname.includes(key)) {
            history.push(
              `${STATIC_ROUTES.DATA_EXPLORATION}/${key}${window.location.search}`
            );
          }
        }}
      >
        <Tabs.TabPane
          tab={
            <span>
              <PieChartOutlined />
              {intl.get("screen.dataExploration.tabs.summary")}
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
              {intl.get("screen.dataExploration.tabs.participants", {
                count: participantResults.total,
              })}
            </span>
          }
          key={TAB_IDS.PARTICIPANTS}
        >
          <ParticipantsTab
            results={participantResults}
            setPagingConfig={setPagingConfigParticipant}
            pagingConfig={pagingConfigParticipant}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <ExperimentOutlined />
              {intl.get("screen.dataExploration.tabs.biospecimens", {
                count: biospecimenResults.total,
              })}
            </span>
          }
          key={TAB_IDS.BIOSPECIMENS}
        >
          <BiospecimensTab
            results={biospecimenResults}
            setPagingConfig={setPagingConfigBiospecimen}
            pagingConfig={pagingConfigBiospecimen}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FileTextOutlined />
              {intl.get("screen.dataExploration.tabs.datafiles", {
                count: fileResults.total,
              })}
            </span>
          }
          key={TAB_IDS.DATA_FILES}
        >
          <DataFilesTabs
            results={fileResults}
            setPagingConfig={setPagingConfigFile}
            pagingConfig={pagingConfigFile}
          />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
};

export default PageContent;
