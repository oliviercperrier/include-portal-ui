import cx from 'classnames';
import { List, Space, Typography } from 'antd';
import { IListItemData } from 'views/Dashboard/components/DashboardCards/Cavatica';
import intl from 'react-intl-universal';
import { TeamOutlined } from '@ant-design/icons';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';

import styles from './index.module.scss';

interface OwnProps {
  id: any;
  data: IListItemData;
}

const { Text } = Typography;

const CavaticaListItem = ({ id, data }: OwnProps) => {
  return (
    <List.Item key={id} className={cx('wrapped', styles.CavaticaListItem)}>
      <List.Item.Meta
        title={
          <a href={data.projectUrl} target="_blank" rel="noreferrer" className={styles.projectLink}>
            {data.title}
            <ExternalLinkIcon className={styles.externalIcon} height={14} width={14} />
          </a>
        }
        className={styles.itemMeta}
      />
      <Space className={styles.members}>
        <TeamOutlined className={styles.teamIcon} />
        <Text type="secondary">
          {intl.get('screen.dashboard.cards.cavatica.membersCount', {
            count: data.nbMember,
          })}
        </Text>
      </Space>
    </List.Item>
  );
};

export default CavaticaListItem;
