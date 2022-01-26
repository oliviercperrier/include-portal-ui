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
import Empty from "@ferlab/ui/core/components/Empty";

import styles from "./index.module.scss";

export interface IListItemData {
  key: any;
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
      key: "1",
      title: "Pediatric Brain Tumor Atlas: CBTTC",
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 50,
      groups: ["phs001168.c4", "phs0075632.c2", "Open access"],
    },
    {
      key: "2",
      title: "CARING for Children with COVID: NICHD-2019-POP02",
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 100,
      groups: ["phs001168.c4", "phs0075632.c2", "Open access"],
    },
    {
      key: "3",
      title: "Kids First: Neuroblastoma",
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 75,
      groups: ["phs001168.c4", "phs0075632.c2", "Open access"],
    },
    {
      key: "4",
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
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          title={intl.get("screen.dashboard.cards.authorizedStudies.title")}
          withHandle
          extra={[
            <Button key="1" type="text" className={styles.dataAccessBtn}>
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
                <Space size={8} direction="horizontal" align="start">
                  <SafetyOutlined className={styles.safetyIcon} />
                  <Text className={styles.notice}>
                    {intl.get(
                      "screen.dashboard.cards.authorizedStudies.connectedNotice"
                    )}
                  </Text>
                </Space>
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
                <Space size={8} direction="horizontal" align="start">
                  <SafetyOutlined className={styles.safetyIcon} />
                  <Text className={styles.notice}>
                    {intl.get(
                      "screen.dashboard.cards.authorizedStudies.disconnectedNotice"
                    )}
                  </Text>
                </Space>
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
            renderItem={(item) => (
              <AuthorizedStudiesListItem id={item.key} data={item} />
            )}
          ></List>
        </div>
      }
    />
  );
};

export default AuthorizedStudies;
