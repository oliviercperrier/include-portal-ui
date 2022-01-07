import { TSortableItems } from "@ferlab/ui/core/layout/SortableGrid/SortableItem";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import AuthorizedStudies from "./AuthorizedStudies";
import DataExplorationLinks from "./DataExplorationLinks";

import styles from "./index.module.scss";

export interface DashboardCardProps {
  id: string;
  className?: string;
}

export const dashboardCards: TSortableItems[] = [
  {
    id: "0",
    xs: 24,
    component: <DataExplorationLinks id="0" className={styles.dashboardCard} />,
  },
  {
    id: "1",
    xs: 24,
    md: 12,
    xxl: 6,
    component: <AuthorizedStudies id="1" className={styles.dashboardCard} />,
  },
  {
    id: "2",
    xs: 24,
    md: 12,
    xxl: 6,
    component: (
      <GridCard
        className={styles.dashboardCard}
        theme="shade"
        title={""}
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
        className={styles.dashboardCard}
        theme="shade"
        title={""}
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
        className={styles.dashboardCard}
        theme="shade"
        title={""}
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
        className={styles.dashboardCard}
        theme="shade"
        title={""}
        content="Content.."
      />
    ),
  },
];
