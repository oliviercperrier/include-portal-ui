import { Space, Table } from "antd";
import TableHeader from "components/uiKit/table/TableHeader";
import { IQueryResults } from "graphql/models";
import { IBiospecimenEntity } from "graphql/biospecimens/models";
import { TABLE_EMPTY_PLACE_HOLDER } from "common/constants";
import {
  TPagingConfig,
  TPagingConfigCb,
} from "views/DataExploration/utils/types";
import { DEFAULT_PAGE_SIZE } from "views/DataExploration/utils/constant";
import { IParticipantEntity } from "graphql/participants/models";
import { useState } from "react";
import ColumnSelector, {
  ColumnSelectorType,
} from "components/uiKit/table/ColumnSelector";

import styles from "./index.module.scss";

interface OwnProps {
  results: IQueryResults<IBiospecimenEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
}

const defaultColumns: ColumnSelectorType<any>[] = [
  {
    key: "derived_sample_id",
    title: "Derived Sample ID",
    dataIndex: "derived_sample_id",
  },
  {
    key: "sample_id",
    title: "Sample ID",
    dataIndex: "sample_id",
    render: (sample_id: string) => sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: "biospecimen_id",
    title: "Biospecimen ID",
    dataIndex: "biospecimen_id",
  },
  {
    key: "participant",
    title: "Participant ID",
    dataIndex: "participant",
    render: (participant: IParticipantEntity) => participant.participant_id,
  },
  {
    key: "biospecimen_type",
    title: "Biospecimen Type",
    dataIndex: "biospecimen_type",
  },
  {
    key: "sample_type",
    title: "Sample Type",
    dataIndex: "sample_type",
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: "derived_sample_type",
    title: "Derived Sample Type",
    dataIndex: "derived_sample_type",
    render: (derived_sample_type) =>
      derived_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: "age_at_biospecimen_collection",
    title: "Age at Biospecimen Collection",
    dataIndex: "age_at_biospecimen_collection",
  },
  {
    key: "anatomical_site",
    title: "Anatomical Site (NCIT)",
    dataIndex: "",
    defaultHidden: true,
  },
  {
    key: "ncit_id_tissue_type",
    title: "Tissue Type (NCIT)",
    dataIndex: "ncit_id_tissue_type",
    render: (ncit_id_tissue_type) =>
      ncit_id_tissue_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: "bio_repository",
    title: "Biorepository Name",
    dataIndex: "bio_repository",
  },
];

const BioSpecimenTab = ({
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
      className={styles.biospecimenTabWrapper}
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

export default BioSpecimenTab;
