import React from "react";
import { Spin, Space } from "antd";
import cx from "classnames";
import MultiLabel, {
  MultiLabelIconPositionEnum,
} from "@ferlab/ui/core/components/labels/MultiLabel";
import { numberFormat } from "@ferlab/ui/core/utils/numberUtils";
import BookIcon from "components/Icons/BookIcon";
import FileTextIcon from "components/Icons/FileTextIcon";
import StorageIcon from "components/Icons/StorageIcon";
import UserIcon from "components/Icons/UserIcon";
import useApi from "hooks/useApi";
import EnvVariables from "helpers/EnvVariables";

import styles from "./index.module.scss";

interface OwnProps {
  className?: string;
  itemSpacing?: number;
}

const iconSize = { height: 24, width: 24 };
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
        className={cx(styles.loginStatsContainer, className)}
        size={itemSpacing!}
      >
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(result?.studies!)}
          Icon={
            <BookIcon className={styles.loginPageIconColor} {...iconSize} />
          }
          className={styles.loginStatsLabel}
          subLabel={"Studies"}
        />
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(result?.participants!)}
          Icon={
            <UserIcon className={styles.loginPageIconColor} {...iconSize} />
          }
          className={styles.loginStatsLabel}
          subLabel={"Participants"}
        />
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(result?.biospecimens!)}
          Icon={
            <FileTextIcon className={styles.loginPageIconColor} {...iconSize} />
          }
          className={styles.loginStatsLabel}
          subLabel={"Biospecimens"}
        />
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={formatStorage(result?.fileSize!) || "500TB"}
          Icon={
            <StorageIcon className={styles.loginPageIconColor} {...iconSize} />
          }
          className={styles.loginStatsLabel}
          subLabel={"Data Files"}
        />
      </Space>
    </Spin>
  );
};

export default DataRelease;
