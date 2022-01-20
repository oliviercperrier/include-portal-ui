import { useState } from "react";
import { Button, Space, Table } from "antd";
import TableHeader from "components/uiKit/table/TableHeader";

import styles from "./index.module.scss";
import { IQueryResults } from "graphql/models";
import { IBiospecimenEntity } from "graphql/biospecimens/models";
import { ColumnsType } from "antd/lib/table";
import { TABLE_EMPTY_PLACE_HOLDER } from "common/constants";

interface OwnProps {
  results: IQueryResults<IBiospecimenEntity[]>;
}

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 20;

const columns: ColumnsType<any> = [
  {
    title: "Derived Sample ID",
    dataIndex: "derived_sample_id",
  },
  {
    title: "Sample ID",
    dataIndex: "sample_id",
    render: (sample_id: string) => sample_id ? sample_id : TABLE_EMPTY_PLACE_HOLDER
  },
  {
    title: "Biospecimen ID",
    dataIndex: "biospecimen_id",
  },
  {
    title: "Participant ID",
    dataIndex: "",
  },
  {
    title: "Biospecimen Type",
    dataIndex: "biospecimen_type",
  },
  {
    title: "Sample Type",
    dataIndex: "sample_type",
  },
  {
    title: "Derived Sample Type",
    dataIndex: "derived_sample_type",
  },
  {
    title: "Age at Biospecimen Collection",
    dataIndex: "age_at_biospecimen_collection",
  },
  {
    title: "Anatomical Site (NCIT)",
    dataIndex: "",
  },
  {
    title: "Tissue Type (NCIT)",
    dataIndex: "ncit_id_tissue_type",
  },
  {
    title: "Biorepository Name",
    dataIndex: "bio_repository",
  },
];

const BioSpecimenTab = ({ results }: OwnProps) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  return (
    <Space
      size={12}
      className={styles.biospecimenTabWrapper}
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

export default BioSpecimenTab;
