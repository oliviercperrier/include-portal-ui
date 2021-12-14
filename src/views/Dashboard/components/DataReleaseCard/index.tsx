import React from "react";
import DataRelease from "components/DataRelease";
import { Button, Space, Typography } from "antd";
import ExternalLinkIcon from "components/Icons/ExternalLinkIcon";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

const { Title } = Typography;
const iconSize = { width: 14, height: 14 };

const DataReleaseCard = () => {
  return (
    <Space className={styles.dataReleaseCard} direction="vertical" size={24}>
      <Space direction="horizontal">
        <Title level={5} className={styles.cardTitle}>
          {intl.get("screen.dashboard.card.datarelease.title", {
            version: "1.0",
          })}
        </Title>
        <Button type="link" className={styles.externalLink}>
          August 4th, 2021 <ExternalLinkIcon {...iconSize} />
        </Button>
      </Space>
      <DataRelease itemSpacing={40} />
    </Space>
  );
};

export default DataReleaseCard;
