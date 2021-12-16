import React from "react";
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
import { ExtendedMapping } from "graphql/models";
import { useFilters } from "@ferlab/ui/core/data/filters/utils";
import { getQueryBuilderDictionary } from "utils/translation";

import styles from "./index.module.scss";
import { Space, Tabs } from "antd";

interface OwnProps {
  mappingResults: any; // TODO Set a type
}

const PageContent = ({ mappingResults }: OwnProps) => {
  const { filters } = useFilters();
  const total = 0;

  const facetTransResolver = (key: string) => {
    const title = intl.get(`filters.group.${key}`);
    return title
      ? title
      : mappingResults?.extendedMapping?.find(
          (mapping: ExtendedMapping) => key === mapping.field
        )?.displayName || key;
  };

  return (
    <StackLayout vertical className={styles.dataExplorePageContent}>
      <Space direction="vertical" size={24}>
        <QueryBuilder
          className="data-exploration-repo__query-builder"
          headerConfig={{
            showHeader: true,
            showTools: false,
            defaultTitle: "My Queries",
          }}
          enableCombine
          enableShowHideLabels
          IconTotal={<UserOutlined size={18} />}
          history={history}
          cacheKey={DATA_EXPLORATION_REPO_CACHE_KEY}
          currentQuery={filters?.content?.length ? filters : {}}
          loading={mappingResults.loading}
          total={total}
          dictionary={getQueryBuilderDictionary(facetTransResolver)}
        />
        <Tabs type="card">
          <Tabs.TabPane
            tab={
              <span>
                <PieChartOutlined />
                {intl.get("screen.dataExploration.tabs.summary")}
              </span>
            }
            key="summary"
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <UserOutlined />
                {intl.get("screen.dataExploration.tabs.participants")}
              </span>
            }
            key="participants"
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <ExperimentOutlined />
                {intl.get("screen.dataExploration.tabs.biospecimens")}
              </span>
            }
            key="biospecimens"
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <FileTextOutlined />
                {intl.get("screen.dataExploration.tabs.datafiles")}
              </span>
            }
            key="datafiles"
          ></Tabs.TabPane>
        </Tabs>
      </Space>
    </StackLayout>
  );
};

export default PageContent;
