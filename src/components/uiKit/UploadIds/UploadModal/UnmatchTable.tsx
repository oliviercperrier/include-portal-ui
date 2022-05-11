import Empty from '@ferlab/ui/core/components/Empty';
import { Table } from 'antd';
import { get } from 'lodash';
import { UnmatchTableItem } from '..';
import { UploadIdDictionary } from '..';

import styles from './index.module.scss';

interface OwnProps {
  unmatchItems: UnmatchTableItem[];
  loading?: boolean;
  dictionary: UploadIdDictionary;
}

const UnmatchTable = ({ unmatchItems, loading = false, dictionary }: OwnProps) => (
  <Table
    bordered
    size="small"
    dataSource={unmatchItems}
    loading={loading}
    pagination={{
      pageSize: 5,
      hideOnSinglePage: true,
      className: styles.tablePagination,
    }}
    locale={{
      emptyText: (
        <Empty
          showImage={false}
          description={get(dictionary, 'emptyTableDescription', 'No data')}
        />
      ),
    }}
    className={styles.resultsTable}
    columns={[
      {
        title: dictionary.submittedColTitle,
        dataIndex: 'submittedId',
      },
    ]}
  ></Table>
);

export default UnmatchTable;
