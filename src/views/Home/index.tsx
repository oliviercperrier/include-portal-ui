import { Link, Redirect } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Space, Typography, Divider } from "antd";
import intl from "react-intl-universal";
import { STATIC_ROUTES } from "utils/routes";
import IncludeIcon from "components/Icons/IncludeIcon";
import DataRelease from "components/uiKit/DataRelease";

import styles from "./index.module.scss";

const { Title } = Typography;

const Home = (): React.ReactElement => {
  const { keycloak } = useKeycloak();
  const isAuthenticated = keycloak.authenticated || false;

  if (isAuthenticated) {
    return <Redirect to={STATIC_ROUTES.DASHBOARD} />;
  }

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      // eslint-disable-next-line max-len
      redirectUri: `${window.location.origin}/${STATIC_ROUTES.DASHBOARD}`,
    });
    window.location.assign(url);
  };

  return (
    <div className={styles.homePageContent}>
      <div className={styles.loginContainer}>
        <Space size={48} direction="vertical">
          <div className={styles.logoTitleContainer}>
            <IncludeIcon />
            <Title level={4} className={styles.logotTitle}>
              {intl.get("screen.home.title")}
            </Title>
          </div>
          <div className={styles.loginStats}>
            <Title level={4} className={styles.statsTitle}>
              {intl.get("screen.home.datarelease.title")}
            </Title>
            <Divider className={styles.statsDivider} />
            <DataRelease className={styles.dataRelease} />
          </div>
          <div className={styles.loginDescription}>
            <Title level={2} className={styles.loginDescTitle}>
              {intl.get("screen.home.uncover")}{" "}
              <span className={styles.titleEmphase}>
                {intl.get("screen.home.newInsights")}
              </span>{" "}
              {intl.get("screen.home.biologyConditions")}
            </Title>
            <span className={styles.loginDescText}>
              {intl.get("screen.home.accessLargeScale")}
            </span>
          </div>
          <Space className={styles.loginButtons} size={16}>
            <Button type={"primary"} onClick={handleSignin} size={"large"}>
              {intl.get("screen.home.login")}
            </Button>
            <Button onClick={handleSignin} ghost size={"large"}>
              {intl.get("screen.home.signup")}
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};
export default Home;
