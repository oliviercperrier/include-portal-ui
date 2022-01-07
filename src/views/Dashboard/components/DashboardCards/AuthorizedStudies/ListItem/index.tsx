import React from "react";
import cx from "classnames";
import { Button, List, Progress } from "antd";
import { Link } from "react-router-dom";
import { IListItemData } from "views/Dashboard/components/DashboardCards/AuthorizedStudies";

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
            Authorization:{" "}
            <Link to="">
              <Button className={styles.fileLink} type="text">
                {data.nbFiles}
              </Button>
            </Link>{" "}
            of{" "}
            <Link to="">
              <Button className={styles.fileLink} type="text">
                {data.totalFiles}
              </Button>
            </Link>{" "}
            Files
          </div>
        }
        className={styles.itemMeta}
      />
      <div className={styles.dataUseGroups}>Data use Groups: Open access</div>
      <Progress
        className={styles.progress}
        size="small"
        percent={data.percent}
      ></Progress>
    </List.Item>
  );
};

export default AuthorizedStudiesListItem;
