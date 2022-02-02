import { Col, Row, Typography } from "antd";
import { RawAggregation } from "graphql/models";
import PieChart from "components/uiKit/charts/Pie";
import { toChartData } from "utils/charts";
import { SEX } from "common/constants";
import intl from "react-intl-universal";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";

interface OwnProps {
  className?: string;
  loading?: boolean;
  data: RawAggregation;
}

const getSexColor = (sex: SEX) => {
  switch (sex.toLowerCase()) {
    case SEX.FEMALE:
      return "#ffadd2";
    case SEX.MALE:
      return "#adc6ff";
    default:
      return "gray";
  }
};

const transformData = (results: RawAggregation) => {
  const aggs = results?.data?.participant?.aggregations;

  return {
    race: (aggs?.race.buckets || []).map(toChartData),
    sex: (aggs?.sex.buckets || []).map((sex) => ({
      color: getSexColor(sex.key as SEX),
      ...toChartData(sex),
    })),
    ethnicity: (aggs?.ethnicity.buckets || []).map(toChartData),
  };
};

const graphSetting = {
  height: 135,
  margin: {
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
  },
};

const { Title } = Typography;

const DemographicsGraphCard = ({
  className = "",
  loading = false,
  data,
}: OwnProps) => {
  return (
    <GridCard
      wrapperClassName={className}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      title={
        <Title level={4}>
          {intl.get(
            "screen.dataExploration.tabs.summary.demographic.cardTitle"
          )}
        </Title>
      }
      content={
        <Row gutter={[12, 24]}>
          <Col span={12}>
            <PieChart
              title={intl.get(
                "screen.dataExploration.tabs.summary.demographic.sexTitle"
              )}
              data={data ? transformData(data).sex : []}
              colors={{ datum: "data.color" }}
              {...graphSetting}
            />
          </Col>
          <Col span={12}>
            <PieChart
              title={intl.get(
                "screen.dataExploration.tabs.summary.demographic.raceTitle"
              )}
              data={data ? transformData(data).race : []}
              {...graphSetting}
            />
          </Col>
          <Col span={12}>
            <PieChart
              title={intl.get(
                "screen.dataExploration.tabs.summary.demographic.ethnicityTitle"
              )}
              data={data ? transformData(data).ethnicity : []}
              {...graphSetting}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default DemographicsGraphCard;
