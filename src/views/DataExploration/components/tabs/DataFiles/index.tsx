import { IFileEntity } from 'graphql/files/models';
import { DownloadOutlined, LockOutlined } from '@ant-design/icons';
import { IQueryResults } from 'graphql/models';
import { TPagingConfig, TPagingConfigCb } from 'views/DataExploration/utils/types';
import { DEFAULT_PAGE_SIZE } from 'views/DataExploration/utils/constant';
import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { getProTableDictionary } from 'utils/translation';
import { useDispatch } from 'react-redux';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import styles from './index.module.scss';
import { RowSelection, TAB_IDS } from '../../PageContent/utils';

interface OwnProps {
  results: IQueryResults<IFileEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
  rowSelection: RowSelection;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: 'file_id',
    title: 'File ID',
    dataIndex: 'file_id',
  },
  {
    key: 'participant_id',
    title: 'Participant ID',
    defaultHidden: true,
  },
  {
    key: 'study_id',
    title: 'Study Code',
    dataIndex: 'study_id',
  },
  {
    key: 'type_of_omics',
    title: 'Type of Omics',
    dataIndex: 'type_of_omics',
  },
  {
    key: 'experimental_strategy',
    title: 'Experimental Strategy',
    dataIndex: 'experimental_strategy',
  },
  {
    key: 'data_category',
    title: 'Data Categories',
    dataIndex: 'data_category',
    render: (data_category) => data_category || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'data_type',
    title: 'Data Type',
    dataIndex: 'data_type',
    render: (data_type) => data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'file_format',
    title: 'Format',
    dataIndex: 'file_format',
  },
  {
    key: 'size',
    title: 'Size (bytes)',
    dataIndex: 'size',
    render: (data_type) => data_type || 0,
  },
  {
    key: 'access',
    title: 'Actions',
    dataIndex: 'access',
    align: 'center',
    render: (access: string) =>
      !access ? (
        '-'
      ) : access.toLowerCase() === 'controlled' ? (
        <LockOutlined />
      ) : (
        <DownloadOutlined />
      ),
  },
];

const DataFilesTab = ({ results, setPagingConfig, pagingConfig, rowSelection }: OwnProps) => {
  const { selectedRows, onAllRowSelection, onRowSelection, allRowSelected } = rowSelection;
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  return (
    <ProTable
      rowSelection={{
        selectedRowKeys: selectedRows,
        onSelect: (selectedRowKey) => {
          onRowSelection(selectedRowKey.key, TAB_IDS.DATA_FILES);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          onAllRowSelection(
            selectedRows.filter(Boolean).map((e) => e.key),
            TAB_IDS.DATA_FILES,
            selected,
          );
        },
      }}
      tableId="datafiles_table"
      columns={defaultColumns}
      wrapperClassName={styles.dataFilesTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.datafiles?.columns}
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
                  datafiles: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
      }}
      bordered
      size="small"
      pagination={{
        pageSize: pagingConfig.size,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results.total,
        onChange: (page, size) => {
          if (allRowSelected) {
            onAllRowSelection([], TAB_IDS.BIOSPECIMENS, false);
          }
          if (pagingConfig.index !== page || pagingConfig.size !== size) {
            setPagingConfig({
              index: page,
              size: size!,
            });
          }
        },
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.file_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default DataFilesTab;
