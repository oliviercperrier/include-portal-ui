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

import styles from './index.module.scss';
import EditModal from '../EditModal';
import { deleteSavedSet, updateSavedSet } from 'store/savedSet/thunks';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { SetActionType } from '../../../../../DataExploration/components/SetsManagementDropdown';

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
  const [onFocus, setOnFocus] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onTagRename = (setId: string, newTag: string) => {
    if (saveSetTags.includes(newTag)) {
      setHasError(true);
      setErrorMessage('A set with this name already exists');
    } else {
      dispatch(
        updateSavedSet({
          onCompleteCb(): void {},
          id: setId,
          subAction: SetActionType.RENAME_TAG,
          newTag: newTag,
        }),
      );
      setModalVisible(false);
    }
  };

  const onCancel = () => {
    setModalVisible(false);
    setErrorMessage('');
    setHasError(false);
  };

  return (
    <div onMouseEnter={() => setOnFocus(true)} onMouseLeave={() => setOnFocus(false)}>
      <List.Item
        key={id}
        className={cx(styles.SavedFiltersListItem, 'with-action-on-hover')}
        extra={
          <Row gutter={15} className={styles.countDisplay}>
            {onFocus ? (
              <>
                <Col>
                  <Button
                    type="text"
                    icon={<EditFilled />}
                    onClick={() => setModalVisible(true)}
                    className={styles.editFilterAction}
                  />
                </Col>
                <Col>
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
                </Col>
              </>
            ) : (
              <>
                <Col>{data.size}</Col>
                <Col>{icon}</Col>
              </>
            )}
          </Row>
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
                onClick={() =>
                  addQuery({
                    queryBuilderId: DATA_EXPLORATION_QB_ID,
                    query: generateQuery({
                      newFilters: [
                        generateValueFilter({
                          field: 'fhir_id',
                          value: [`set_id:${data.id}`],
                          index: data.setType,
                        }),
                      ],
                    }),
                    setAsActive: true,
                  })
                }
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
      <EditModal
        visible={modalVisible}
        onCancel={onCancel}
        set={data}
        onTagRename={onTagRename}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default ListItem;