import React from "react";
import cx from "classnames";
import { Button, List, Progress } from "antd";
import { Link } from "react-router-dom";
import { IListItemData } from "views/Dashboard/components/DashboardCards/AuthorizedStudies";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

interface OwnProps {
  data: IListItemData;
}

const AuthorizedStudiesListItem = ({ data }: OwnProps) => {
  return (
    <List.Item className={cx("wrapped", styles.AuthorizedStudiesListItem)}>
      <List.Item.Meta
        title={data.title}
        description={
          <div className={styles.filesCount}>
            {intl.get("screen.dashboard.cards.authorizedStudies.authorization")}
            :{" "}
            <Link to="">
              <Button className={styles.fileLink} type="text">
                {data.nbFiles}
              </Button>
            </Link>{" "}
            {intl.get("screen.dashboard.cards.authorizedStudies.of")}{" "}
            <Link to="">
              <Button className={styles.fileLink} type="text">
                {data.totalFiles}
              </Button>
            </Link>{" "}
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
