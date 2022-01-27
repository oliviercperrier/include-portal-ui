import cx from "classnames";
import { List } from "antd";

import styles from "./index.module.scss";
import { IListItemData } from "..";

interface OwnProps {
  id: any;
  data: IListItemData;
}

const SavedFiltersListItem = ({ id, data }: OwnProps) => {
  return (
    <List.Item key={id} className={cx("wrapped", styles.SavedFiltersListItem)}>
      <List.Item.Meta
        title={data.title}
        description={data.lastSaved}
        className={styles.itemMeta}
      />
    </List.Item>
  );
};

export default SavedFiltersListItem;
