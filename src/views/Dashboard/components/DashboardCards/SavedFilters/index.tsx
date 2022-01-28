import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { List } from "antd";
import intl from "react-intl-universal";
import { DashboardCardProps } from "views/Dashboard/components/DashboardCards";
import CardHeader from "views/Dashboard/components/CardHeader";
import Empty from "@ferlab/ui/core/components/Empty";
import SavedFiltersListItem from "./ListItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSavedFilters } from "store/savedFilter/thunks";
import { useSavedFilter } from "store/savedFilter";
import { TUserSavedFilter } from "services/api/savedFilter/models";

import styles from "./index.module.scss";

const SavedFilters = ({ id, className = "" }: DashboardCardProps) => {
  const dispatch = useDispatch();
  const { savedFilters, isLoading } = useSavedFilter();

  useEffect(() => {
    dispatch(fetchSavedFilters());
    // eslint-disable-next-line
  }, []);

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
        <List<TUserSavedFilter>
          className={styles.savedFiltersList}
          bordered
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
          dataSource={savedFilters}
          loading={isLoading}
          renderItem={(item) => (
            <SavedFiltersListItem id={item.id} data={item} />
          )}
        ></List>
      }
    />
  );
};

export default SavedFilters;
