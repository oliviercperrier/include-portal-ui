import { Spin, Row, Col } from "antd";
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
import intl from "react-intl-universal";

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
  const { result } = useApi<{
    studies: number;
    participants: number;
    biospecimens: number;
    fileSize: string;
  }>({
    config: {
      url: `${EnvVariables.configFor("ARRANGER_API")}/statistics`,
    },
  });

  return (
    <Spin spinning={false}>
      <Row
        className={cx(styles.dataReleaseContainer, className)}
        gutter={[40, 24]}
      >
        <Col xs={12} md={6}>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(result?.studies!)}
            Icon={<ReadOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get("components.dataRelease.studies")}
          />
        </Col>
        <Col xs={12} md={6}>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(result?.participants!)}
            Icon={<UserOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get("components.dataRelease.participants")}
          />
        </Col>
        <Col xs={12} md={6}>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(result?.biospecimens!)}
            Icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get("components.dataRelease.biospecimens")}
          />
        </Col>
        <Col xs={12} md={6}>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={formatStorage(result?.fileSize!) || "0TB"}
            Icon={<DatabaseOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get("components.dataRelease.datafiles")}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default DataRelease;
