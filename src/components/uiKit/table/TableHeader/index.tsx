import React from "react";
import { ItemsCount } from "components/uiKit/ItemsCount";

import styles from "./index.module.scss";

interface OwnProps {
  extra?: React.ReactNode[];
  pageIndex: number;
  pageSize: number;
}

const TableHeader = ({ extra = [], pageIndex, pageSize }: OwnProps) => (
  <div className={styles.tableHeader}>
    <ItemsCount page={pageIndex} size={pageSize} total={0} />
    {extra.map((element, index) => (
      <div key={index}>{element}</div>
    ))}
  </div>
);

export default TableHeader;
