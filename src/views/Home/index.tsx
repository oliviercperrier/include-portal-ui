import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Space, Typography, Divider } from "antd";

import { STATIC_ROUTES } from "utils/routes";
import IncludeIcon from "components/Icons/IncludeIcon";

import styles from "./index.module.scss";
import DataRelease from "components/DataRelease";

const { Title } = Typography;

const Home = (): React.ReactElement => {
  const { keycloak } = useKeycloak();
  const isAuthenticated = keycloak.authenticated || false;

  if (isAuthenticated) {
    return <Redirect to={STATIC_ROUTES.DASHBOARD} />;
  }

  return (
    <div className={styles.homePageContent}>
      <div className={styles.loginContainer}>
        <Space size={48} direction="vertical">
          <div className={styles.logoTitleContainer}>
            <IncludeIcon />
            <Title level={4} className={styles.logotTitle}>
              INCLUDE Data Hub
            </Title>
          </div>
          <div className={styles.loginStats}>
            <Title level={4} className={styles.statsTitle}>
              Available Data
            </Title>
            <Divider className={styles.statsDivider} />
            <DataRelease className={styles.dataRelease}/>
          </div>
          <div className={styles.loginDescription}>
            <Title level={2} className={styles.loginDescTitle}>
              Uncover <span className={styles.titleEmphase}>new insigths</span>{" "}
              into the biology of Down Syndrome and co-occurring conditions.
            </Title>
            <span className={styles.loginDescText}>
              Access large-scale data resources and explore custom built cohort
              datasets based on participant, biospecimen, clinical and genomic
              data.
            </span>
          </div>
          <Space className={styles.loginButtons} size={16}>
            <Button
              type={"primary"}
              onClick={async () => {
                const url = keycloak.createLoginUrl({
                  // eslint-disable-next-line max-len
                  redirectUri: `${window.location.origin}/${STATIC_ROUTES.DASHBOARD}`,
                });
                window.location.assign(url);
              }}
              size={"large"}
            >
              Log in
            </Button>
            <Link to={STATIC_ROUTES.JOIN}>
              <Button ghost size={"large"}>
                Sign up
              </Button>
            </Link>
          </Space>
        </Space>
      </div>
    </div>
  );
};
export default Home;
