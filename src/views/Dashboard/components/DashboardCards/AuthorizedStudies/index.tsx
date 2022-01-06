import React, { useState } from "react";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Button, List, Progress, Space } from "antd";
import cx from "classnames";
import {
  ApiOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { DashboardCardProps } from "views/Dashboard/components/DashboardCards";
import CardHeader from "views/Dashboard/components/CardHeader";
import { Link } from "react-router-dom";
import Text from "antd/lib/typography/Text";

import styles from "./index.module.scss";

const AuthorizedStudies = ({ id, className = "" }: DashboardCardProps) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <GridCard
      theme="shade"
      className={className}
      title={
        <CardHeader
          id={id}
          title="Authorized Studies"
          withHandle
          extra={[
            <Button type="text" className={styles.dataAccessBtn}>
              Data access <QuestionCircleOutlined />
            </Button>,
          ]}
        />
      }
      content={
        <div>
          <Space
            className={styles.authSection}
            direction="horizontal"
            align="baseline"
          >
            {isConnected ? (
              <>
                <SafetyOutlined className={styles.safetyIcon} />
                <Text className={styles.notice}>
                  Your account is connected. You have access to all released
                  INLCUDE controlled data.
                </Text>
                <Button
                  type="primary"
                  size="small"
                  danger
                  icon={<DisconnectOutlined />}
                  onClick={() => setIsConnected(false)}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <>
                <SafetyOutlined className={styles.safetyIcon} />
                <Text className={styles.notice}>
                  Access all released INCLUDE controlled data by connecting your
                  account using your NIH credentials.
                </Text>
                <Button
                  type="primary"
                  size="small"
                  icon={<ApiOutlined />}
                  onClick={() => setIsConnected(true)}
                >
                  Connect
                </Button>
              </>
            )}
          </Space>
          <List
            className={styles.authorizedStudiesList}
            bordered
            itemLayout="vertical"
            dataSource={[
              {
                title: "Pediatric Brain Tumor Atlas: CBTTC",
                description: (
                  <div className={styles.filesCount}>
                    Authorization:{" "}
                    <Link to="">
                      <Button className={styles.fileLink} type="text">
                        18845
                      </Button>
                    </Link>{" "}
                    of{" "}
                    <Link to="">
                      <Button className={styles.fileLink} type="text">
                        27783
                      </Button>
                    </Link>{" "}
                    Files
                  </div>
                ),
              },
              {
                title: "David",
                description: "omg",
              },
            ]}
            renderItem={(item) => (
              <List.Item className={cx("wrapped", styles.studiesListItem)}>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                  className={styles.itemMeta}
                />
                <div className={styles.dataUseGroups}>Data use Groups: Open access</div>
                <Progress className={styles.progress} size="small" percent={50}></Progress>
              </List.Item>
            )}
          ></List>
        </div>
      }
    />
  );
};

export default AuthorizedStudies;
