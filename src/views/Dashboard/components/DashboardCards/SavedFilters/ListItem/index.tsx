import cx from 'classnames';
import { Button, List, Modal, Typography } from 'antd';
import { TUserSavedFilter } from 'services/api/savedFilter/models';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { deleteSavedFilter } from 'store/savedFilter/thunks';
import { Link } from 'react-router-dom';
import { distanceInWords } from 'date-fns';
import EditModal from '../EditModal';
import { setQueryBuilderState } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { FILTER_ID_QUERY_PARAM_KEY } from 'common/constants';
import { FILTER_TAG_PAGE_MAPPING, FILTER_TAG_QB_ID_MAPPING } from 'common/queryBuilder';

import styles from './index.module.scss';

interface OwnProps {
  id: any;
  data: TUserSavedFilter;
}

const { Text } = Typography;

const SavedFiltersListItem = ({ id, data }: OwnProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <List.Item
        key={id}
        id={data.id}
        className={cx(styles.SavedFiltersListItem, 'with-action-on-hover')}
        actions={[
          <Button
            type="text"
            icon={<EditFilled />}
            onClick={() => setModalVisible(true)}
            className={styles.editFilterAction}
          ></Button>,
          <Button
            className={styles.editFilterAction}
            type="text"
            icon={<DeleteFilled />}
            onClick={() =>
              Modal.confirm({
                title: intl.get('components.querybuilder.header.popupConfirm.delete.title'),
                icon: <ExclamationCircleOutlined />,
                okText: intl.get('components.querybuilder.header.popupConfirm.delete.okText'),
                content: intl.get('components.querybuilder.header.popupConfirm.delete.content'),
                cancelText: intl.get(
                  'components.querybuilder.header.popupConfirm.delete.cancelText',
                ),
                okButtonProps: { danger: true },
                onOk: () => dispatch(deleteSavedFilter(data.id)),
              })
            }
          ></Button>,
        ]}
      >
        <List.Item.Meta
          title={
            // eslint-disable-next-line
            <Link
              className={styles.filterLink}
              to={{
                pathname: FILTER_TAG_PAGE_MAPPING[data.tag],
                search: `?${FILTER_ID_QUERY_PARAM_KEY}=${data.id}`,
              }}
              onClick={() =>
                setQueryBuilderState(FILTER_TAG_QB_ID_MAPPING[data.tag], {
                  active: data.queries[0].id,
                  state: data.queries,
                })
              }
            >
              {data.title}
            </Link>
          }
          description={
            <Text type="secondary">
              {intl.get('screen.dashboard.cards.savedFilters.lastSaved', {
                date: distanceInWords(new Date(), new Date(data.updated_date)),
              })}
            </Text>
          }
          className={styles.itemMeta}
        />
      </List.Item>
      <EditModal visible={modalVisible} onCancel={() => setModalVisible(false)} filter={data} />
    </>
  );
};

export default SavedFiltersListItem;
