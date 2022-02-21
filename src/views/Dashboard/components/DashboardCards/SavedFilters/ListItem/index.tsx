import cx from 'classnames';
import { Button, List, Modal, Typography } from 'antd';
import { TUserSavedFilter } from 'services/api/savedFilter/models';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { deleteSavedFilter } from 'store/savedFilter/thunks';
import { FILTER_TAG_PAGE_MAPPING } from 'views/DataExploration/utils/constant';
import { Link } from 'react-router-dom';
import { distanceInWords } from 'date-fns';

import styles from './index.module.scss';
import EditModal from '../EditModal';

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
                search: `?filterId=${data.id}`,
              }}
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
