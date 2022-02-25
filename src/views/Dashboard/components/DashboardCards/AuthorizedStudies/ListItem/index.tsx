import cx from 'classnames';
import { Button, List, Progress, Typography } from 'antd';
import intl from 'react-intl-universal';
import { TFenceStudy } from 'store/fenceStudies/types';

import styles from './index.module.scss';

interface OwnProps {
  id: any;
  data: TFenceStudy;
}

const { Text } = Typography;

const AuthorizedStudiesListItem = ({ id, data }: OwnProps) => {
  return (
    <List.Item key={id} className={cx('wrapped', styles.AuthorizedStudiesListItem)}>
      <List.Item.Meta
        title={<Text ellipsis>{data.studyShortName}</Text>}
        description={
          <div className={styles.filesCount}>
            {intl.get('screen.dashboard.cards.authorizedStudies.authorization')}:{' '}
            <Button className={styles.fileLink} type="link">
              <span>{data.authorizedFiles}</span>
            </Button>{' '}
            {intl.get('screen.dashboard.cards.authorizedStudies.of')}{' '}
            <Button className={styles.fileLink} type="link">
              <span>{data.totalFiles}</span>
            </Button>{' '}
            {intl.get('screen.dashboard.cards.authorizedStudies.files')}
          </div>
        }
        className={styles.itemMeta}
      />
      <Text type="secondary" className={styles.dataUseGroups}>
        {intl.get('screen.dashboard.cards.authorizedStudies.dataGroups', {
          groups: data.acl.join(', '),
        })}
      </Text>
      <Progress
        className={styles.progress}
        size="small"
        percent={(data.authorizedFiles / data.totalFiles) * 100}
      ></Progress>
    </List.Item>
  );
};

export default AuthorizedStudiesListItem;
