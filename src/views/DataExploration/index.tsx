import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import intl from 'react-intl-universal';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { ExperimentOutlined, UserOutlined, FileSearchOutlined } from '@ant-design/icons';
import PageContent from 'views/DataExploration/components/PageContent';
import ApolloProvider from 'provider/ApolloProvider';
import { Spin } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import {
  DATA_EXPLORATION_QB_ID,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import { GraphqlBackend } from 'provider/types';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { INDEXES } from 'graphql/constants';
import { useParams } from 'react-router';
import {
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from 'utils/fieldMapper';
import TreeFacet from './components/TreeFacet';
import ParticipantSearch from './components/ParticipantSearch';
import FileSearch from './components/FileSearch';
import { BiospecimenSearch, BiospecimenCollectionSearch } from './components/BiospecimenSearch';
import { formatHpoTitleAndCode, formatMondoTitleAndCode } from './utils/helper';
import ParticipantSetSearch from './components/ParticipantSetSearch';
import FileSetSearch from './components/FileSetSearch';
import BiospecimenSetSearch from './components/BiospecimenSetSearch';

import styles from './index.module.scss';
import UploadIds from 'components/uiKit/UploadIds';

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
    customSearches: [
      <ParticipantSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <ParticipantSetSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <UploadIds
        fetchMatch={(ids) =>
          new Promise<any>((resolve, reject) => {
            resolve(
              ids.map((id) => ({
                id,
                id1: id,
                id2: id,
              })),
            );
          })
        }
      />,
    ],
    groups: [
      {
        facets: [
          'study_id',
          'down_syndrome_status',
          <TreeFacet type={'mondoTree'} field={'mondo'} titleFormatter={formatMondoTitleAndCode} />,
          <TreeFacet
            type={'hpoTree'}
            field={'observed_phenotype'}
            titleFormatter={formatHpoTitleAndCode}
          />,
          'family_type',
          'sex',
          'race',
          'ethnicity',
        ],
      },
    ],
  },
  [FilterTypes.Biospecimen]: {
    customSearches: [
      <BiospecimenSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <BiospecimenCollectionSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <BiospecimenSetSearch key={2} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
    ],
    groups: [
      {
        facets: [
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
    customSearches: [
      <FileSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <FileSetSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
    ],
    groups: [
      {
        facets: [
          'controlled_access',
          'data_category',
          'data_type',
          'sequencing_experiment__experiment_strategy',
          'file_format',
        ],
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
      key={index}
      index={index}
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      extendedMappingResults={mappingResults}
      filterInfo={filterGroups[type]}
      filterMapper={filterMapper}
    />
  );
};

const DataExploration = (props: OwnProps) => {
  const { tab } = useParams<{ tab: string }>();
  const participantMappingResults = useGetExtendedMappings(INDEXES.PARTICIPANT);
  const fileMappingResults = useGetExtendedMappings(INDEXES.FILE);
  const biospecimenMappingResults = useGetExtendedMappings(INDEXES.BIOSPECIMEN);

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
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={menuItems} /* defaultSelectedKey={tab} */
      />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
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
