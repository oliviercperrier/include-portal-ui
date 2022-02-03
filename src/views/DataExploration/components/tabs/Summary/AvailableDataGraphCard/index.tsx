import { Col, Row, Typography } from "antd";
import { RawAggregation } from "graphql/models";
import { toChartData } from "utils/charts";
import BarChart from "components/uiKit/charts/Bar";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import intl from "react-intl-universal";

interface OwnProps {
  className?: string;
  loading?: boolean;
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

const { Title } = Typography;

const AvailableDataGraphCard = ({
  className = "",
  loading = false,
  dataTypeData,
  typeOfOmicsData,
}: OwnProps) => {
  return (
    <GridCard
      wrapperClassName={className}
      theme="shade"
      loading={loading}
      title={
        <Title level={4}>
          {intl.get(
            "screen.dataExploration.tabs.summary.availableData.cardTitle"
          )}
        </Title>
      }
      content={
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
              {...graphSetting}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default AvailableDataGraphCard;
