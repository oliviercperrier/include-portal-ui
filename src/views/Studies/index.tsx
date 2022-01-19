import { Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { StudyResultTree } from "graphql/studies/models";
import { FETCH_STUDIES_QUERY } from "graphql/studies/queries";
import { useLazyResultQueryOnLoadOnly } from "hooks/graphql/useLazyResultQuery";
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

const makeRows = (result: StudyResultTree) =>
  result
    ? result.study.hits.edges.map((study, index) => ({
        key: index,
        ...study.node,
      }))
    : [];

const Studies = () => {
  const { loading, result } =
    useLazyResultQueryOnLoadOnly<StudyResultTree>(FETCH_STUDIES_QUERY);
  const rowsDate = makeRows(result!);

  return (
    <Space direction="vertical" className={styles.studiesWrapper}>
      <Title level={3}>Studies</Title>
      <Table
        size="small"
        bordered
        columns={columns}
        dataSource={rowsDate}
        loading={loading}
        pagination={false}
      ></Table>
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
