import cx from 'classnames';
import { Button, List, Modal, Typography } from 'antd';
import { IUserSetOutput } from 'services/api/savedSet/models';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactElement, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DATA_EPLORATION_FILTER_TAG } from 'views/DataExploration/utils/constant';
import { Link } from 'react-router-dom';
import { distanceInWords } from 'date-fns';

import styles from './index.module.scss';
import EditModal from '../EditModal';
import { deleteSavedSet } from 'store/savedSet/thunks';

interface OwnProps {
  id: any;
  data: IUserSetOutput;
  icon: ReactElement;
}

const { Text } = Typography;

const redirectToPage = (setType: string) => {
  switch (setType) {
    case 'file':
    case 'participant':
    case 'biospecimen':
      return DATA_EPLORATION_FILTER_TAG;
    default:
      return DATA_EPLORATION_FILTER_TAG;
  }
};

const ListItem = ({ id, data, icon }: OwnProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const dispatch = useDispatch();

  return (
    <div onMouseEnter={() => setOnFocus(true)} onMouseLeave={() => setOnFocus(false)}>
      <List.Item
        key={id}
        className={cx(styles.SavedFiltersListItem, 'with-action-on-hover')}
        extra={
          onFocus ? (
            <>
              <Button
                type="text"
                icon={<EditFilled />}
                onClick={() => setModalVisible(true)}
                className={styles.editFilterAction}
              />
              <Button
                className={styles.editFilterAction}
                type="text"
                icon={<DeleteFilled />}
                onClick={() =>
                  Modal.confirm({
                    title: intl.get('components.savedSets.popupConfirm.delete.title'),
                    icon: <ExclamationCircleOutlined />,
                    okText: intl.get('components.savedSets.popupConfirm.delete.okText'),
                    content: intl.get('components.savedSets.popupConfirm.delete.content'),
                    cancelText: intl.get('components.savedSets.popupConfirm.delete.cancelText'),
                    okButtonProps: { danger: true },
                    onOk: () => dispatch(deleteSavedSet(data.id)),
                  })
                }
              />
            </>
          ) : (
            <div>
              {data.size}
              {icon}
            </div>
          )
        }
      >
        <List.Item.Meta
          title={
            <>
              <Link
                className={styles.filterLink}
                to={{
                  pathname: redirectToPage(data.setType),
                  search: `?setId=${data.id}`,
                }}
              >
                {data.tag}
              </Link>
            </>
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
      <EditModal visible={modalVisible} onCancel={() => setModalVisible(false)} set={data} />
    </div>
  );
};

export default ListItem;
