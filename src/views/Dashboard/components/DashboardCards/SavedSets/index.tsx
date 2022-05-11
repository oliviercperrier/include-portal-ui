import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Tabs, Typography } from 'antd';
import intl from 'react-intl-universal';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import CardHeader from 'views/Dashboard/components/CardHeader';
import Empty from '@ferlab/ui/core/components/Empty';
import ListItem from './ListItem';
import { ReactElement } from 'react';
import { useSavedSet } from 'store/savedSet';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import cx from 'classnames';

import styles from './index.module.scss';

const { Text } = Typography;
const { TabPane } = Tabs;

const getItemList = (
  type: SetType,
  savedSets: IUserSetOutput[],
  fetchingError: boolean,
  isLoading: boolean,
  icon: ReactElement,
) => {
  return (
    <List<IUserSetOutput>
      className={styles.savedFiltersList}
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
            description={intl.get('screen.dashboard.cards.savedSets.noSavedFilters')}
          />
        ),
      }}
      dataSource={fetchingError ? [] : savedSets.filter((s) => s.setType === type)}
      loading={isLoading}
      renderItem={(item) => <ListItem data={item} icon={icon} />}
    />
  );
};

const SavedSets = ({ id, key, className = '' }: DashboardCardProps) => {
  const { savedSets, isLoading, fetchingError } = useSavedSet();

  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          key={key}
          title={intl.get('screen.dashboard.cards.savedSets.title')}
          withHandle
        />
      }
      content={
        <Tabs className={cx(styles.setTabs, 'navNoMarginBtm')} defaultActiveKey="participants">
          <TabPane
            tab={
              <div>
                <UserOutlined />
                Participants ({savedSets.filter((s) => s.setType === SetType.PARTICIPANT).length})
              </div>
            }
            key="participants"
          >
            {getItemList(
              SetType.PARTICIPANT,
              savedSets,
              fetchingError,
              isLoading,
              <UserOutlined />,
            )}
          </TabPane>
          <TabPane
            tab={
              <div>
                <ExperimentOutlined />
                Biospecimen ({savedSets.filter((s) => s.setType === SetType.BIOSPECIMEN).length})
              </div>
            }
            key="biospecimen"
          >
            {getItemList(
              SetType.BIOSPECIMEN,
              savedSets,
              fetchingError,
              isLoading,
              <ExperimentOutlined />,
            )}
          </TabPane>
          <TabPane
            tab={
              <div>
                <FileTextOutlined />
                Files ({savedSets.filter((s) => s.setType === SetType.FILE).length})
              </div>
            }
            key="files"
          >
            {getItemList(SetType.FILE, savedSets, fetchingError, isLoading, <FileTextOutlined />)}
          </TabPane>
        </Tabs>
      }
    />
  );
};

export default SavedSets;
