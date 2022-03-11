import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import intl from 'react-intl-universal';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { ExperimentOutlined, UserOutlined, FileSearchOutlined } from '@ant-design/icons';
import PageContent from 'views/DataExploration/components/PageContent';
import ApolloProvider from 'provider/ApolloProvider';
import { Spin } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { DATA_EXPLORATION_REPO_CACHE_KEY, TAB_IDS } from 'views/DataExploration/utils/constant';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import { GraphqlBackend } from 'provider/types';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { INDEXES } from 'graphql/constants';
import { useParams } from 'react-router';
import {
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from './utils/mapper';
import HpoTreeFacet from './components/HpoTreeFacet';

import styles from './index.module.scss';

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
    //suggester: {
    //  title: () => "Participant ID",
    //  placeholder: () => "PT_0002D5K3",
    //  suggestionType: SUGGESTION_TYPES.PARTICIPANT,
    //  tooltipTitle: () => "Enter a participant ID",
    //},
    groups: [
      {
        fields: [
          'study_id',
          'down_syndrome_status',
          //'observed_phenotype__name',
          //'phenotype__hpo_phenotype_observed',
          'family_type',
          'sex',
          'race',
          'ethnicity',
          'diagnosis__mondo_id_diagnosis',
        ],
        customs: [<HpoTreeFacet />],
      },
    ],
  },
  [FilterTypes.Biospecimen]: {
    //suggester: {
    //  title: () => "Biospecimen ID",
    //  placeholder: () => "DS02_Q1EE22NN",
    //  suggestionType: SUGGESTION_TYPES.BIOSPECIMEN,
    //  tooltipTitle: () => "Enter a biospecimen ID",
    //},
    groups: [
      {
        fields: [
          'sample_type',
          'collection_sample_type',
          'age_at_biospecimen_collection',
          'status',
          'laboratory_procedure',
          'biospecimen_storage',
        ],
      },
    ],
  },
  [FilterTypes.Datafiles]: {
    //suggester: {
    //  title: () => "File ID",
    //  placeholder: () => "GF_007F1GDE",
    //  suggestionType: SUGGESTION_TYPES.FILE,
    //  tooltipTitle: () => "Enter a file ID",
    //},
    groups: [
      {
        fields: ['data_category', 'data_type', 'file_format', 'controlled_access'],
      },
    ],
  },
};

const filtersContainer = (
  mappingResults: ExtendedMappingResults,
  type: FilterTypes,
  index: string,
  filterMapper: TCustomFilterMapper,
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
  const participantMappingResults = useGetExtendedMappings('participant');
  const fileMappingResults = useGetExtendedMappings('file');
  const biospecimenMappingResults = useGetExtendedMappings('biospecimen');

  const menuItems: ISidebarMenuItem[] = [
    {
      key: TAB_IDS.PARTICIPANTS,
      title: intl.get('screen.dataExploration.sidemenu.participant'),
      icon: <UserOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        participantMappingResults,
        FilterTypes.Participant,
        INDEXES.PARTICIPANT,
        mapFilterForParticipant,
      ),
    },
    {
      key: TAB_IDS.BIOSPECIMENS,
      title: intl.get('screen.dataExploration.sidemenu.biospecimen'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        biospecimenMappingResults,
        FilterTypes.Biospecimen,
        INDEXES.BIOSPECIMEN,
        mapFilterForBiospecimen,
      ),
    },
    {
      key: TAB_IDS.DATA_FILES,
      title: intl.get('screen.dataExploration.sidemenu.datafiles'),
      icon: <FileSearchOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        fileMappingResults,
        FilterTypes.Datafiles,
        INDEXES.FILE,
        mapFilterForFiles,
      ),
    },
  ];

  return (
    <div className={styles.dataExplorationLayout}>
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} defaultSelectedKey={tab} />
      <ScrollContent className={styles.scrollContent}>
        <PageContent
          fileMapping={fileMappingResults}
          biospecimenMapping={biospecimenMappingResults}
          participantMapping={participantMappingResults}
          tabId={tab}
        />
      </ScrollContent>
    </div>
  );
};

const DataExplorationWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <DataExploration {...props} />
  </ApolloProvider>
);

export default DataExplorationWrapper;
