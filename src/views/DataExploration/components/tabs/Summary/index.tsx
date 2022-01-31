import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Col, Row, Typography } from "antd";
import useApi from "hooks/useApi";
import { ARRANGER_API_PROJECT_URL } from "provider/ApolloProvider";
import { DATATYPE_QUERY, DEMOGRAPHIC_QUERY, TYPE_OF_OMICS_QUERY } from "graphql/summary/queries";
import { ISqonGroupFilter } from "@ferlab/ui/core/data/sqon/types";
import DemographicsGraphs from "./DemographicGraphs";
import AvailableDataGraphs from "./AvailableDataGraphs";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

interface OwnProps {
  sqon: ISqonGroupFilter;
}

const { Title } = Typography;

const SummaryTab = ({ sqon }: OwnProps) => {
  const { loading, result } = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: "POST",
      data: [
        {
          query: DEMOGRAPHIC_QUERY,
          variables: { sqon },
        },
        {
          query: DATATYPE_QUERY,
          variables: { sqon },
        },
        {
          query: TYPE_OF_OMICS_QUERY,
          variables: { sqon },
        },
      ],
    },
  });

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={6}>
        <GridCard
          wrapperClassName={styles.summaryGrapCard}
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
          content={<DemographicsGraphs data={result ? result[0] : null} />}
        />
      </Col>
      <Col xs={24} md={18}>
        <GridCard
          wrapperClassName={styles.summaryGrapCard}
          theme="shade"
          title={<Title level={4}>Chart title 2</Title>}
          content="Chart.."
        />
      </Col>
      <Col span={24}>
        <GridCard
          wrapperClassName={styles.summaryGrapCard}
          theme="shade"
          title={
            <Title level={4}>
              {intl.get(
                "screen.dataExploration.tabs.summary.availableData.cardTitle"
              )}
            </Title>
          }
          content={
            <AvailableDataGraphs
              dataTypeData={result ? result[1] : null}
              typeOfOmicsData={result ? result[2] : null}
            />
          }
        />
      </Col>
      <Col xs={24} md={12}>
        <GridCard
          wrapperClassName={styles.summaryGrapCard}
          theme="shade"
          title={<Title level={4}>Chart title 4</Title>}
          content="Chart.."
        />
      </Col>
      <Col xs={24} md={12}>
        <GridCard
          wrapperClassName={styles.summaryGrapCard}
          theme="shade"
          title={<Title level={4}>Chart title 5</Title>}
          content="Chart.."
        />
      </Col>
    </Row>
  );
};

export default SummaryTab;
