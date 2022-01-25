import { Space, Table } from "antd";
import TableHeader from "components/uiKit/table/TableHeader";
import {
  IParticipantDiagnosis,
  IParticipantEntity,
  IParticipantPhenotype,
} from "graphql/participants/models";
import { ArrangerResultsTree, IQueryResults } from "graphql/models";
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
import ExpandableCell from "components/uiKit/table/ExpendableCell";
import {
  extractMondoTitleAndCode,
  extractPhenotypeTitleAndCode,
} from "views/DataExploration/utils/helper";

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
    className: styles.studyIdCell,
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
    dataIndex: "diagnosis",
    className: styles.diagnosisCell,
    render: (diagnosis: ArrangerResultsTree<IParticipantDiagnosis>) => {
      const hydratedDiagnosis = diagnosis?.hits?.edges.map(
        (diagnosis, index) => ({ key: index, ...diagnosis.node })
      );

      if (!hydratedDiagnosis) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nbToShow={1}
          dataSource={hydratedDiagnosis}
          renderItem={(item, id): React.ReactNode => {
            const mondoInfo = extractMondoTitleAndCode(item.mondo_id_diagnosis);

            return (
              <div>
                {mondoInfo.title} (MONDO:{" "}
                <a
                  href={`https://monarchinitiative.org/disease/MONDO:${mondoInfo.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {mondoInfo.code}
                </a>
                )
              </div>
            );
          }}
        />
      );
    },
  },
  {
    key: "phenotype",
    title: "Phenotype (HPO)",
    dataIndex: "phenotype",
    className: styles.phenotypeCell,
    render: (phenotype: ArrangerResultsTree<IParticipantPhenotype>) => {
      const hydratedPhenotype = phenotype?.hits?.edges.map(
        (phenotype, index) => ({ key: index, ...phenotype.node })
      );

      if (!hydratedPhenotype) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nbToShow={1}
          dataSource={hydratedPhenotype}
          renderItem={(item, id): React.ReactNode => {
            const phenotypeInfo = extractPhenotypeTitleAndCode(
              item.hpo_id_phenotype
            );

            return (
              <div>
                {phenotypeInfo.title} (HP:{" "}
                <a 
                  href={`https://hpo.jax.org/app/browse/term/HP:${phenotypeInfo.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {phenotypeInfo.code}
                </a>
                )
              </div>
            );
          }}
        />
      );
    },
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
