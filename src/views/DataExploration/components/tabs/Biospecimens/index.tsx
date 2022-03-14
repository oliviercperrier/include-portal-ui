import { IQueryResults } from 'graphql/models';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { TPagingConfig, TPagingConfigCb } from 'views/DataExploration/utils/types';
import { DEFAULT_PAGE_SIZE, TAB_IDS } from 'views/DataExploration/utils/constant';
import { IParticipantEntity } from 'graphql/participants/models';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { getProTableDictionary } from 'utils/translation';
import { useDispatch } from 'react-redux';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { Button, Tooltip } from 'antd';
import { ReportType } from 'services/api/reports/models';
import { DownloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchReport, fetchTsvReport } from 'store/report/thunks';
import { INDEXES } from 'graphql/constants';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateSelectionSqon } from 'views/DataExploration/utils/report';
import { Link } from 'react-router-dom';
import { STATIC_ROUTES } from 'utils/routes';
import { createQueryParams, useFilters } from '@ferlab/ui/core/data/filters/utils';
import { addFilters, generateValueFilter } from 'utils/sqons';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IBiospecimenEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
  sqon?: ISqonGroupFilter;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: 'collection_sample_id',
    title: 'Collection ID',
    dataIndex: 'collection_sample_id',
    render: (collection_sample_id: string) =>
      collection_sample_id ? (
        <Link
          to={{
            pathname: STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
            search: createQueryParams({
              filters: addFilters(null, [
                generateValueFilter(
                  'collection_sample_id',
                  [collection_sample_id],
                  INDEXES.BIOSPECIMEN,
                ),
              ]),
            }),
          }}
        >
          {collection_sample_id}
        </Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'sample_id',
    title: 'Sample ID',
    dataIndex: 'sample_id',
    render: (sample_id: string) => sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_type',
    title: 'Sample Type',
    dataIndex: 'sample_type',
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'parent_sample_id',
    title: 'Parent Sample ID',
    dataIndex: 'parent_sample_id',
    render: (parent_sample_id) => parent_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'parent_sample_type',
    title: 'Parent Sample Type',
    dataIndex: 'parent_sample_type',
    render: (parent_sample_type) => parent_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participant.participant_id',
    title: 'Participant ID',
    dataIndex: 'participant',
    render: (participant: IParticipantEntity) => participant.participant_id,
  },
  {
    key: 'study_id',
    title: 'Study',
    dataIndex: 'study_id',
    render: (study_id) => study_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'collection_sample_type',
    title: 'Collected Sample Type',
    dataIndex: 'collection_sample_type',
    render: (collection_sample_type) => collection_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_biospecimen_collection',
    title: <Tooltip title="Age at Biospecimen Collection">Age (days)</Tooltip>,
    displayTitle: 'Age (days)',
    dataIndex: 'age_at_biospecimen_collection',
    render: (age_at_biospecimen_collection) =>
      age_at_biospecimen_collection || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'container_id',
    title: 'Container ID',
    dataIndex: 'container_id',
    render: (container_id: string) => container_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'volume_ul',
    title: 'Volume',
    dataIndex: 'volume_ul',
    render: (volume_ul) => volume_ul || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'volume_unit',
    title: 'Volume Unit',
    render: (record: IBiospecimenEntity) =>
      record.volume_ul ? record.volume_unit : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'status',
    title: 'Sample Availability',
    dataIndex: 'status',
    render: (status: string) => (status.toLowerCase() === 'available' ? 'Yes' : 'No'),
  },
  {
    key: 'laboratory_procedure',
    title: 'Laboratory Procedure',
    dataIndex: 'laboratory_procedure',
    defaultHidden: true,
  },
  {
    key: 'biospecimen_storage',
    title: 'Biospecimen Storage',
    dataIndex: 'biospecimen_storage',
    defaultHidden: true,
  },
  {
    key: 'nb_files',
    title: 'Files',
    render: (record: IBiospecimenEntity) => {
      const nbFiles = record?.nb_files || 0;
      return nbFiles ? (
        <Link
          to={{
            pathname: STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
            search: createQueryParams({
              filters: addFilters(null, [
                generateValueFilter('sample_id', [record.sample_id], INDEXES.BIOSPECIMEN),
              ]),
            }),
          }}
        >
          {nbFiles}
        </Link>
      ) : (
        nbFiles
      );
    },
  },
];

const BioSpecimenTab = ({ results, setPagingConfig, pagingConfig, sqon }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { filters }: { filters: ISyntheticSqon } = useFilters();
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
    }
    // eslint-disable-next-line
  }, [filters.id]);

  const getReportSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateSelectionSqon(TAB_IDS.BIOSPECIMENS, selectedKeys);

  return (
    <ProTable
      tableId="biospecimen_table"
      columns={defaultColumns}
      wrapperClassName={styles.biospecimenTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.biospecimens?.columns}
      enableRowSelection={true}
      initialSelectedKey={selectedKeys}
      headerConfig={{
        itemCount: {
          pageIndex: pagingConfig.index,
          pageSize: pagingConfig.size,
          total: results.total,
        },
        enableColumnSort: true,
        enableTableExport: true,
        onSelectAllResultsChange: setSelectedAllResults,
        onSelectedRowsChange: (keys) => setSelectedKeys(keys),
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  biospecimens: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.data_exploration?.tables?.biospecimens?.columns,
              columns: defaultColumns,
              index: INDEXES.BIOSPECIMEN,
              sqon: getReportSqon(),
            }),
          ),
        extra: [
          <Button
            icon={<DownloadOutlined />}
            onClick={() =>
              dispatch(
                fetchReport({
                  data: {
                    sqon: getReportSqon(),
                    name: ReportType.BIOSEPCIMEN_DATA,
                  },
                }),
              )
            }
            disabled={selectedKeys.length === 0}
          >
            Download sample data
          </Button>,
        ],
      }}
      bordered
      size="small"
      pagination={{
        current: pagingConfig.index,
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
      dataSource={results.data.map((i) => ({ ...i, key: i.id }))} //FIXME use biospecimen_id from data
      dictionary={getProTableDictionary()}
    />
  );
};

export default BioSpecimenTab;
