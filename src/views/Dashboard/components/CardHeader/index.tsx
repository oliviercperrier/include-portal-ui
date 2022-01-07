import React, { ReactNode } from "react";
import { Space, Typography } from "antd";
import DragHandle from "@ferlab/ui/core/layout/SortableGrid/DragHandle";
import { HolderOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

interface OwnProps {
  id: string;
  title: string;
  extra?: ReactNode[];
  withHandle?: boolean;
}

const { Title } = Typography;

const CardHeader = ({
  id,
  title,
  extra = [],
  withHandle = false,
}: OwnProps) => (
  <Title level={4} className={styles.cardHeader}>
    <Space direction="horizontal" size={5} className={styles.title}>
      {withHandle && (
        <DragHandle id={id} className={styles.dragHandle}>
          <HolderOutlined />
        </DragHandle>
      )}{" "}
      {title}
    </Space>
    <div className={styles.extra}>{extra}</div>
  </Title>
);

export default CardHeader;
