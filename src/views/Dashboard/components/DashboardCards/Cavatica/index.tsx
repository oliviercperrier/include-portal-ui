import { useEffect, useState } from 'react';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, List, Space } from 'antd';
import intl from 'react-intl-universal';
import { DisconnectOutlined, PlusOutlined, SafetyOutlined } from '@ant-design/icons';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import CardHeader from 'views/Dashboard/components/CardHeader';
import Text from 'antd/lib/typography/Text';
import CavaticaListItem from './ListItem';
import Empty from '@ferlab/ui/core/components/Empty';
import CardConnectPlaceholder from 'views/Dashboard/components/CardConnectPlaceholder';
import CavaticaIcon from 'components/Icons/CavaticaIcon';
import { cavaticaActions } from 'store/cavatica/slice';
import { useDispatch } from 'react-redux';
import CreateProjectModal from './CreateProjectModal';
import { fetchAllProjects } from 'store/cavatica/thunks';
import { useCavatica } from 'store/cavatica';
import { TCavaticaProjectWithMembers } from 'store/cavatica/types';
import ExternalLink from 'components/uiKit/ExternalLink';
import { connectToFence } from 'store/fenceConnection/thunks';
import { FENCE_NAMES } from 'common/fenceTypes';

import styles from './index.module.scss';

const Cavatica = ({ id, className = '' }: DashboardCardProps) => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false); // Add appropriate auth
  const { projects, isLoading } = useCavatica();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchAllProjects());
    }
    // eslint-disable-next-line
  }, [isConnected]);

  return (
    <>
      <GridCard
        theme="shade"
        wrapperClassName={className}
        title={
          <CardHeader
            id={id}
            title={intl.get('screen.dashboard.cards.cavatica.title')}
            infoPopover={{
              title: intl.get('screen.dashboard.cards.cavatica.infoPopover.title'),
              overlayClassName: styles.cavaticaInfoPopover,
              content: (
                <Space direction="vertical" className={styles.content} size={0}>
                  <Text>
                    {intl.get('screen.dashboard.cards.cavatica.infoPopover.content')}{' '}
                    <ExternalLink href="https://www.cavatica.org/">
                      <Button type="link" size="small" className={styles.readMoreBtn}>
                        {intl.get('screen.dashboard.cards.cavatica.infoPopover.readMore')}
                      </Button>
                    </ExternalLink>
                  </Text>
                </Space>
              ),
            }}
            withHandle
          />
        }
        content={
          <div className={styles.cavaticaWrapper}>
            {isConnected && (
              <Space className={styles.authenticatedHeader} direction="horizontal">
                <Space align="start">
                  <SafetyOutlined className={styles.safetyIcon} />
                  <Text className={styles.notice}>
                    {intl.get('screen.dashboard.cards.cavatica.connectedNotice')}{' '}
                    <Button
                      type="link"
                      size="small"
                      danger
                      icon={<DisconnectOutlined />}
                      onClick={() => setIsConnected(false)}
                      className={styles.disconnectBtn}
                    >
                      {intl.get('screen.dashboard.cards.cavatica.disconnect')}
                    </Button>
                  </Text>
                </Space>
              </Space>
            )}
            <List<TCavaticaProjectWithMembers>
              className={styles.cavaticaProjectsList}
              bordered
              itemLayout="vertical"
              loading={isLoading}
              locale={{
                emptyText: isConnected ? (
                  <Empty
                    imageType="grid"
                    description={intl.get('screen.dashboard.cards.cavatica.noProjects')}
                    action={
                      <Button type="primary" icon={<PlusOutlined />} size="small">
                        {intl.get('screen.dashboard.cards.cavatica.createNewProject')}
                      </Button>
                    }
                  />
                ) : (
                  <CardConnectPlaceholder
                    icon={<CavaticaIcon />}
                    description={intl.get('screen.dashboard.cards.cavatica.disconnectedNotice')}
                    btnProps={{
                      onClick: () => dispatch(connectToFence(FENCE_NAMES.cavatica)),
                    }}
                  />
                ),
              }}
              dataSource={isConnected ? projects : []} // just for testing before implementing real data
              renderItem={(item) => <CavaticaListItem id={item.id} data={item} />}
            ></List>
            {(isConnected ? projects : []).length > 0 && (
              <div className={styles.customFooter}>
                <Button
                  icon={<PlusOutlined />}
                  className={styles.newProjectBtn}
                  size="small"
                  onClick={() => dispatch(cavaticaActions.beginCreateProject())}
                >
                  {intl.get('screen.dashboard.cards.cavatica.newProject')}
                </Button>
              </div>
            )}
          </div>
        }
      />
      {isConnected && <CreateProjectModal openAnalyseModalOnClose={false} />}
    </>
  );
};

export default Cavatica;
