import { useState } from "react";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { List } from "antd";
import intl from "react-intl-universal";
import { DashboardCardProps } from "views/Dashboard/components/DashboardCards";
import CardHeader from "views/Dashboard/components/CardHeader";
import Empty from "@ferlab/ui/core/components/Empty";
import SavedFiltersListItem from "./ListItem";

import styles from "./index.module.scss";

export interface IListItemData {
  key: any;
  title: string;
  nbFiles: number;
  totalFiles: number;
  percent: number;
  groups: string[];
}

const SavedFilters = ({ id, className = "" }: DashboardCardProps) => {
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
          title={intl.get("screen.dashboard.cards.savedFilters.title")}
          withHandle
        />
      }
      content={
        <List<IListItemData>
          className={styles.savedFiltersList}
          bordered
          itemLayout="vertical"
          locale={{
            emptyText: (
              <Empty
                imageType="grid"
                description={intl.get(
                  "screen.dashboard.cards.savedFilters.noSavedFilters"
                )}
              />
            ),
          }}
          dataSource={[]}
          renderItem={(item) => <SavedFiltersListItem id={item.key} />}
        ></List>
      }
    />
  );
};

export default SavedFilters;
