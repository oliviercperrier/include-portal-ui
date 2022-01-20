import { useState } from "react";
import { Button, Space, Table } from "antd";
import TableHeader from "components/uiKit/table/TableHeader";
import { IParticipantEntity } from "graphql/participants/models";
import { ColumnsType } from "antd/lib/table";

import styles from "./index.module.scss";
import { IQueryResults } from "graphql/models";

interface OwnProps {
  results: IQueryResults<IParticipantEntity[]>
}

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 20;

const columns: ColumnsType<any> = [
  {
    title: "ID",
    dataIndex: "participant_id",
  },
  {
    title: "Study Code",
    dataIndex: "study_id",
    render: (study_id: string) => (
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${study_id}`}
      >
        {study_id}
      </a>
    ),
  },
  {
    title: "dbGaP Accession number",
    dataIndex: "study_external_id",
  },
  {
    title: "Karyotype",
    dataIndex: "karyotype",
  },
  {
    title: "Down Syndrome Diagnosis",
    dataIndex: "down_syndrome_diagnosis",
  },
  {
    title: "Sex",
    dataIndex: "sex",
  },
  {
    title: "Family Unit",
    dataIndex: "family_type",
  },
  {
    title: "Proband Status",
    dataIndex: "is_proband",
  },
  {
    title: "Age at Data Collection",
    dataIndex: "age_at_data_collection",
  },
  {
    title: "Diagnosis (Mondo)",
  },
  {
    title: "Phenotype (HPO)",
  },
];

const ParticipantsTab = ({ results }: OwnProps) => {
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
        total={results.total}
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

export default ParticipantsTab;
