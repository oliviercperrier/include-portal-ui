import React from "react";
import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import { Space, Typography } from "antd";
import { useUser } from "store/user";
import DataReleaseCard from "./components/DataReleaseCard";

import styles from "./index.module.scss";

const { Title } = Typography;

const Dashboard = () => {
  const { user } = useUser();

  return (
    <StackLayout className={styles.dashboardWrapper} vertical>
      <Space className={styles.dataIntroWrapper} direction="vertical" size={16}>
        <Title level={4} className={styles.greeting}>
          Hello, {user?.firstName}
        </Title>
        <DataReleaseCard />
      </Space>
    </StackLayout>
  );
};

export default Dashboard;
