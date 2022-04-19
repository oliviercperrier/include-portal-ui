import cx from 'classnames';
import { Button, Col, List, Modal, Row, Typography } from 'antd';
import { IUserSetOutput } from 'services/api/savedSet/models';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactElement, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import {
  DATA_EPLORATION_FILTER_TAG,
  DATA_EXPLORATION_QB_ID,
} from 'views/DataExploration/utils/constant';
import { Link } from 'react-router-dom';
import { distanceInWords } from 'date-fns';
import CreateEditModal from '../CreateEditModal';
import { deleteSavedSet } from 'store/savedSet/thunks';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { SetActionType } from 'views/DataExploration/components/SetsManagementDropdown';
import { SET_ID_PREFIX } from '@ferlab/ui/core/data/sqon/types';

import styles from './index.module.scss';

interface OwnProps {
  id: any;
  data: IUserSetOutput;
  icon: ReactElement;
  saveSetTags: string[];
}

const { Text } = Typography;

const redirectToPage = (setType: string) => {
  switch (setType) {
    case INDEXES.FILE:
    case INDEXES.PARTICIPANT:
    case INDEXES.BIOSPECIMEN:
      return DATA_EPLORATION_FILTER_TAG;
    default:
      return DATA_EPLORATION_FILTER_TAG;
  }
};

const ListItem = ({ id, data, icon, saveSetTags }: OwnProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const onCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <List.Item
        key={id}
        className={cx(styles.savedSetListItem, 'with-action-on-hover')}
        actions={[
          <Button
            type="text"
            icon={<EditFilled />}
            onClick={() => setModalVisible(true)}
            className={styles.editSetAction}
          />,
          <Button
            className={styles.editSetAction}
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
          />,
        ]}
        extra={
          <Row gutter={15} className={styles.countDisplay}>
            <Col>{data.size}</Col>
            <Col>{icon}</Col>
          </Row>
        }
      >
        <List.Item.Meta
          title={
            <Link
              className={styles.setLink}
              to={redirectToPage(data.setType)}
              onClick={() => {
                const setValue = `${SET_ID_PREFIX}${data.id}`;
                addQuery({
                  queryBuilderId: DATA_EXPLORATION_QB_ID,
                  query: generateQuery({
                    newFilters: [
                      generateValueFilter({
                        field: 'fhir_id',
                        value: [setValue],
                        index: data.setType,
                        alternateName: {
                          [setValue]: data.tag,
                        },
                      }),
                    ],
                  }),
                  setAsActive: true,
                });
              }}
            >
              {data.tag}
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
      <CreateEditModal
        title={intl.get('components.savedSets.modal.edit.title')}
        setType={data.setType}
        hideModalCb={onCancel}
        visible={modalVisible}
        currentSaveSet={data}
        saveSetActionType={SetActionType.UPDATE_SET}
      />
    </>
  );
};

export default ListItem;
