import { useKeycloak } from "@react-keycloak/web";
import { Button, Space, Typography, Divider } from "antd";
import intl from "react-intl-universal";
import { STATIC_ROUTES } from "utils/routes";
import IncludeIcon from "components/Icons/IncludeIcon";
import DataRelease from "components/uiKit/DataRelease";

import styles from "./index.module.scss";

const { Title } = Typography;

const Login = (): React.ReactElement => {
  const { keycloak } = useKeycloak();

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      // eslint-disable-next-line max-len
      redirectUri: `${window.location.origin}/${STATIC_ROUTES.DASHBOARD}`,
    });
    window.location.assign(url);
  };

  return (
    <div className={styles.loginPageContent}>
      <div className={styles.loginContainer}>
        <Space size={48} direction="vertical">
          <div className={styles.logoTitleContainer}>
            <IncludeIcon />
            <Title level={4} className={styles.logotTitle}>
              {intl.get("screen.loginPage.title")}
            </Title>
          </div>
          <div className={styles.loginStats}>
            <Title level={4} className={styles.statsTitle}>
              {intl.get("screen.loginPage.datarelease.title")}
            </Title>
            <Divider className={styles.statsDivider} />
            <DataRelease className={styles.dataRelease} />
          </div>
          <div className={styles.loginDescription}>
            <Title level={2} className={styles.loginDescTitle}>
              {intl.get("screen.loginPage.uncover")}{" "}
              <span className={styles.titleEmphase}>
                {intl.get("screen.loginPage.newInsights")}
              </span>{" "}
              {intl.get("screen.loginPage.biologyConditions")}
            </Title>
            <span className={styles.loginDescText}>
              {intl.get("screen.loginPage.accessLargeScale")}
            </span>
          </div>
          <Space className={styles.loginButtons} size={16}>
            <Button type={"primary"} onClick={handleSignin} size={"large"}>
              {intl.get("screen.loginPage.login")}
            </Button>
            <Button onClick={handleSignin} ghost size={"large"}>
              {intl.get("screen.loginPage.signup")}
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};
export default Login;
