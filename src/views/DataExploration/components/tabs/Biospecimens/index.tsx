import { IQueryResults } from "graphql/models";
import { IBiospecimenEntity } from "graphql/biospecimens/models";
import { TABLE_EMPTY_PLACE_HOLDER } from "common/constants";
import {
  TPagingConfig,
  TPagingConfigCb,
} from "views/DataExploration/utils/types";
import { DEFAULT_PAGE_SIZE } from "views/DataExploration/utils/constant";
import { IParticipantEntity } from "graphql/participants/models";
import { extractNcitTissueTitleAndCode } from "views/DataExploration/utils/helper";
import ProTable from "@ferlab/ui/core/components/ProTable";
import { ProColumnType } from "@ferlab/ui/core/components/ProTable/types";
import { getProTableDictionary } from "utils/translation";
import { useDispatch } from "react-redux";
import { useUser } from "store/user";
import { updateUserConfig } from "store/user/thunks";

import styles from "./index.module.scss";
import { Button } from "antd";
import { ReportType } from "services/api/reports/models";
import { DownloadOutlined } from "@ant-design/icons";

interface OwnProps {
  results: IQueryResults<IBiospecimenEntity[]>;
  setPagingConfig: TPagingConfigCb;
  pagingConfig: TPagingConfig;
  downloadReport: (e: string) => void;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    key: "derived_sample_id",
    title: "Derived Sample ID",
    dataIndex: "derived_sample_id",
    render: (derived_sample_id: string) =>
      derived_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: "sample_id",
    title: "Sample ID",
    dataIndex: "sample_id",
    defaultHidden: true,
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
    className: styles.ncitTissueCell,
    render: (ncit_id_tissue_type) => {
      if (!ncit_id_tissue_type) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      const ncitInfo = extractNcitTissueTitleAndCode(ncit_id_tissue_type);

      return ncitInfo ? (
        <div>
          {ncitInfo.title} (NCIT:{" "}
          <a
            href={`https://www.ebi.ac.uk/ols/ontologies/ncit/terms?short_form=NCIT_${ncitInfo.code}`}
            target="_blank"
            rel="noreferrer"
          >
            {ncitInfo.code}
          </a>
          )
        </div>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    },
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
  downloadReport,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  return (
    <ProTable
      tableId="biospecimen_table"
      columns={defaultColumns}
      wrapperClassName={styles.biospecimenTabWrapper}
      loading={results.loading}
      initialColumnState={
        userInfo?.config.data_exploration?.tables?.biospecimens?.columns
      }
      headerConfig={{
        itemCount: {
          pageIndex: pagingConfig.index,
          pageSize: pagingConfig.size,
          total: results.total,
        },
        columnSetting: true,
        onColumnStateChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  biospecimens: {
                    columns: newState,
                  },
                },
              },
            })
          ),
        extra: [
          <Button onClick={(e) => downloadReport(ReportType.BIOSEPCIMEN_DATA)}>
            <DownloadOutlined />
            Download sample data
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
      dataSource={results.data}
      dictionary={getProTableDictionary()}
    />
  );
};

export default BioSpecimenTab;
