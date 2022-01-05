import { TSortableItems } from "@ferlab/ui/core/layout/SortableGrid/SortableItem";
import DragHandle from "@ferlab/ui/core/layout/SortableGrid/DragHandle";
import {
  DeleteOutlined,
  HolderOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { List, Typography } from "antd";
import DataExplorationLinks from "views/Dashboard/components/DataExplorationLinks";

import styles from "./index.module.scss";

const { Title } = Typography;

const Handle = ({ id }: { id: string }) => (
  <DragHandle id={id} className={styles.dragHandle}>
    <HolderOutlined />
  </DragHandle>
);

export const dashboardCards: TSortableItems[] = [
  {
    id: "0",
    xs: 24,
    component: (
      <GridCard
        theme="shade"
        title={
          <Title level={4} className={styles.cardTitleWithDragHandle}>
            <Handle id="0" /> Data Exploration
          </Title>
        }
        content={<DataExplorationLinks />}
      />
    ),
  },
  {
    id: "1",
    xs: 24,
    md: 12,
    xxl: 6,
    component: (
      <GridCard
        theme="shade"
        title={
          <Title level={4} className={styles.cardTitleWithDragHandle}>
            <Handle id="1" /> Authorized Studies
          </Title>
        }
        content={
          <List
            bordered
            dataSource={[
              {
                title: "Olivier OlivierOlivier OlivierOlivier Olivier Olivier Olivier Olivier",
                description: "wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow ",
              },
              {
                title: "David",
                description: "omg",
              },
            ]}
            renderItem={(item) => (
              <List.Item className="wrapped" actions={[<DeleteOutlined />, <UserAddOutlined />]}>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          ></List>
        }
      />
    ),
  },
  {
    id: "2",
    xs: 24,
    md: 12,
    xxl: 6,
    component: (
      <GridCard
        theme="shade"
        title={
          <Title level={4} className={styles.cardTitleWithDragHandle}>
            <Handle id="2" /> Card
          </Title>
        }
        content="Content.."
      />
    ),
  },
  {
    id: "3",
    xs: 24,
    md: 12,
    xxl: 6,
    component: (
      <GridCard
        theme="shade"
        title={
          <Title level={4} className={styles.cardTitleWithDragHandle}>
            <Handle id="3" /> Card
          </Title>
        }
        content="Content.."
      />
    ),
  },
  {
    id: "4",
    xs: 24,
    md: 12,
    xxl: 6,
    component: (
      <GridCard
        theme="shade"
        title={
          <Title level={4} className={styles.cardTitleWithDragHandle}>
            <Handle id="4" /> Card
          </Title>
        }
        content="Content.."
      />
    ),
  },
  {
    id: "5",
    xs: 24,
    md: 12,
    xxl: 6,
    component: (
      <GridCard
        theme="shade"
        title={
          <Title level={4} className={styles.cardTitleWithDragHandle}>
            <Handle id="5" /> Card
          </Title>
        }
        content="Content.."
      />
    ),
  },
];
