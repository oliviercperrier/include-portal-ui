import React, { useState } from "react";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Button, List, Space } from "antd";
import Empty from "@ferlab/ui/core/components/Empty";
import {
  ApiOutlined,
  DisconnectOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { DashboardCardProps } from "views/Dashboard/components/DashboardCards";
import CardHeader from "views/Dashboard/components/CardHeader";
import Text from "antd/lib/typography/Text";
import AuthorizedStudiesListItem from "./ListItem";

import styles from "./index.module.scss";

export interface IListItemData {
  title: string;
  nbFiles: number;
  totalFiles: number;
  percent: number;
}

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
            align="start"
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
          <List<IListItemData>
            className={styles.authorizedStudiesList}
            bordered
            itemLayout="vertical"
            locale={{
              emptyText: (
                <Empty imageType="grid" description="No available studies" />
              ),
            }}
            dataSource={[
              {
                title: "Pediatric Brain Tumor Atlas: CBTTC",
                nbFiles: 18845,
                totalFiles: 27783,
                percent: 50,
              },
              {
                title: "CARING for Children with COVID: NICHD-2019-POP02",
                nbFiles: 18845,
                totalFiles: 27783,
                percent: 100,
              },
              {
                title: "Kids First: Neuroblastoma",
                nbFiles: 18845,
                totalFiles: 27783,
                percent: 75,
              },
              {
                title: "CARING for Children with COVID: NICHD-2019-POP02",
                nbFiles: 18845,
                totalFiles: 27783,
                percent: 96,
              },
            ]}
            renderItem={(item) => <AuthorizedStudiesListItem data={item} />}
          ></List>
        </div>
      }
    />
  );
};

export default AuthorizedStudies;
