import { useState } from "react";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Button, List, Popover, Space } from "antd";
import intl from "react-intl-universal";
import {
  DisconnectOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { DashboardCardProps } from "views/Dashboard/components/DashboardCards";
import CardHeader from "views/Dashboard/components/CardHeader";
import Text from "antd/lib/typography/Text";
import CavaticaListItem from "./ListItem";
import Empty from "@ferlab/ui/core/components/Empty";
import CardConnectPlaceholder from "views/Dashboard/components/CardConnectPlaceholder";
import CavaticaIcon from "components/Icons/CavaticaIcon";

import styles from "./index.module.scss";

export interface IListItemData {
  key: any;
  title: string;
  nbMember: number;
}

const Cavatica = ({ id, className = "" }: DashboardCardProps) => {
  const [isConnected, setIsConnected] = useState(true); // Add appropriate auth
  const data: IListItemData[] = [
    // Add appropriate api call and replace this list with the result
    {
      key: "1",
      title: "PNOC008-Annovar-Annotation",
      nbMember: 1,
    },
    {
      key: "2",
      title: "Project Title",
      nbMember: 7,
    },
    {
      key: "3",
      title: "Project Title",
      nbMember: 2,
    },
    {
      key: "4",
      title: "Project Title",
      nbMember: 9,
    },
    {
      key: "5",
      title: "Project Title",
      nbMember: 3,
    },
  ];

  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          title={intl.get("screen.dashboard.cards.cavatica.title", {
            count: isConnected ? data.length : 0,
          })}
          extra={[
            <Popover
              title={intl.get(
                "screen.dashboard.cards.cavatica.infoPopover.title"
              )}
              overlayClassName={styles.cavaticaInfoPopover}
              content={
                <Space direction="vertical" className={styles.content} size={0}>
                  <Text>
                    {intl.get(
                      "screen.dashboard.cards.cavatica.infoPopover.content"
                    )}
                  </Text>
                  <a
                    href="https://www.cavatica.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button type="link" className={styles.readMoreBtn}>
                      {intl.get(
                        "screen.dashboard.cards.cavatica.infoPopover.readMore"
                      )}
                    </Button>
                  </a>
                </Space>
              }
            >
              <InfoCircleOutlined className={styles.cavaticaInfoIcon} />
            </Popover>,
          ]}
          withHandle
        />
      }
      content={
        <div className={styles.cavaticaWrapper}>
          {isConnected && (
            <Space
              className={styles.authenticatedHeader}
              direction="horizontal"
            >
              <SafetyOutlined className={styles.safetyIcon} />
              <Text className={styles.notice}>
                {intl.get("screen.dashboard.cards.cavatica.connectedNotice")}
              </Text>
              <Button
                type="link"
                size="small"
                danger
                icon={<DisconnectOutlined />}
                onClick={() => setIsConnected(false)}
                className={styles.disconnectBtn}
              >
                {intl.get("screen.dashboard.cards.cavatica.disconnect")}
              </Button>
            </Space>
          )}
          <List<IListItemData>
            className={styles.cavaticaProjectsList}
            bordered
            itemLayout="vertical"
            locale={{
              emptyText: isConnected ? (
                <Empty
                  imageType="grid"
                  description={intl.get(
                    "screen.dashboard.cards.cavatica.noProjects"
                  )}
                  action={
                    <Button type="primary" icon={<PlusOutlined />} size="small">
                      {intl.get(
                        "screen.dashboard.cards.cavatica.createNewProject"
                      )}
                    </Button>
                  }
                />
              ) : (
                <CardConnectPlaceholder
                  icon={<CavaticaIcon />}
                  description={intl.get(
                    "screen.dashboard.cards.cavatica.disconnectedNotice"
                  )}
                  btnProps={{
                    onClick: () => setIsConnected(true),
                  }}
                />
              ),
            }}
            dataSource={isConnected ? data : []} // just for testing before implementing real data
            renderItem={(item) => (
              <CavaticaListItem id={item.key} data={item} />
            )}
          ></List>
          {(isConnected ? data : []).length > 0 && (
            <div className={styles.customFooter}>
              <Button
                icon={<PlusOutlined />}
                className={styles.newProjectBtn}
                size="small"
              >
                {intl.get("screen.dashboard.cards.cavatica.newProject")}
              </Button>
            </div>
          )}
        </div>
      }
    />
  );
};

export default Cavatica;
