import React from "react";
import { Spin, Space } from "antd";
import cx from "classnames";
import MultiLabel, {
  MultiLabelIconPositionEnum,
} from "@ferlab/ui/core/components/labels/MultiLabel";
import { numberFormat } from "@ferlab/ui/core/utils/numberUtils";
import {
  UserOutlined,
  ReadOutlined,
  DatabaseOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import useApi from "hooks/useApi";
import EnvVariables from "helpers/EnvVariables";

import styles from "./index.module.scss";

interface OwnProps {
  className?: string;
  itemSpacing?: number;
}

const formatStorage = (storage: string) => {
  if (!storage) return;
  const parts = storage.split(/\.| /);
  return `${parts[0]}${parts[2]}`;
};

const DataRelease = ({ className = "", itemSpacing = 0 }: OwnProps) => {
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

  return (
    <Spin spinning={loading}>
      <Space
        className={cx(styles.dataReleaseContainer, className)}
        size={itemSpacing!}
      >
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(result?.studies!)}
          Icon={<ReadOutlined className={styles.dataReleaseIcon} />}
          className={styles.dataReleaseStatsLabel}
          subLabel={"Studies"}
        />
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(result?.participants!)}
          Icon={<UserOutlined className={styles.dataReleaseIcon} />}
          className={styles.dataReleaseStatsLabel}
          subLabel={"Participants"}
        />
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(result?.biospecimens!)}
          Icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
          className={styles.dataReleaseStatsLabel}
          subLabel={"Biospecimens"}
        />
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={formatStorage(result?.fileSize!) || "500TB"}
          Icon={<DatabaseOutlined className={styles.dataReleaseIcon} />}
          className={styles.dataReleaseStatsLabel}
          subLabel={"Data Files"}
        />
      </Space>
    </Spin>
  );
};

export default DataRelease;
