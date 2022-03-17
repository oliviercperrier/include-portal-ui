import cx from 'classnames';
import { Button, List, Progress, Typography } from 'antd';
import intl from 'react-intl-universal';
import { TFenceStudy } from 'store/fenceStudies/types';
import { numberWithCommas } from 'utils/string';

import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { STATIC_ROUTES } from 'utils/routes';
import { INDEXES } from 'graphql/constants';
import { createQueryParams } from '@ferlab/ui/core/data/filters/utils';
import { generateFilters, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';

interface OwnProps {
  id: any;
  data: TFenceStudy;
}

const { Text } = Typography;

const AuthorizedStudiesListItem = ({ id, data }: OwnProps) => {
  return (
    <List.Item key={id} className={cx('wrapped', styles.AuthorizedStudiesListItem)}>
      <List.Item.Meta
        title={
          <Text title={data.studyShortName} ellipsis>
            {data.studyShortName}
          </Text>
        }
        description={
          <div className={styles.filesCount}>
            {intl.get('screen.dashboard.cards.authorizedStudies.authorization')}:{' '}
            <Link
              to={{
                pathname: STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
                search: createQueryParams({
                  filters: generateFilters({
                    newFilters: [
                      generateValueFilter({
                        field: 'study_id',
                        value: [data.id],
                        index: INDEXES.PARTICIPANT,
                      }),
                      generateValueFilter({
                        field: 'acl',
                        value: data.acl,
                        index: INDEXES.FILE,
                      }),
                    ],
                  }),
                }),
              }}
            >
              <Button className={styles.fileLink} type="link">
                <span>{numberWithCommas(data.authorizedFiles)}</span>
              </Button>
            </Link>{' '}
            {intl.get('screen.dashboard.cards.authorizedStudies.of')}{' '}
            <Link
              to={{
                pathname: STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
                search: createQueryParams({
                  filters: generateFilters({
                    newFilters: [
                      generateValueFilter({
                        field: 'study_id',
                        value: [data.id],
                        index: INDEXES.PARTICIPANT,
                      }),
                    ],
                  }),
                }),
              }}
            >
              <Button className={styles.fileLink} type="link">
                <span>{numberWithCommas(data.totalFiles)}</span>
              </Button>
            </Link>{' '}
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
        percent={Math.round((data.authorizedFiles / data.totalFiles) * 100)}
      ></Progress>
    </List.Item>
  );
};

export default AuthorizedStudiesListItem;
