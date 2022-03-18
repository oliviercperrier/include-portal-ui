import { IQueryResults } from 'graphql/models';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IQueryConfig, TQueryConfigCb } from 'views/DataExploration/utils/types';
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
import { generateFilters, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { formatQuerySortList } from 'views/DataExploration/utils/helper';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IBiospecimenEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  sqon?: ISqonGroupFilter;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: 'collection_sample_id',
    title: 'Collection ID',
    dataIndex: 'collection_sample_id',
    sorter: {multiple: 1},
    render: (collection_sample_id: string) =>
      collection_sample_id ? (
        <Link
          to={{
            pathname: STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
            search: createQueryParams({
              filters: generateFilters({
                newFilters: [
                  generateValueFilter({
                    field: 'collection_sample_id',
                    value: [collection_sample_id],
                    index: INDEXES.BIOSPECIMEN,
                  }),
                ],
              }),
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
    sorter: {multiple: 1},
    render: (sample_id: string) => sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_type',
    title: 'Sample Type',
    dataIndex: 'sample_type',
    sorter: {multiple: 1},
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'parent_sample_id',
    title: 'Parent Sample ID',
    dataIndex: 'parent_sample_id',
    sorter: {multiple: 1},
    render: (parent_sample_id) => parent_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'parent_sample_type',
    title: 'Parent Sample Type',
    dataIndex: 'parent_sample_type',
    sorter: {multiple: 1},
    render: (parent_sample_type) => parent_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participant.participant_id',
    title: 'Participant ID',
    dataIndex: 'participant',
    sorter: {multiple: 1},
    render: (participant: IParticipantEntity) => participant.participant_id,
  },
  {
    key: 'study_id',
    title: 'Study',
    dataIndex: 'study_id',
    sorter: {multiple: 1},
    render: (study_id) => study_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'collection_sample_type',
    title: 'Collected Sample Type',
    dataIndex: 'collection_sample_type',
    sorter: {multiple: 1},
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
    defaultHidden: true,
    render: (container_id: string) => container_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'volume_ul',
    title: 'Volume',
    dataIndex: 'volume_ul',
    defaultHidden: true,
    render: (volume_ul) => volume_ul || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'volume_unit',
    title: 'Volume Unit',
    defaultHidden: true,
    render: (record: IBiospecimenEntity) =>
      record.volume_ul ? record.volume_unit : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'status',
    title: 'Sample Availability',
    dataIndex: 'status',
    sorter: {multiple: 1},
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
    sorter: {multiple: 1},
    render: (record: IBiospecimenEntity) => {
      const nbFiles = record?.nb_files || 0;
      return nbFiles ? (
        <Link
          to={{
            pathname: STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
            search: createQueryParams({
              filters: generateFilters({
                newFilters: [
                  generateValueFilter({
                    field: 'sample_id',
                    value: [record.sample_id],
                    index: INDEXES.BIOSPECIMEN,
                  }),
                ],
              }),
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

const BioSpecimenTab = ({ results, setQueryConfig, queryConfig, sqon }: OwnProps) => {
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
  }, [JSON.stringify(filters)]);

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
      showSorterTooltip={false}
      initialSelectedKey={selectedKeys}
      onChange={({ current, pageSize }, _, sorter) =>
        setQueryConfig({
          pageIndex: current!,
          size: pageSize!,
          sort: formatQuerySortList(sorter),
        })
      }
      headerConfig={{
        itemCount: {
          pageIndex: queryConfig.pageIndex,
          pageSize: queryConfig.size,
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
        current: queryConfig.pageIndex,
        pageSize: queryConfig.size,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results.total,
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default BioSpecimenTab;
