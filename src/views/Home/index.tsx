import React from "react";
import { Link, Redirect } from "react-router-dom";
import MultiLabel, {
  MultiLabelIconPositionEnum,
} from "@ferlab/ui/core/components/labels/MultiLabel";
import { numberFormat } from "@ferlab/ui/core/utils/numberUtils";
import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Spin, Space, Typography, Divider } from "antd";

import { STATIC_ROUTES } from "utils/routes";
import BookIcon from "components/Icons/BookIcon";
import FileTextIcon from "components/Icons/FileTextIcon";
import IncludeIcon from "components/Icons/IncludeIcon";
import StorageIcon from "components/Icons/StorageIcon";
import UserIcon from "components/Icons/UserIcon";
import useApi from "hooks/useApi";
import EnvVariables from "helpers/EnvVariables";

import styles from "./index.module.scss";

const formatStorage = (storage: string) => {
  if (!storage) return;
  const parts = storage.split(/\.| /);
  return `${parts[0]}${parts[2]}`;
};
const iconSize = { height: 24, width: 24 };
const { Title } = Typography;

const Home = (): React.ReactElement => {
  const { keycloak } = useKeycloak();
  const isAuthenticated = keycloak.authenticated || false;
  const { result, loading } = useApi<{
    studies: number;
    participants: number;
    biospecimens: number;
    fileSize: string;
  }>({
    config: {
      url: `${EnvVariables.configFor({
        key: "ARRANGER_API",
      })}/statistics`,
    },
  });

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
            <Spin spinning={loading}>
              <StackLayout className={styles.loginStatsContainer}>
                <MultiLabel
                  iconPosition={MultiLabelIconPositionEnum.Top}
                  label={numberFormat(result?.studies!)}
                  Icon={
                    <BookIcon
                      className={styles.loginPageIconColor}
                      {...iconSize}
                    />
                  }
                  className={styles.loginStatsLabel}
                  subLabel={"Studies"}
                />
                <MultiLabel
                  iconPosition={MultiLabelIconPositionEnum.Top}
                  label={numberFormat(result?.participants!)}
                  Icon={
                    <UserIcon
                      className={styles.loginPageIconColor}
                      {...iconSize}
                    />
                  }
                  className={styles.loginStatsLabel}
                  subLabel={"Participants"}
                />
                <MultiLabel
                  iconPosition={MultiLabelIconPositionEnum.Top}
                  label={numberFormat(result?.biospecimens!)}
                  Icon={
                    <FileTextIcon
                      className={styles.loginPageIconColor}
                      {...iconSize}
                    />
                  }
                  className={styles.loginStatsLabel}
                  subLabel={"Biospecimens"}
                />
                <MultiLabel
                  iconPosition={MultiLabelIconPositionEnum.Top}
                  label={formatStorage(result?.fileSize!)}
                  Icon={
                    <StorageIcon
                      className={styles.loginPageIconColor}
                      {...iconSize}
                    />
                  }
                  className={styles.loginStatsLabel}
                  subLabel={"Data Files"}
                />
              </StackLayout>
            </Spin>
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
