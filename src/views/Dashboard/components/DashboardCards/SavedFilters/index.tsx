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
  lastSaved: string;
}

const SavedFilters = ({ id, className = "" }: DashboardCardProps) => {
  const data: IListItemData[] = [
    // Add appropriate api call and replace this list with the result
    {
      key: "1",
      title: "Pediatric Brain Tumor Atlas: CBTTC",
      lastSaved: "Saved 2 hours ago",
    },
    {
      key: "2",
      title: "Pediatric Brain Tumor Atlas: CBTTC",
      lastSaved: "Saved 2 hours ago",
    },
    {
      key: "3",
      title: "Pediatric Brain Tumor Atlas: CBTTC",
      lastSaved: "Saved 2 hours ago",
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
          dataSource={data}
          renderItem={(item) => (
            <SavedFiltersListItem id={item.key} data={item} />
          )}
        ></List>
      }
    />
  );
};

export default SavedFilters;
