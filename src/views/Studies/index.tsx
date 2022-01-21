import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import TableHeader from "components/uiKit/table/TableHeader";
import { useStudies } from "graphql/studies/actions";
import ApolloProvider from "provider/ApolloProvider";
import { GraphqlBackend } from "provider/types";

import styles from "./index.module.scss";

const { Title } = Typography;

const columns: ColumnsType<any> = [
  {
    title: "Study Code",
    dataIndex: "study_id",
  },
  {
    title: "Name",
    dataIndex: "study_name",
  },
  {
    title: "Program",
    dataIndex: "program",
  },
  {
    title: "dbGaP",
    dataIndex: "external_id",
    render: (external_id) => (
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${external_id}`}
      >
        {external_id}
      </a>
    ),
  },
  {
    title: "Participants",
  },
  {
    title: "Families",
  },
  {
    title: "Genomic",
  },
  {
    title: "Proteomic",
  },
  {
    title: "Immune Map",
  },
  {
    title: "Metabolomic",
  },
];

const Studies = () => {
  const { loading, data, total } = useStudies();

  return (
    <Space direction="vertical" className={styles.studiesWrapper}>
      <Title level={3}>Studies</Title>
      <GridCard
        content={
          <Space size={12} direction="vertical" className={styles.tableWrapper}>
            <TableHeader pageIndex={1} pageSize={15} total={total} />
            <Table
              size="small"
              bordered
              columns={columns}
              dataSource={data}
              loading={loading}
              pagination={false}
            ></Table>
          </Space>
        }
      ></GridCard>
    </Space>
  );
};

const StudiesWrapper = (props: any) => {
  return (
    <ApolloProvider backend={GraphqlBackend.ARRANGER}>
      <Studies {...props} />
    </ApolloProvider>
  );
};

export default StudiesWrapper;
