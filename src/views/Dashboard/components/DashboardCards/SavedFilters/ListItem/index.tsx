import React from "react";
import cx from "classnames";
import { List } from "antd";

import styles from "./index.module.scss";

interface OwnProps {
  id: any;
}

const SavedFiltersListItem = ({ id }: OwnProps) => {
  return (
    <List.Item
      key={id}
      className={cx("wrapped", styles.SavedFiltersListItem)}
    ></List.Item>
  );
};

export default SavedFiltersListItem;
