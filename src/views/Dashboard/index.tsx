import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import { Space, Typography } from "antd";
import { useUser } from "store/user";
import DataReleaseCard from "./components/DataReleaseCard";
import intl from "react-intl-universal";
import SortableGrid from "@ferlab/ui/core/layout/SortableGrid";
import { getFTEnvVarByKey } from "helpers/EnvVariables";
import { AlterTypes } from "common/types";
import NotificationBanner from "components/featureToggle/NotificationBanner";
import { dashboardCards } from "./components/DashboardCards";

import styles from "./index.module.scss";

const { Title } = Typography;

const FT_FLAG_KEY = "DASHBOARD_BANNER";
const BANNER_TYPE_KEY = FT_FLAG_KEY + "_TYPE";
const BANNER_MSG_KEY = FT_FLAG_KEY + "_MSG";

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
          <NotificationBanner
            featureToggleKey={FT_FLAG_KEY}
            type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, "info")}
            message={getFTEnvVarByKey(BANNER_MSG_KEY)}
            closable
            showIcon
          />
          <Title level={4} className={styles.greeting}>
            {intl.get("screen.dashboard.hello")}, {user?.first_name}
          </Title>
          <DataReleaseCard />
        </Space>
        <SortableGrid items={dashboardCards} gutter={[24, 24]} />
      </Space>
    </StackLayout>
  );
};

export default Dashboard;
