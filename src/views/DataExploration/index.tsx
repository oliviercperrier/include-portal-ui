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
import PageContent, {
  TAB_IDS,
} from "views/DataExploration/components/PageContent";
import ApolloProvider from "provider/ApolloProvider";
import { Spin } from "antd";
import { ExtendedMappingResults } from "graphql/models";
import FilterList from "components/uiKit/FilterList";
import { DATA_EXPLORATION_REPO_CACHE_KEY } from "views/DataExploration/utils/constant";
import { FilterInfo } from "components/uiKit/FilterList/types";
import { GraphqlBackend } from "provider/types";
import useGetExtendedMappings from "hooks/graphql/useGetExtendedMappings";
import { INDEXES } from "graphql/constants";
import { useParams } from "react-router";

import styles from "./index.module.scss";

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
        fields: [
          "study_id",
          "karyotype",
          "down_syndrome_diagnosis",
          "diagnosis__mondo_id_diagnosis",
          "phenotype__hpo_id_phenotype",
          "age_at_data_collection",
          "family_type",
          "sex",
          "race",
          "ethnicity",
        ],
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
  type: FilterTypes,
  index: string
): React.ReactNode => {
  if (mappingResults.loading) {
    return <Spin className={styles.filterLoader} spinning />;
  }

  return (
    <FilterList
      index={index}
      cacheKey={DATA_EXPLORATION_REPO_CACHE_KEY}
      extendedMappingResults={mappingResults}
      filterInfo={filterGroups[type]}
    />
  );
};

const DataExploration = (props: OwnProps) => {
  useParams(); // to sync filters with querybuilder
  const participantMappingResults = useGetExtendedMappings("participant");
  const fileMappingResults = useGetExtendedMappings("file");
  const biospecimenMappingResults = useGetExtendedMappings("biospecimen");

  const menuItems: ISidebarMenuItem[] = [
    {
      key: TAB_IDS.PARTICIPANTS,
      title: intl.get("screen.dataExploration.sidemenu.participant"),
      icon: <UserOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        participantMappingResults,
        FilterTypes.Participant,
        INDEXES.PARTICIPANT
      ),
    },
    {
      key: TAB_IDS.BIOSPECIMENS,
      title: intl.get("screen.dataExploration.sidemenu.biospecimen"),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        { data: [], loading: false },
        FilterTypes.Biospecimen,
        INDEXES.BIOSPECIMEN
      ),
    },
    {
      key: TAB_IDS.DATA_FILES,
      title: intl.get("screen.dataExploration.sidemenu.datafiles"),
      icon: <FileSearchOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        fileMappingResults,
        FilterTypes.Datafiles,
        INDEXES.FILE
      ),
    },
  ];

  return (
    <StackLayout horizontal className={styles.dataExplorationLayout}>
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={menuItems}
        defaultSelectedKey={props.tab}
      />
      <ScrollContent className={styles.scrollContent}>
        <PageContent
          fileMapping={fileMappingResults}
          biospecimenMapping={biospecimenMappingResults}
          participantMapping={participantMappingResults}
          tabId={props.tab}
        ></PageContent>
      </ScrollContent>
    </StackLayout>
  );
};

const DataExplorationWrapper = (props: OwnProps) => {
  return (
    <ApolloProvider backend={GraphqlBackend.ARRANGER}>
      <DataExploration {...props} />
    </ApolloProvider>
  );
};

export default DataExplorationWrapper;
