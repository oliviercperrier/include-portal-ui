import SidebarMenu, {
  ISidebarMenuItem,
} from "@ferlab/ui/core/components/SidebarMenu";
import intl from "react-intl-universal";
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
import { Space, Spin } from "antd";
import { ExtendedMappingResults } from "graphql/models";
import FilterList, { TCustomFilterMapper } from "components/uiKit/FilterList";
import { DATA_EXPLORATION_REPO_CACHE_KEY } from "views/DataExploration/utils/constant";
import { FilterInfo } from "components/uiKit/FilterList/types";
import { GraphqlBackend } from "provider/types";
import useGetExtendedMappings from "hooks/graphql/useGetExtendedMappings";
import { INDEXES } from "graphql/constants";
import { useParams } from "react-router";

import styles from "./index.module.scss";
import {
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from "./utils/mapper";

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
        fields: [
          "biospecimen_type",
          "sample_type",
          "derived_sample_type",
          "ncit_id_tissue_type",
          "age_at_biospecimen_collection",
          "bio_repository",
        ],
      },
    ],
  },
  [FilterTypes.Datafiles]: {
    groups: [
      {
        fields: [
          "type_of_omics",
          "experimental_strategy",
          "data_category",
          "data_type",
          "file_format",
          "size",
          "access",
        ],
      },
    ],
  },
};

const filtersContainer = (
  mappingResults: ExtendedMappingResults,
  type: FilterTypes,
  index: string,
  filterMapper: TCustomFilterMapper
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
      filterMapper={filterMapper}
    />
  );
};

const DataExploration = (props: OwnProps) => {
  const { tab } = useParams<{ tab: string }>(); // to sync filters with querybuilder
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
        INDEXES.PARTICIPANT,
        mapFilterForParticipant
      ),
    },
    {
      key: TAB_IDS.BIOSPECIMENS,
      title: intl.get("screen.dataExploration.sidemenu.biospecimen"),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        biospecimenMappingResults,
        FilterTypes.Biospecimen,
        INDEXES.BIOSPECIMEN,
        mapFilterForBiospecimen
      ),
    },
    {
      key: TAB_IDS.DATA_FILES,
      title: intl.get("screen.dataExploration.sidemenu.datafiles"),
      icon: <FileSearchOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        fileMappingResults,
        FilterTypes.Datafiles,
        INDEXES.FILE,
        mapFilterForFiles
      ),
    },
  ];

  return (
    <div className={styles.dataExplorationLayout}>
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={menuItems}
        defaultSelectedKey={tab}
      />
      <ScrollContent className={styles.scrollContent}>
        <PageContent
          fileMapping={fileMappingResults}
          biospecimenMapping={biospecimenMappingResults}
          participantMapping={participantMappingResults}
          tabId={tab}
        ></PageContent>
      </ScrollContent>
    </div>
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
