import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Col, Row, Typography } from "antd";
import React from "react";

//import styles from "./index.module.scss";

const { Title } = Typography;

const SummaryTab = () => (
  <Row gutter={[24, 24]}>
    <Col xs={24} md={8}>
      <GridCard
        theme="shade"
        title={<Title level={4}>Chart title 1</Title>}
        content="Chart.."
      />
    </Col>
    <Col xs={24} md={16}>
      <GridCard
        theme="shade"
        title={<Title level={4}>Chart title 2</Title>}
        content="Chart.."
      />
    </Col>
    <Col span={24}>
      <GridCard
        theme="shade"
        title={<Title level={4}>Chart title 3</Title>}
        content="Chart.."
      />
    </Col>
    <Col xs={24} md={12}>
      <GridCard
        theme="shade"
        title={<Title level={4}>Chart title 4</Title>}
        content="Chart.."
      />
    </Col>
    <Col xs={24} md={12}>
      <GridCard
        theme="shade"
        title={<Title level={4}>Chart title 5</Title>}
        content="Chart.."
      />
    </Col>
  </Row>
);

export default SummaryTab;
