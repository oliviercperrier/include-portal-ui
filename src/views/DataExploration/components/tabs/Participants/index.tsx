import { Space, Table } from "antd";
import TableHeader from "components/uiKit/table/TableHeader";
import { IParticipantEntity } from "graphql/participants/models";
import { IQueryResults } from "graphql/models";
import { DEFAULT_PAGE_SIZE } from "views/DataExploration/utils/constant";
import {
  TPagingConfig,
  TPagingConfigCb,
} from "views/DataExploration/utils/types";
import { TABLE_EMPTY_PLACE_HOLDER } from "common/constants";
import ColumnSelector, {
  ColumnSelectorType,
} from "components/uiKit/table/ColumnSelector";
import { useState } from "react";

import styles from "./index.module.scss";

interface OwnProps {
  results: IQueryResults<IParticipantEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
}

const defaultColumns: ColumnSelectorType<any>[] = [
  {
    key: "participant_id",
    title: "ID",
    dataIndex: "participant_id",
  },
  {
    key: "study_id",
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
    key: "study_external_id",
    title: "dbGaP Accession number",
    dataIndex: "study_external_id",
  },
  {
    key: "karyotype",
    title: "Karyotype",
    dataIndex: "karyotype",
  },
  {
    key: "down_syndrome_diagnosis",
    title: "Down Syndrome Diagnosis",
    dataIndex: "down_syndrome_diagnosis",
    render: (down_syndrome_diagnosis: string) =>
      down_syndrome_diagnosis || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: "sex",
    title: "Sex",
    dataIndex: "sex",
  },
  {
    key: "family_type",
    title: "Family Unit",
    dataIndex: "family_type",
  },
  {
    key: "is_proband",
    title: "Proband Status",
    dataIndex: "is_proband",
    defaultHidden: true,
  },
  {
    key: "age_at_data_collection",
    title: "Age at Data Collection",
    dataIndex: "age_at_data_collection",
  },
  {
    key: "diagnosis",
    title: "Diagnosis (Mondo)",
    defaultHidden: true,
  },
  {
    key: "phenotype",
    title: "Phenotype (HPO)",
    defaultHidden: true,
  },
  {
    key: "biospecimen",
    title: "Biospecimen",
    render: (record: IParticipantEntity) =>
      record?.biospecimen?.hits?.total || 0,
  },
  {
    key: "files",
    title: "Files",
    render: (record: IParticipantEntity) => record?.files?.hits?.total || 0,
  },
];

const ParticipantsTab = ({
  results,
  setPagingConfig,
  pagingConfig,
}: OwnProps) => {
  const [columns, setColumns] = useState<ColumnSelectorType<any>[]>(
    defaultColumns.filter((column) => !column.defaultHidden)
  );

  return (
    <Space
      size={12}
      className={styles.participantTabWrapper}
      direction="vertical"
    >
      <TableHeader
        pageIndex={pagingConfig.index}
        pageSize={pagingConfig.size}
        total={results.total}
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

export default ParticipantsTab;
