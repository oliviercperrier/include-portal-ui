import { useState } from "react";
import { Button, Space, Table } from "antd";
import TableHeader from "components/uiKit/table/TableHeader";

import styles from "./index.module.scss";
import { IFileEntity } from "graphql/files/models";
import { ColumnsType } from "antd/lib/table";
import { DownloadOutlined, LockOutlined } from "@ant-design/icons";
import { IQueryResults } from "graphql/models";

interface OwnProps {
  results: IQueryResults<IFileEntity[]>;
}

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 20;

const columns: ColumnsType<any> = [
  {
    title: "File ID",
    dataIndex: "file_id",
  },
  {
    title: "Participant ID",
  },
  {
    title: "Study Code",
    dataIndex: "study_id",
  },
  {
    title: "Type of Omics",
    dataIndex: "type_of_omics",
  },
  {
    title: "Experimental Strategy",
    dataIndex: "experimental_strategy",
  },
  {
    title: "Data Categories",
    dataIndex: "data_category",
  },
  {
    title: "Data Type",
    dataIndex: "data_type",
  },
  {
    title: "Format",
    dataIndex: "file_format",
  },
  {
    title: "Size (bytes)",
    dataIndex: "size",
  },
  {
    title: "Actions",
    dataIndex: "access",
    align: "center",
    render: (access: string) =>
      !access ? (
        "-"
      ) : access.toLowerCase() === "controlled" ? (
        <LockOutlined />
      ) : (
        <DownloadOutlined />
      ),
  },
];

const DataFilesTab = ({ results }: OwnProps) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  return (
    <Space
      size={12}
      className={styles.dataFilesTabWrapper}
      direction="vertical"
    >
      <TableHeader
        total={results.total}
        pageIndex={pageIndex}
        pageSize={pageSize}
        extra={[<Button type="primary">Some button</Button>]}
      />
      <Table
        bordered
        loading={results.loading}
        size="small"
        pagination={{
          pageSize: pageSize,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          onChange: (page, size) => {
            if (pageIndex !== page || pageSize !== size) {
              setPageIndex(page);
              setPageSize(size || DEFAULT_PAGE_SIZE);
            }
          },
        }}
        dataSource={results.data}
        columns={columns}
      ></Table>
    </Space>
  );
};

export default DataFilesTab;
