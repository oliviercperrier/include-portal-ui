import SidebarMenu, {
  ISidebarMenuItem,
} from "@ferlab/ui/core/components/SidebarMenu";
import intl from "react-intl-universal";
import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import ScrollContent from "@ferlab/ui/core/layout/ScrollContent";
import {
  ExperimentOutlined,
  UserOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import PageContent from "views/DataExploration/components/PageContent";

import styles from "./index.module.scss";
import { Spin } from "antd";
import { ExtendedMappingResults } from "graphql/models";
//import FilterList from "components/uiKit/FilterList";
//import { DATA_EXPLORATION_REPO_CACHE_KEY } from "views/DataExploration/utils/constant";
import { FilterInfo } from "components/uiKit/FilterList/types";

interface OwnProps {
  tab?: string;
}

enum FilterTypes {
  Participant,
  Biospecimen,
  Datafiles,
}

export const filterGroups: {
  [type: string]: FilterInfo;
} = {
  [FilterTypes.Participant]: {
    groups: [
      {
        fields: [],
      },
    ],
  },
  [FilterTypes.Biospecimen]: {
    groups: [
      {
        fields: [],
      },
    ],
  },
  [FilterTypes.Datafiles]: {
    groups: [
      {
        fields: [],
      },
    ],
  },
};

const filtersContainer = (
  mappingResults: ExtendedMappingResults,
  type: FilterTypes
): React.ReactNode => {
  if (mappingResults.loading) {
    return <Spin className={styles.filterLoader} spinning />;
  }

  return <></>;

  //return (
  //  <FilterList
  //    index={/* Add INDEX */}
  //    query={/** Add aggregation query */}
  //    cacheKey={DATA_EXPLORATION_REPO_CACHE_KEY}
  //    extendedMappingResults={mappingResults}
  //    filterInfo={filterGroups[type]}
  //  />
  //);
};

const DataExploration = (props: OwnProps) => {
  //cont mappingResults = useGetExtendedMappings();

  const menuItems: ISidebarMenuItem[] = [
    {
      key: "1",
      title: intl.get("screen.dataExploration.sidemenu.participant"),
      icon: <UserOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        { data: [], loading: false },
        FilterTypes.Participant
      ),
    },
    {
      key: "2",
      title: intl.get("screen.dataExploration.sidemenu.biospecimen"),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        { data: [], loading: false },
        FilterTypes.Biospecimen
      ),
    },
    {
      key: "3",
      title: intl.get("screen.dataExploration.sidemenu.datafiles"),
      icon: <FileSearchOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        { data: [], loading: false },
        FilterTypes.Datafiles
      ),
    },
  ];

  return (
    <StackLayout horizontal className={styles.dataExplorationLayout}>
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContent className={styles.scrollContent}>
        <PageContent mappingResults={{}} tabId={props.tab}></PageContent>
      </ScrollContent>
    </StackLayout>
  );
};

export default DataExploration;
