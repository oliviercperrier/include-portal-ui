import { Col, Row } from "antd";
import { RawAggregation } from "graphql/models";
import { toChartData } from "utils/charts";
import BarChart from "components/uiKit/charts/Bar";

interface OwnProps {
  dataTypeData: RawAggregation;
  typeOfOmicsData: RawAggregation;
}

const transformDataType = (results: RawAggregation) =>
  (
    results?.data?.participant?.aggregations?.files__data_type.buckets || []
  ).map(toChartData);

const transformTypeOfOmics = (results: RawAggregation) =>
  (
    results?.data?.participant?.aggregations?.files__type_of_omics.buckets || []
  ).map(toChartData);

const graphSetting: any = {
  height: 300,
  margin: {
    bottom: 45,
    left: 125,
  },
  enableLabel: false,
  layout: "horizontal",
};

const AvailableDataGraphs = ({ dataTypeData, typeOfOmicsData }: OwnProps) => {
  return (
    <Row gutter={[48, 24]}>
      <Col span={12}>
        <BarChart
          title="Participants by Type of Omics"
          data={transformTypeOfOmics(typeOfOmicsData)}
          axisLeft={{
            legend: "Type of Omics",
            legendPosition: "middle",
            legendOffset: -120,
            format: (title: string) =>
              `${title.substring(0, 15)}${title.length > 15 ? "..." : ""}`,
          }}
          axisBottom={{
            legend: "# of participants",
            legendPosition: "middle",
            legendOffset: 35,
          }}
          colors={["rgb(45, 163, 220)"]}
          {...graphSetting}
        />
      </Col>
      <Col span={12}>
        <BarChart
          title="Participants by Data Type"
          data={transformDataType(dataTypeData)}
          axisLeft={{
            legend: "Data Types",
            legendPosition: "middle",
            legendOffset: -120,
            format: (title: string) =>
              `${title.substring(0, 15)}${title.length > 15 ? "..." : ""}`,
          }}
          axisBottom={{
            legend: "# of participants",
            legendPosition: "middle",
            legendOffset: 35,
          }}
          colors={["rgb(45, 163, 220)"]}
          {...graphSetting}
        />
      </Col>
    </Row>
  );
};

export default AvailableDataGraphs;
