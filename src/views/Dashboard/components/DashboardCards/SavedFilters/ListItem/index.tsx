import cx from "classnames";
import { List } from "antd";
import { TUserSavedFilter } from "services/api/savedFilter/models";

import styles from "./index.module.scss";

interface OwnProps {
  id: any;
  data: TUserSavedFilter;
}

const SavedFiltersListItem = ({ id, data }: OwnProps) => {
  return (
    <List.Item key={id} className={cx("wrapped", styles.SavedFiltersListItem)}>
      <List.Item.Meta
        title={data.title}
        description={data.updated_date}
        className={styles.itemMeta}
      />
    </List.Item>
  );
};

export default SavedFiltersListItem;
