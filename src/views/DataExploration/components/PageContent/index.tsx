import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import QueryBuilder from "@ferlab/ui/core/components/QueryBuilder";
import {
  ExperimentOutlined,
  FileTextOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import history from "utils/history";
import { DATA_EXPLORATION_REPO_CACHE_KEY } from "views/DataExploration/utils/constant";
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

import SummaryTab from "views/DataExploration/components/tabs/Summary";
import BiospecimensTab from "views/DataExploration/components/tabs/Biospecimens";
import DataFilesTabs from "views/DataExploration/components/tabs/DataFiles";
import ParticipantsTab from "views/DataExploration/components/tabs/Participants";

import styles from "./index.module.scss";
import { resolveSyntheticSqon } from "@ferlab/ui/core/data/sqon/utils";
import { useParticipants } from "graphql/participants/actions";
import { useDataFiles } from "graphql/files/actions";
import { useBiospecimen } from "graphql/biospecimens/actions";

interface OwnProps {
  fileMapping: ExtendedMappingResults;
  biospecimenMapping: ExtendedMappingResults;
  participantMapping: ExtendedMappingResults;
  tabId?: string;
}

export enum TAB_IDS {
  SUMMARY = "summary",
  PARTICIPANTS = "participants",
  BIOSPECIMENS = "biospecimens",
  DATA_FILES = "datafiles",
}

const PageContent = ({
  fileMapping,
  biospecimenMapping,
  participantMapping,
  tabId = undefined,
}: OwnProps) => {
  const { filters } = useFilters();
  const allSqons = getQueryBuilderCache(DATA_EXPLORATION_REPO_CACHE_KEY).state;

  const participantResults = useParticipants({
    first: 100,
    offset: 0,
    sqon: resolveSyntheticSqon(allSqons, mapFilterForParticipant(filters)),
    sort: [],
  });

  const fileResults = useDataFiles({
    first: 100,
    offset: 0,
    sqon: resolveSyntheticSqon(allSqons, mapFilterForFiles(filters)),
    sort: [],
  });

  const biospecimenResults = useBiospecimen({
    first: 100,
    offset: 0,
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
    <StackLayout vertical className={styles.dataExplorePageContent}>
      <Space direction="vertical" size={24}>
        <QueryBuilder
          className="data-exploration-repo__query-builder"
          headerConfig={{
            showHeader: true,
            showTools: true,
            defaultTitle: "My Queries",
            options: {
              enableEditTitle: true,
              enableDuplicate: true,
            },
          }}
          enableCombine
          enableShowHideLabels
          IconTotal={<UserOutlined size={18} />}
          history={history}
          cacheKey={DATA_EXPLORATION_REPO_CACHE_KEY}
          currentQuery={filters?.content?.length ? filters : {}}
          loading={participantMapping.loading}
          total={
            participantResults.total +
            fileResults.total +
            biospecimenResults.total
          }
          dictionary={getQueryBuilderDictionary(facetTransResolver)}
        />
        <Tabs
          type="card"
          activeKey={tabId}
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
            <ParticipantsTab results={participantResults} />
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
            <BiospecimensTab results={biospecimenResults} />
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
            <DataFilesTabs results={fileResults} />
          </Tabs.TabPane>
        </Tabs>
      </Space>
    </StackLayout>
  );
};

export default PageContent;
