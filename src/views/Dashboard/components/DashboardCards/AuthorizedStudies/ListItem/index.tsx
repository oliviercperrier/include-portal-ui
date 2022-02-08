import cx from "classnames";
import { Button, List, Progress } from "antd";
import { IListItemData } from "views/Dashboard/components/DashboardCards/AuthorizedStudies";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

interface OwnProps {
  id: any;
  data: IListItemData;
}

const AuthorizedStudiesListItem = ({ id, data }: OwnProps) => {
  return (
    <List.Item
      key={id}
      className={cx("wrapped", styles.AuthorizedStudiesListItem)}
    >
      <List.Item.Meta
        title={data.title}
        description={
          <div className={styles.filesCount}>
            {intl.get("screen.dashboard.cards.authorizedStudies.authorization")}
            :{" "}
            <Button className={styles.fileLink} type="link">
              <span>{data.nbFiles}</span>
            </Button>{" "}
            {intl.get("screen.dashboard.cards.authorizedStudies.of")}{" "}
            <Button className={styles.fileLink} type="link">
              <span>{data.totalFiles}</span>
            </Button>{" "}
            {intl.get("screen.dashboard.cards.authorizedStudies.files")}
          </div>
        }
        className={styles.itemMeta}
      />
      <div className={styles.dataUseGroups}>
        {intl.get("screen.dashboard.cards.authorizedStudies.dataGroups", {
          groups: data.groups.join(", "),
        })}
      </div>
      <Progress
        className={styles.progress}
        size="small"
        percent={data.percent}
      ></Progress>
    </List.Item>
  );
};

export default AuthorizedStudiesListItem;
