import {
  ITableParticipantEntity,
  IParticipantEntity,
  IParticipantMondo,
  IParticipantObservedPhenotype,
} from 'graphql/participants/models';
import { ArrangerResultsTree, IQueryResults } from 'graphql/models';
import { DEFAULT_PAGE_SIZE } from 'views/DataExploration/utils/constant';
import {
  THandleReportDownload,
  TPagingConfig,
  TPagingConfigCb,
} from 'views/DataExploration/utils/types';
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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { STATIC_ROUTES } from 'utils/routes';
import { addFilter } from 'utils/sqons';
import { INDEXES } from 'graphql/constants';
import { createQueryParams } from '@ferlab/ui/core/data/filters/utils';
import { fetchTsvReport } from 'store/report/thunks';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import ExternalLink from 'components/uiKit/ExternalLink';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IParticipantEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
  downloadReport: THandleReportDownload;
  sqon?: ISqonGroupFilter;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: 'participant_id',
    title: 'Participant ID',
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
    title: 'dbGaP',
    dataIndex: 'study_external_id',
    render: (study_external_id: string) => (
      <ExternalLink
        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${study_external_id}`}
      >
        {study_external_id}
      </ExternalLink>
    ),
  },
  {
    key: 'karyotype',
    title: 'DS Status',
    dataIndex: 'karyotype',
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
    title: 'Proband',
    dataIndex: 'is_proband',
    defaultHidden: true,
  },
  {
    key: 'mondo.name',
    title: 'Diagnosis (Mondo)',
    dataIndex: 'mondo',
    className: styles.diagnosisCell,
    render: (mondo: ArrangerResultsTree<IParticipantMondo>) => {
      const mondoNames = mondo?.hits?.edges.filter((m) => m.node.is_tagged).map((m) => m.node.name);

      if (!mondoNames || mondoNames.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nbToShow={1}
          dataSource={mondoNames}
          renderItem={(modo_id, index): React.ReactNode => {
            const mondoInfo = extractMondoTitleAndCode(modo_id);

            return mondoInfo ? (
              <div key={index}>
                {mondoInfo.title} (MONDO:{' '}
                <ExternalLink
                  href={`https://monarchinitiative.org/disease/MONDO:${mondoInfo.code}`}
                >
                  {mondoInfo.code}
                </ExternalLink>
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
    key: 'observed_phenotype.name',
    title: 'Phenotype (HPO)',
    dataIndex: 'observed_phenotype',
    className: styles.phenotypeCell,
    render: (observed_phenotype: ArrangerResultsTree<IParticipantObservedPhenotype>) => {
      const phenotypeNames = observed_phenotype?.hits?.edges
        .filter((p) => p.node.is_tagged)
        .map((p) => p.node.name);

      if (!phenotypeNames || phenotypeNames.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nbToShow={1}
          dataSource={phenotypeNames}
          renderItem={(hpo_id_phenotype, index): React.ReactNode => {
            const phenotypeInfo = extractPhenotypeTitleAndCode(hpo_id_phenotype);

            return phenotypeInfo ? (
              <div key={index}>
                {phenotypeInfo.title} (HP:{' '}
                <ExternalLink href={`https://hpo.jax.org/app/browse/term/HP:${phenotypeInfo.code}`}>
                  {phenotypeInfo.code}
                </ExternalLink>
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
    render: (record: ITableParticipantEntity) => {
      const total = record?.biospecimen?.hits?.total;

      return total ? (
        <Link
          to={{
            pathname: STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
            search: createQueryParams({
              filters: addFilter(null, 'participant_id', INDEXES.PARTICIPANT, [
                record.participant_id,
              ]),
            }),
          }}
        >
          {total}
        </Link>
      ) : (
        total || 0
      );
    },
  },
  {
    key: 'files.hits.total',
    title: 'Files',
    render: (record: ITableParticipantEntity) => {
      const total = record?.files?.hits?.total;

      return total ? (
        <Link
          to={{
            pathname: STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
            search: createQueryParams({
              filters: addFilter(null, 'participant_id', INDEXES.PARTICIPANT, [
                record.participant_id,
              ]),
            }),
          }}
        >
          {total}
        </Link>
      ) : (
        total || 0
      );
    },
  },
];

const ParticipantsTab = ({
  results,
  setPagingConfig,
  pagingConfig,
  downloadReport,
  sqon,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menu = (
    <Menu onClick={(e) => downloadReport(e.key as ReportType, selectedKeys, selectedAllResults)}>
      <Menu.Item key={ReportType.CLINICAL_DATA}>Participant Only</Menu.Item>
      {/* <Menu.Item key={ReportType.CLINICAL_DATA_FAM}>Participant & Family Members</Menu.Item> */}
    </Menu>
  );

  return (
    <ProTable<ITableParticipantEntity>
      tableId="participants_table"
      columns={defaultColumns}
      wrapperClassName={styles.participantTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.participants?.columns}
      enableRowSelection={true}
      headerConfig={{
        itemCount: {
          pageIndex: pagingConfig.index,
          pageSize: pagingConfig.size,
          total: results.total,
        },
        enableColumnSort: true,
        enableTableExport: true,
        onColumnSortChange: (newState) =>
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
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.data_exploration?.tables?.participants?.columns,
              columns: defaultColumns,
              index: INDEXES.PARTICIPANT,
              sqon,
            }),
          ),
        onSelectAllResultsChange: setSelectedAllResults,
        onSelectedRowsChange: (keys) => setSelectedKeys(keys),
        extra: [
          <Dropdown disabled={selectedKeys.length === 0} overlay={menu} placement="bottomLeft">
            <Button icon={<DownloadOutlined />}>Download clinical data</Button>
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
