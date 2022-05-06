import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Typography } from 'antd';
import intl from 'react-intl-universal';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import CardHeader from 'views/Dashboard/components/CardHeader';
import Empty from '@ferlab/ui/core/components/Empty';
import SavedFiltersListItem from './ListItem';
import { useSavedFilter } from 'store/savedFilter';
import { TUserSavedFilter } from 'services/api/savedFilter/models';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';

import styles from './index.module.scss';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';

const { Text } = Typography;

const SavedFilters = ({ id, key, className = '' }: DashboardCardProps) => {
  const { savedFilters, isLoading, fetchingError } = useSavedFilter();


  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          key={key}
          title={intl.get('screen.dashboard.cards.savedFilters.title')}
          withHandle
        />
      }
      content={
        <List<TUserSavedFilter>
          className={styles.savedFiltersList}
          key="2"
          bordered
          locale={{
            emptyText: fetchingError ? (
              <CardErrorPlaceholder
                title="Failed to Fetch Saved Filters"
                subTitle={
                  <Text>
                    Please refresh and try again or{' '}
                    <ExternalLink href="mailto:support@includedrc.org">
                      <Text>contact our support</Text>
                    </ExternalLink>
                    .
                  </Text>
                }
              />
            ) : (
              <Empty
                imageType="grid"
                description={intl.get('screen.dashboard.cards.savedFilters.noSavedFilters')}
              />
            ),
          }}
          dataSource={fetchingError ? [] : savedFilters}
          loading={isLoading}
          renderItem={(item) => <SavedFiltersListItem id={item.id} data={item} />}
        />
      }
    />
  );
};

export default SavedFilters;
