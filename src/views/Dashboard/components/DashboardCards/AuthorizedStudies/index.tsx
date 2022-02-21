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

import styles from './index.module.scss';

export interface IListItemData {
  key: any;
  title: string;
  nbFiles: number;
  totalFiles: number;
  percent: number;
  groups: string[];
}

const AuthorizedStudies = ({ id, className = '' }: DashboardCardProps) => {
  const dispatch = useDispatch();
  const { loadingFences, connections } = useFenceConnections();
  const { loadingStudiesForFences, fenceAuthStudies } = useFenceStudy();

  console.log(fenceAuthStudies)

  const data: IListItemData[] = [
    // Add appropriate api call and replace this list with the result
    {
      key: '1',
      title: 'Pediatric Brain Tumor Atlas: CBTTC',
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 50,
      groups: ['phs001168.c4', 'phs0075632.c2', 'Open access'],
    },
    {
      key: '2',
      title: 'CARING for Children with COVID: NICHD-2019-POP02',
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 100,
      groups: ['phs001168.c4', 'phs0075632.c2', 'Open access'],
    },
    {
      key: '3',
      title: 'Kids First: Neuroblastoma',
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 75,
      groups: ['phs001168.c4', 'phs0075632.c2', 'Open access'],
    },
    {
      key: '4',
      title: 'CARING for Children with COVID: NICHD-2019-POP02',
      nbFiles: 18845,
      totalFiles: 27783,
      percent: 96,
      groups: ['phs001168.c4', 'phs0075632.c2', 'Open access'],
    },
  ];

  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          title={intl.get('screen.dashboard.cards.authorizedStudies.title', {
            count: isEmpty(connections) ? 0 : data.length,
          })}
          infoPopover={{
            title: intl.get('screen.dashboard.cards.authorizedStudies.infoPopover.title'),
            overlayClassName: styles.authorizedStudiesInfoPopover,
            content: (
              <Space direction="vertical" className={styles.content} size={0}>
                <Text>
                  {intl.getHTML('screen.dashboard.cards.authorizedStudies.infoPopover.content')}{' '}
                  <a href="https://google.com" target="_blank" rel="noreferrer">
                    <Button type="link" size="small" className={styles.applyForAccessBtn}>
                      {intl.get(
                        'screen.dashboard.cards.authorizedStudies.infoPopover.applyingForDataAccess',
                      )}
                    </Button>
                  </a>
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
          {!isEmpty(connections) && (
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
                    loading={loadingFences.includes(FENCE_NAMES.gen3)}
                    onClick={() => dispatch(disconnectFence(FENCE_NAMES.gen3))}
                    className={styles.disconnectBtn}
                  >
                    {intl.get('screen.dashboard.cards.authorizedStudies.disconnect')}
                  </Button>
                </Text>
              </Space>
            </Space>
          )}
          <List<IListItemData>
            className={styles.authorizedStudiesList}
            bordered
            itemLayout="vertical"
            locale={{
              emptyText: !isEmpty(connections) ? (
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
                    loading: loadingFences.includes(FENCE_NAMES.gen3),
                    onClick: () => dispatch(connectFence(FENCE_NAMES.gen3)),
                  }}
                />
              ),
            }}
            dataSource={isEmpty(connections) ? [] : data} // just for testing before implementing real data
            renderItem={(item) => <AuthorizedStudiesListItem id={item.key} data={item} />}
          ></List>
        </div>
      }
    />
  );
};

export default AuthorizedStudies;
