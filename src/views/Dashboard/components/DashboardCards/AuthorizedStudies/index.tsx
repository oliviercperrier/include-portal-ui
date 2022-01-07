import React, { useState } from "react";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Button, List, Space } from "antd";
import intl from "react-intl-universal";
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
import Empty from "@ferlab/ui/core/components/Empty";

export interface IListItemData {
  title: string;
  nbFiles: number;
  totalFiles: number;
  percent: number;
  groups: string[];
}

const AuthorizedStudies = ({ id, className = "" }: DashboardCardProps) => {
  const [isConnected, setIsConnected] = useState(false); // Add appropriate auth
  const data: IListItemData[] = [
    // Add appropriate api call and replace this list with the result
    {
      title: "Pediatric Brain Tumor Atlas: CBTTC",
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 50,
      groups: ["phs001168.c4", "phs0075632.c2", "Open access"],
    },
    {
      title: "CARING for Children with COVID: NICHD-2019-POP02",
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 100,
      groups: ["phs001168.c4", "phs0075632.c2", "Open access"],
    },
    {
      title: "Kids First: Neuroblastoma",
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 75,
      groups: ["phs001168.c4", "phs0075632.c2", "Open access"],
    },
    {
      title: "CARING for Children with COVID: NICHD-2019-POP02",
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 96,
      groups: ["phs001168.c4", "phs0075632.c2", "Open access"],
    },
  ];

  return (
    <GridCard
      theme="shade"
      className={className}
      title={
        <CardHeader
          id={id}
          title={intl.get("screen.dashboard.cards.authorizedStudies.title")}
          withHandle
          extra={[
            <Button type="text" className={styles.dataAccessBtn}>
              {intl.get("screen.dashboard.cards.authorizedStudies.headerBtn")}{" "}
              <QuestionCircleOutlined />
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
                  {intl.get(
                    "screen.dashboard.cards.authorizedStudies.connectedNotice"
                  )}
                </Text>
                <Button
                  type="primary"
                  size="small"
                  danger
                  icon={<DisconnectOutlined />}
                  onClick={() => setIsConnected(false)}
                >
                  {intl.get(
                    "screen.dashboard.cards.authorizedStudies.disconnect"
                  )}
                </Button>
              </>
            ) : (
              <>
                <SafetyOutlined className={styles.safetyIcon} />
                <Text className={styles.notice}>
                  {intl.get(
                    "screen.dashboard.cards.authorizedStudies.disconnectedNotice"
                  )}
                </Text>
                <Button
                  type="primary"
                  size="small"
                  icon={<ApiOutlined />}
                  onClick={() => setIsConnected(true)}
                >
                  {intl.get("screen.dashboard.cards.authorizedStudies.connect")}
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
                <Empty
                  imageType="grid"
                  description={intl.get(
                    "screen.dashboard.cards.authorizedStudies.noAvailableStudies"
                  )}
                />
              ),
            }}
            dataSource={data}
            renderItem={(item) => <AuthorizedStudiesListItem data={item} />}
          ></List>
        </div>
      }
    />
  );
};

export default AuthorizedStudies;
