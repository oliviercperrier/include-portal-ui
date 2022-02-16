import { IFileEntity } from 'graphql/files/models';
import { CloudUploadOutlined, LockOutlined } from '@ant-design/icons';
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
import { useState } from 'react';
import { formatFileSize } from 'utils/formatFileSize';
import { Button, Tag, Tooltip } from 'antd';

import styles from './index.module.scss';
import { fetchTsvReport } from 'store/report/thunks';

interface OwnProps {
  results: IQueryResults<IFileEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: 'lock',
    title: (
      <Tooltip title="File Authorization">
        <LockOutlined />
      </Tooltip>
    ),
    dataIndex: 'lock',
    displayTitle: 'File Authorization',
    align: 'center',
    render: () => {
      return (
        <Tooltip title="Unauthorized">
          <LockOutlined className={styles.lockLoggedOut} />
        </Tooltip>
      );
    },
  },
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
    title: 'Study',
    dataIndex: 'study_id',
  },
  {
    key: 'access',
    title: 'Access',
    dataIndex: 'access',
    align: 'center',
    width: 75,
    render: (access: string) =>
      !access ? (
        '-'
      ) : access.toLowerCase() === 'controlled' ? (
        <Tooltip title="Controlled">
          <Tag color="geekblue">C</Tag>
        </Tooltip>
      ) : (
        <Tooltip title="Registered">
          <Tag color="green">R</Tag>
        </Tooltip>
      ),
  },
  {
    key: 'type_of_omics',
    title: 'Data Category',
    dataIndex: 'type_of_omics',
  },
  {
    key: 'experimental_strategy',
    title: 'Experimental Strategy',
    dataIndex: 'experimental_strategy',
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
    title: 'Size',
    dataIndex: 'size',
    render: (size) => formatFileSize(size, { output: 'string' }),
  },
];

const DataFilesTab = ({ results, setPagingConfig, pagingConfig }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <ProTable
      tableId="datafiles_table"
      columns={defaultColumns}
      wrapperClassName={styles.dataFilesTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.datafiles?.columns}
      enableRowSelection={true}
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
        onTableExportClick: () => {
          dispatch(
            fetchTsvReport({
              columnStates:
                userInfo?.config.data_exploration?.tables?.datafiles?.columns ||
                defaultColumns.map((column, index) => ({
                  index,
                  key: column.key,
                  visible: true,
                })),
              index: 'file',
              sqon: undefined,
            }),
          );
        },
        onColumnSortChange: (newState) =>
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
        extra: [
          <Button
            disabled={selectedKeys.length === 0}
            type="primary"
            icon={<CloudUploadOutlined />}
          >
            Analyze in Cavatica
          </Button>,
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
      dataSource={results.data.map((i) => ({ ...i, key: i.file_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default DataFilesTab;
