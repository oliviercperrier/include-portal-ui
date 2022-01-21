import { Space, Table } from "antd";
import TableHeader from "components/uiKit/table/TableHeader";
import { IFileEntity } from "graphql/files/models";
import { DownloadOutlined, LockOutlined } from "@ant-design/icons";
import { IQueryResults } from "graphql/models";
import {
  TPagingConfig,
  TPagingConfigCb,
} from "views/DataExploration/utils/types";
import { DEFAULT_PAGE_SIZE } from "views/DataExploration/utils/constant";
import { useState } from "react";
import ColumnSelector, {
  ColumnSelectorType,
} from "components/uiKit/table/ColumnSelector";
import { TABLE_EMPTY_PLACE_HOLDER } from "common/constants";

import styles from "./index.module.scss";

interface OwnProps {
  results: IQueryResults<IFileEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
}

const defaultColumns: ColumnSelectorType<any>[] = [
  {
    key: "file_id",
    title: "File ID",
    dataIndex: "file_id",
  },
  {
    key: "participant_id",
    title: "Participant ID",
    defaultHidden: true,
  },
  {
    key: "study_id",
    title: "Study Code",
    dataIndex: "study_id",
  },
  {
    key: "type_of_omics",
    title: "Type of Omics",
    dataIndex: "type_of_omics",
  },
  {
    key: "experimental_strategy",
    title: "Experimental Strategy",
    dataIndex: "experimental_strategy",
  },
  {
    key: "data_category",
    title: "Data Categories",
    dataIndex: "data_category",
    render: (data_category) => data_category || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: "data_type",
    title: "Data Type",
    dataIndex: "data_type",
    render: (data_type) => data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: "file_format",
    title: "Format",
    dataIndex: "file_format",
  },
  {
    key: "size",
    title: "Size (bytes)",
    dataIndex: "size",
    render: (data_type) => data_type || 0,
  },
  {
    key: "access",
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

const DataFilesTab = ({ results, setPagingConfig, pagingConfig }: OwnProps) => {
  const [columns, setColumns] = useState<ColumnSelectorType<any>[]>(
    defaultColumns.filter((column) => !column.defaultHidden)
  );

  return (
    <Space
      size={12}
      className={styles.dataFilesTabWrapper}
      direction="vertical"
    >
      <TableHeader
        total={results.total}
        pageIndex={pagingConfig.index}
        pageSize={pagingConfig.size}
        extra={[
          <ColumnSelector
            defaultColumns={defaultColumns}
            columns={columns}
            onChange={setColumns}
          />,
        ]}
      />
      <Table
        bordered
        loading={results.loading}
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
        dataSource={results.data}
        columns={columns}
      ></Table>
    </Space>
  );
};

export default DataFilesTab;
