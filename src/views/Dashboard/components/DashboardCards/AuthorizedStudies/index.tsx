import { useState } from "react";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Button, List, Space } from "antd";
import intl from "react-intl-universal";
import {
  DisconnectOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { DashboardCardProps } from "views/Dashboard/components/DashboardCards";
import CardHeader from "views/Dashboard/components/CardHeader";
import Text from "antd/lib/typography/Text";
import AuthorizedStudiesListItem from "./ListItem";
import Empty from "@ferlab/ui/core/components/Empty";
import CardConnectPlaceholder from "views/Dashboard/components/CardConnectPlaceholder";

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
          title={intl.get("screen.dashboard.cards.authorizedStudies.title", {
            count: isConnected ? data.length : 0,
          })}
          withHandle
          extra={[
            <Button
              key="1"
              type="link"
              className={styles.dataAccessBtn}
              size="small"
            >
              {intl.get("screen.dashboard.cards.authorizedStudies.headerBtn")}{" "}
              <QuestionCircleOutlined />
            </Button>,
          ]}
        />
      }
      content={
        <div className={styles.authorizedWrapper}>
          {isConnected && (
            <Space
              className={styles.authenticatedHeader}
              direction="horizontal"
            >
              <SafetyOutlined className={styles.safetyIcon} />
              <Text className={styles.notice}>
                {intl.get(
                  "screen.dashboard.cards.authorizedStudies.connectedNotice"
                )}
              </Text>
              <Button
                type="link"
                size="small"
                danger
                icon={<DisconnectOutlined />}
                onClick={() => setIsConnected(false)}
                className={styles.disconnectBtn}
              >
                {intl.get(
                  "screen.dashboard.cards.authorizedStudies.disconnect"
                )}
              </Button>
            </Space>
          )}
          <List<IListItemData>
            className={styles.authorizedStudiesList}
            bordered
            itemLayout="vertical"
            locale={{
              emptyText: isConnected ? (
                <Empty
                  imageType="grid"
                  description={intl.get(
                    "screen.dashboard.cards.authorizedStudies.noAvailableStudies"
                  )}
                />
              ) : (
                <CardConnectPlaceholder
                  icon={<SafetyOutlined className={styles.safetyIcon} />}
                  description={intl.get(
                    "screen.dashboard.cards.authorizedStudies.disconnectedNotice"
                  )}
                  btnProps={{
                    onClick: () => setIsConnected(true),
                  }}
                />
              ),
            }}
            dataSource={isConnected ? data : []} // just for testing before implementing real data
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
