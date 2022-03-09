import DataRelease from 'components/uiKit/DataRelease';
import { Card, Space, Typography } from 'antd';
import intl from 'react-intl-universal';

import styles from './index.module.scss';

const { Title } = Typography;

const DataReleaseCard = () => {
  return (
    <Card className={styles.dataReleaseCard} bordered={false}>
      <Space size={24} direction="vertical">
        <Space direction="horizontal">
          <Title level={5} className={styles.cardTitle}>
            {intl.get('screen.dashboard.cards.datarelease.title', {
              version: '1.0',
            })}
          </Title>
        </Space>
        <DataRelease />
      </Space>
    </Card>
  );
};

export default DataReleaseCard;
