import {
  IParticipantDiagnosis,
  IParticipantEntity,
  IParticipantPhenotype,
} from 'graphql/participants/models';
import { ArrangerResultsTree, IQueryResults } from 'graphql/models';
import { DEFAULT_PAGE_SIZE, TAB_IDS } from 'views/DataExploration/utils/constant';
import { RowSelection, TPagingConfig, TPagingConfigCb } from 'views/DataExploration/utils/types';
import { SEX, TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import ExpandableCell from 'components/uiKit/table/ExpendableCell';
import {
  extractMondoTitleAndCode,
  extractPhenotypeTitleAndCode,
} from 'views/DataExploration/utils/helper';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { getProTableDictionary } from 'utils/translation';
import { Button, Dropdown, Menu, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { updateUserConfig } from 'store/user/thunks';
import { useUser } from 'store/user';
import { ReportType } from 'services/api/reports/models';
import { DownloadOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IParticipantEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
  downloadReport: (e: string) => void;
  rowSelection: RowSelection;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: 'participant_id',
    title: 'ID',
    dataIndex: 'participant_id',
  },
  {
    key: 'study_id',
    title: 'Study Code',
    dataIndex: 'study_id',
    className: styles.studyIdCell,
  },
  {
    key: 'study_external_id',
    title: 'dbGaP Accession number',
    dataIndex: 'study_external_id',
    render: (study_external_id: string) => (
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${study_external_id}`}
      >
        {study_external_id}
      </a>
    ),
  },
  {
    key: 'karyotype',
    title: 'Karyotype',
    dataIndex: 'karyotype',
  },
  {
    key: 'down_syndrome_diagnosis',
    title: 'Down Syndrome Diagnosis',
    dataIndex: 'down_syndrome_diagnosis',
    render: (down_syndrome_diagnosis: string) =>
      down_syndrome_diagnosis || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sex',
    title: 'Sex',
    dataIndex: 'sex',
    render: (sex: string) => (
      <Tag
        color={
          sex.toLowerCase() === SEX.FEMALE
            ? 'magenta'
            : sex.toLowerCase() === SEX.MALE
            ? 'geekblue'
            : ''
        }
      >
        {sex}
      </Tag>
    ),
  },
  {
    key: 'family_type',
    title: 'Family Unit',
    dataIndex: 'family_type',
  },
  {
    key: 'is_proband',
    title: 'Proband Status',
    dataIndex: 'is_proband',
    defaultHidden: true,
  },
  {
    key: 'age_at_data_collection',
    title: 'Age at Data Collection',
    dataIndex: 'age_at_data_collection',
  },
  {
    key: 'diagnosis',
    title: 'Diagnosis (Mondo)',
    dataIndex: 'diagnosis',
    className: styles.diagnosisCell,
    render: (diagnosis: ArrangerResultsTree<IParticipantDiagnosis>) => {
      const mondo_ids_diagnosis = diagnosis?.hits?.edges
        .map((diagnosis) => diagnosis.node.mondo_id_diagnosis)
        .filter((id) => !!id);

      if (!mondo_ids_diagnosis) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nbToShow={1}
          dataSource={mondo_ids_diagnosis}
          renderItem={(modo_id, index): React.ReactNode => {
            const mondoInfo = extractMondoTitleAndCode(modo_id);

            return mondoInfo ? (
              <div key={index}>
                {mondoInfo.title} (MONDO:{' '}
                <a
                  href={`https://monarchinitiative.org/disease/MONDO:${mondoInfo.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {mondoInfo.code}
                </a>
                )
              </div>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            );
          }}
        />
      );
    },
  },
  {
    key: 'phenotype',
    title: 'Phenotype (HPO)',
    dataIndex: 'phenotype',
    className: styles.phenotypeCell,
    render: (phenotype: ArrangerResultsTree<IParticipantPhenotype>) => {
      const hydratedPhenotypeIds = phenotype?.hits?.edges
        .map((phenotype) => phenotype.node.hpo_id_phenotype)
        .filter((id) => !!id);

      if (!hydratedPhenotypeIds) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nbToShow={1}
          dataSource={hydratedPhenotypeIds}
          renderItem={(hpo_id_phenotype, index): React.ReactNode => {
            const phenotypeInfo = extractPhenotypeTitleAndCode(hpo_id_phenotype);

            return phenotypeInfo ? (
              <div key={index}>
                {phenotypeInfo.title} (HP:{' '}
                <a
                  href={`https://hpo.jax.org/app/browse/term/HP:${phenotypeInfo.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {phenotypeInfo.code}
                </a>
                )
              </div>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            );
          }}
        />
      );
    },
  },
  {
    key: 'biospecimen',
    title: 'Biospecimen',
    render: (record: IParticipantEntity) => record?.biospecimen?.hits?.total || 0,
  },
  {
    key: 'files',
    title: 'Files',
    render: (record: IParticipantEntity) => record?.files?.hits?.total || 0,
  },
];

const ParticipantsTab = ({
  results,
  setPagingConfig,
  pagingConfig,
  downloadReport,
  rowSelection,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { selectedRows, onAllRowSelection, onRowSelection, allRowSelected } = rowSelection;

  const menu = (
    <Menu onClick={(e) => downloadReport(e.key)}>
      <Menu.Item key={ReportType.CLINICAL_DATA}>Participant Only</Menu.Item>
      <Menu.Item key={ReportType.CLINICAL_DATA_FAM}>Participant & Family Members</Menu.Item>
    </Menu>
  );

  return (
    <ProTable
      tableId="participants_table"
      rowSelection={{
        selectedRowKeys: selectedRows,
        onSelect: (selectedRowKey) => {
          onRowSelection(selectedRowKey.key, TAB_IDS.PARTICIPANTS);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          onAllRowSelection(
            selectedRows.filter(Boolean).map((e) => e.key),
            TAB_IDS.PARTICIPANTS,
            selected,
          );
        },
      }}
      columns={defaultColumns}
      wrapperClassName={styles.participantTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.participants?.columns}
      headerConfig={{
        itemCount: {
          pageIndex: pagingConfig.index,
          pageSize: pagingConfig.size,
          total: results.total,
        },
        columnSetting: true,
        onColumnStateChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  participants: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        extra: [
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>
              <DownloadOutlined />
              Download clinical data
            </Button>
          </Dropdown>,
        ],
      }}
      bordered
      size="small"
      pagination={{
        pageSize: pagingConfig.size,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results.total,
        onChange: (page, size) => {
          //TODO make a reset function?
          if (allRowSelected) {
            onAllRowSelection([], TAB_IDS.PARTICIPANTS, false);
          }
          if (pagingConfig.index !== page || pagingConfig.size !== size) {
            setPagingConfig({
              index: page,
              size: size!,
            });
          }
        },
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.participant_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default ParticipantsTab;
