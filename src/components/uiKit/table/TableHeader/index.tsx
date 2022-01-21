import React from "react";
import { ItemsCount } from "components/uiKit/ItemsCount";

import styles from "./index.module.scss";
import { Space } from "antd";

interface OwnProps {
  extra?: React.ReactNode[];
  pageIndex: number;
  pageSize: number;
  total: number;
}

const TableHeader = ({ extra = [], pageIndex, pageSize, total }: OwnProps) => (
  <div className={styles.tableHeader}>
    <ItemsCount page={pageIndex} size={pageSize} total={total} />
    <Space className={styles.extra} size={12}>
      {extra.map((element, index) => (
        <div key={index}>{element}</div>
      ))}
    </Space>
  </div>
);

export default TableHeader;
