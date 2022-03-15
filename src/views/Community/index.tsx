import TableHeader from '@ferlab/ui/core/components/ProTable/Header';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space, Typography, List } from 'antd';
import Gravatar from 'components/uiKit/Gravatar';
import { useEffect, useState } from 'react';
import { UserApi } from 'services/api/user';
import { TUser } from 'services/api/user/models';

import styles from './index.module.scss';

const { Title, Text } = Typography;
const DEFAULT_PAGE_SIZE = 15;

const CommunityPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    UserApi.search(currentPage, DEFAULT_PAGE_SIZE).then(({ data }) => {
      setUsers(data?.users || []);
      setCount(data?.total || 0);
      setIsLoading(false);
    });
  }, [currentPage]);

  const formatName = (user: TUser) =>
    user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email;

  return (
    <Space direction="vertical" size={16} className={styles.communityWrapper}>
      <Title className={styles.title} level={4}>
        INCLUDE Community
      </Title>
      <GridCard
        content={
          <Space className={styles.usersListWrapper} size={12} direction="vertical">
            <TableHeader
              pageIndex={currentPage + 1}
              pageSize={DEFAULT_PAGE_SIZE}
              total={count}
              dictionary={{
                itemCount: {
                  results: 'Members',
                  noResults: 'No members',
                  clear: '',
                  of: '',
                  selectAllResults: '',
                  selected: '',
                  selectedPlural: '',
                },
              }}
            ></TableHeader>
            <List
              dataSource={users}
              className={styles.usersList}
              pagination={{
                total: count,
                pageSize: DEFAULT_PAGE_SIZE,
                onChange: (page) => {
                  setCurrentPage(page - 1);
                },
                size: 'small',
                hideOnSinglePage: true,
              }}
              loading={isLoading}
              itemLayout="vertical"
              renderItem={(item) => (
                <List.Item key={item.id} className={styles.usersListItem}>
                  <List.Item.Meta
                    avatar={<Gravatar circle email={item.email || ''} size={40} />}
                    title={<Text>{formatName(item)}</Text>}
                    description={
                      <Text type="secondary">
                        {item.affiliation ? `Affiliation: ${item.affiliation}` : 'No affiliation'}
                      </Text>
                    }
                  />
                  {item.portal_usages && (
                    <div className={styles.usagesWrapper}>
                      <Title level={5} className={styles.usagesListTitle}>
                        Intended uses of the portal:
                      </Title>
                      <ul className={styles.usagesList}>
                        {item.portal_usages?.map((value) => (
                          <li>{value}</li>
                        ))}
                      </ul>
                      {item.commercial_use_reason && (
                        <div className={styles.commercialUseWrapper}>
                          <Title level={5} className={styles.usagesListTitle}>
                            Reason for commercial use:
                          </Title>
                          <Text className={styles.commercialUseReason}>
                            {item.commercial_use_reason}
                          </Text>
                        </div>
                      )}
                    </div>
                  )}
                </List.Item>
              )}
            />
          </Space>
        }
      />
    </Space>
  );
};

export default CommunityPage;
