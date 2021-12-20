import { useState } from "react";
import { Button, Space, Table } from "antd";
import TableHeader from "components/uiKit/table/TableHeader";

import styles from "./index.module.scss";

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 20;

const ParticipantsTab = () => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  return (
    <Space
      size={12}
      className={styles.participantTabWrapper}
      direction="vertical"
    >
      <TableHeader
        pageIndex={pageIndex}
        pageSize={pageSize}
        extra={[<Button type="primary">Some button</Button>]}
      />
      <Table
        bordered
        pagination={{
          pageSize: pageSize,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          onChange: (page, size) => {
            if (pageIndex !== page || pageSize !== size) {
              setPageIndex(page);
              setPageSize(pageSize || DEFAULT_PAGE_SIZE);
            }
          },
        }}
        dataSource={[]}
        columns={[]}
      ></Table>
    </Space>
  );
};

export default ParticipantsTab;
