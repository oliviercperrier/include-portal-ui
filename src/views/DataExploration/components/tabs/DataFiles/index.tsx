import { IFileEntity, ITableFileEntity } from 'graphql/files/models';
import { CloudUploadOutlined, LockOutlined, SafetyOutlined, UnlockFilled } from '@ant-design/icons';
import { IQueryResults } from 'graphql/models';
import { TPagingConfig, TPagingConfigCb } from 'views/DataExploration/utils/types';
import { CAVATICA_FILE_BATCH_SIZE, DEFAULT_PAGE_SIZE } from 'views/DataExploration/utils/constant';
import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { getProTableDictionary } from 'utils/translation';
import { useDispatch } from 'react-redux';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { useState } from 'react';
import { formatFileSize } from 'utils/formatFileSize';
import { Button, Modal, Tag, Tooltip } from 'antd';
import AnalyseModal from 'views/Dashboard/components/DashboardCards/Cavatica/AnalyseModal';
import { fetchTsvReport } from 'store/report/thunks';
import { INDEXES } from 'graphql/constants';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import CreateProjectModal from 'views/Dashboard/components/DashboardCards/Cavatica/CreateProjectModal';
import intl from 'react-intl-universal';
import { IStudyEntity } from 'graphql/studies/models';
import { intersection } from 'lodash';
import { beginAnalyse } from 'store/fenceCavatica/thunks';
import { useFenceConnection } from 'store/fenceConnection';

import styles from './index.module.scss';
import { useFenceCavatica } from 'store/fenceCavatica';

interface OwnProps {
  results: IQueryResults<IFileEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
  sqon?: ISqonGroupFilter;
}

const getDefaultColumns = (fenceAcls: string[]): ProColumnType<any>[] => [
  {
    key: 'lock',
    title: (
      <Tooltip title="File Authorization">
        <LockOutlined />
      </Tooltip>
    ),
    displayTitle: 'File Authorization',
    align: 'center',
    render: (record: IFileEntity) => {
      const acl = record.acl || [];
      const hasAccess = acl.includes('*') || intersection(fenceAcls, acl).length > 0;

      return hasAccess ? (
        <Tooltip title="Authorized">
          <UnlockFilled className={styles.authorizedLock} />
        </Tooltip>
      ) : (
        <Tooltip title="Unauthorized">
          <LockOutlined className={styles.unauthorizedLock} />
        </Tooltip>
      );
    },
  },
  {
    key: 'access',
    title: (
      <Tooltip title="Data access">
        <SafetyOutlined />
      </Tooltip>
    ),
    dataIndex: 'access',
    displayTitle: 'Access',
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
    dataIndex: 'study',
    render: (study: IStudyEntity) => study.study_id,
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

const DataFilesTab = ({ results, setPagingConfig, pagingConfig, sqon }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { isConnected, isInitializingAnalyse } = useFenceCavatica();
  const { fencesAllAcls } = useFenceConnection();
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<ITableFileEntity[]>([]);

  return (
    <>
      <ProTable<ITableFileEntity>
        tableId="datafiles_table"
        columns={getDefaultColumns(fencesAllAcls)}
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
          onSelectedRowsChange: (keys, rows) => {
            setSelectedKeys(keys);
            setSelectedRows(rows);
          },
          onTableExportClick: () =>
            dispatch(
              fetchTsvReport({
                columnStates: userInfo?.config.data_exploration?.tables?.datafiles?.columns,
                columns: getDefaultColumns(fencesAllAcls),
                index: INDEXES.FILE,
                sqon,
              }),
            ),
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
              loading={isInitializingAnalyse}
              onClick={() => {
                if (selectedRows.length > CAVATICA_FILE_BATCH_SIZE || selectedAllResults) {
                  Modal.error({
                    title: intl.get(
                      'screen.dataExploration.tabs.datafiles.cavatica.uploadLimitTitle',
                    ),
                    content: intl.getHTML(
                      'screen.dataExploration.tabs.datafiles.cavatica.uploadLimit',
                      {
                        limit: CAVATICA_FILE_BATCH_SIZE,
                      },
                    ),
                    okText: 'Ok',
                    cancelText: undefined,
                  });
                } else {
                  dispatch(
                    beginAnalyse({
                      sqon: sqon!,
                      fileIds: selectedKeys,
                    }),
                  );
                }
              }}
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
      {isConnected && (
        <>
          <AnalyseModal />
          <CreateProjectModal />
        </>
      )}
    </>
  );
};

export default DataFilesTab;
