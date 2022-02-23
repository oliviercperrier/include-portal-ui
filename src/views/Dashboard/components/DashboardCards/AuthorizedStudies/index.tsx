import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, List, Space } from 'antd';
import intl from 'react-intl-universal';
import { DisconnectOutlined, SafetyOutlined } from '@ant-design/icons';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import CardHeader from 'views/Dashboard/components/CardHeader';
import Text from 'antd/lib/typography/Text';
import AuthorizedStudiesListItem from './ListItem';
import Empty from '@ferlab/ui/core/components/Empty';
import CardConnectPlaceholder from 'views/Dashboard/components/CardConnectPlaceholder';
import useFenceConnections from 'hooks/useFenceConnection';
import { connectFence, disconnectFence } from 'store/fenceConnection/thunks';
import { FENCE_NAMES } from 'common/fenceTypes';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import useFenceStudy from 'hooks/useFenceStudy';
import { TFenceStudy } from 'store/fenceStudies/types';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import ExternalLink from 'components/uiKit/ExternalLink';

import styles from './index.module.scss';

const AuthorizedStudies = ({ id, className = '' }: DashboardCardProps) => {
  const dispatch = useDispatch();
  const { loadingFences, connections, fencesConnectError } = useFenceConnections();
  const { loadingStudiesForFences, fenceAuthStudies, fencesError } = useFenceStudy();
  const hasConnections = !isEmpty(connections);
  const hasErrors = !isEmpty(fencesConnectError) || !isEmpty(fencesError);
  const fenceStudiesLoading = loadingStudiesForFences.length > 0;
  const connectionsLoading = loadingFences.includes(FENCE_NAMES.gen3);

  console.log(hasErrors)

  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          title={intl.get('screen.dashboard.cards.authorizedStudies.title', {
            count: !hasConnections ? 0 : fenceAuthStudies.length,
          })}
          infoPopover={{
            title: intl.get('screen.dashboard.cards.authorizedStudies.infoPopover.title'),
            overlayClassName: styles.authorizedStudiesInfoPopover,
            content: (
              <Space direction="vertical" className={styles.content} size={0}>
                <Text>
                  {intl.getHTML('screen.dashboard.cards.authorizedStudies.infoPopover.content')}{' '}
                  <ExternalLink href="https://google.com">
                    <Button type="link" size="small" className={styles.applyForAccessBtn}>
                      {intl.get(
                        'screen.dashboard.cards.authorizedStudies.infoPopover.applyingForDataAccess',
                      )}
                    </Button>
                  </ExternalLink>
                  .
                </Text>
              </Space>
            ),
          }}
          withHandle
        />
      }
      content={
        <div className={styles.authorizedWrapper}>
          {hasConnections && !hasErrors && !fenceStudiesLoading && (
            <Space className={styles.authenticatedHeader} direction="horizontal">
              <Space align="start">
                <SafetyOutlined className={styles.safetyIcon} />
                <Text className={styles.notice}>
                  {intl.get('screen.dashboard.cards.authorizedStudies.connectedNotice')}{' '}
                  <Button
                    type="link"
                    size="small"
                    danger
                    icon={<DisconnectOutlined />}
                    loading={connectionsLoading}
                    onClick={() => dispatch(disconnectFence(FENCE_NAMES.gen3))}
                    className={styles.disconnectBtn}
                  >
                    {intl.get('screen.dashboard.cards.authorizedStudies.disconnect')}
                  </Button>
                </Text>
              </Space>
            </Space>
          )}
          <List<TFenceStudy>
            className={styles.authorizedStudiesList}
            bordered
            itemLayout="vertical"
            loading={fenceStudiesLoading}
            locale={{
              emptyText: hasErrors ? (
                <CardErrorPlaceholder />
              ) : hasConnections ? (
                <Empty
                  imageType="grid"
                  description={intl.get(
                    'screen.dashboard.cards.authorizedStudies.noAvailableStudies',
                  )}
                />
              ) : (
                <CardConnectPlaceholder
                  icon={<SafetyOutlined className={styles.safetyIcon} />}
                  description={intl.get(
                    'screen.dashboard.cards.authorizedStudies.disconnectedNotice',
                  )}
                  btnProps={{
                    loading: connectionsLoading,
                    onClick: () => dispatch(connectFence(FENCE_NAMES.gen3)),
                  }}
                />
              ),
            }}
            dataSource={hasConnections && !hasErrors ? fenceAuthStudies : []}
            renderItem={(item) => <AuthorizedStudiesListItem id={item.id} data={item} />}
          ></List>
        </div>
      }
    />
  );
};

export default AuthorizedStudies;
