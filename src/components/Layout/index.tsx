import React from "react";
import { Layout as AntLayout } from "antd";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import { getFTEnvVarByKey } from "helpers/EnvVariables";
import NotificationBanner from "components/featureToggle/NotificationBanner";
import { AlterTypes } from "utils/types";

import styles from "./index.module.scss";

interface OwnProps {
  children: React.ReactElement;
}

const FT_FLAG_KEY = "SITE_WIDE_BANNER";
const BANNER_TYPE_KEY = FT_FLAG_KEY + "_TYPE";
const BANNER_MSG_KEY = FT_FLAG_KEY + "_MSG";

const Layout = ({ children }: OwnProps) => (
  <AntLayout className={styles.mainLayout}>
    <NotificationBanner
      className={styles.siteWideBanner}
      featureToggleKey={FT_FLAG_KEY}
      type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, "warning")}
      message={getFTEnvVarByKey(BANNER_MSG_KEY)}
      banner
      closable
    />
    <Header />
    <AntLayout.Content className={styles.mainContent}>
      <div id="content">{children}</div>
    </AntLayout.Content>
    <Footer />
  </AntLayout>
);

export default Layout;
