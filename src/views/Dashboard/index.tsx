import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Row, Col, Space, Typography } from "antd";
import { useUser } from "store/user";
import DataReleaseCard from "./components/DataReleaseCard";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

const { Title } = Typography;

const Dashboard = () => {
  const { user } = useUser();

  return (
    <StackLayout className={styles.dashboardWrapper} vertical>
      <Space direction="vertical" size={24}>
        <Space
          className={styles.dataIntroWrapper}
          direction="vertical"
          size={16}
        >
          <Title level={4} className={styles.greeting}>
            {intl.get("screen.dashboard.hello")}, {user?.firstName}
          </Title>
          <DataReleaseCard />
        </Space>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} xxl={6}>
            <GridCard
              theme="shade"
              title={<Title level={4}>Authorized Studies</Title>}
              content="Content.."
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <GridCard
              theme="shade"
              title={<Title level={4}>Card</Title>}
              content="Content.."
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <GridCard
              theme="shade"
              title={<Title level={4}>Card</Title>}
              content="Content.."
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <GridCard
              theme="shade"
              title={<Title level={4}>Card</Title>}
              content="Content.."
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <GridCard
              theme="shade"
              title={<Title level={4}>Card</Title>}
              content="Content.."
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <GridCard
              theme="shade"
              title={<Title level={4}>Card</Title>}
              content="Content.."
            />
          </Col>
        </Row>
      </Space>
    </StackLayout>
  );
};

export default Dashboard;
