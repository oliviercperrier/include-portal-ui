import React from "react";
import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import { Space, Typography } from "antd";
import { useUser } from "store/user";
import DataReleaseCard from "./components/DataReleaseCard";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

const { Title } = Typography;

const Dashboard = () => {
  const { user } = useUser();

  return (
    <StackLayout className={styles.dashboardWrapper} vertical>
      <Space className={styles.dataIntroWrapper} direction="vertical" size={16}>
        <Title level={4} className={styles.greeting}>
          {intl.get("screen.dashboard.hello")}, {user?.firstName}
        </Title>
        <DataReleaseCard />
      </Space>
    </StackLayout>
  );
};

export default Dashboard;
