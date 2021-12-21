import { TSortableItems } from "@ferlab/ui/core/layout/SortableGrid/SortableItem";
import DragHandle from "@ferlab/ui/core/layout/SortableGrid/DragHandle";
import { HolderOutlined } from "@ant-design/icons";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Typography } from "antd";
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
        content="Content.."
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
