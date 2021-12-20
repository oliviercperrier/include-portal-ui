import { TSortableItems } from "@ferlab/ui/core/layout/SortableGrid/SortableItem";
import DragHandle from "@ferlab/ui/core/layout/SortableGrid/DragHandle";
import { HolderOutlined } from "@ant-design/icons";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Typography } from "antd";

const { Title } = Typography;

const Handle = ({ id }: { id: string }) => (
  <DragHandle id={id}>
    <HolderOutlined />
  </DragHandle>
);

export const dashboardCards: TSortableItems[] = [
  {
    id: "1",
    xs: 24,
    md: 12,
    xxl: 6,
    component: (
      <GridCard
        theme="shade"
        title={<Title level={4}>Authorized Studies</Title>}
        extra={<Handle id="1" />}
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
        title={<Title level={4}>Card</Title>}
        extra={<Handle id="2" />}
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
        title={<Title level={4}>Card</Title>}
        extra={<Handle id="3" />}
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
        title={<Title level={4}>Card</Title>}
        extra={<Handle id="4" />}
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
        title={<Title level={4}>Card</Title>}
        extra={<Handle id="5" />}
        content="Content.."
      />
    ),
  },
];
