import cx from 'classnames';
import { Button, List, Form, Input, Modal } from 'antd';
import { TUserSavedFilter } from 'services/api/savedFilter/models';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { deleteSavedFilter, updateSavedFilter } from 'store/savedFilter/thunks';
import { FILTER_TAG_PAGE_MAPPING } from 'views/DataExploration/utils/constant';
import { Link } from 'react-router-dom';
import { savedFilterActions } from 'store/savedFilter/slice';

import styles from './index.module.scss';
import { distanceInWords } from 'date-fns';

interface OwnProps {
  id: any;
  data: TUserSavedFilter;
}

const FILTER_NAME_MAX_LENGTH = 50;

const SavedFiltersListItem = ({ id, data }: OwnProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [editForm] = Form.useForm();

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
              to={FILTER_TAG_PAGE_MAPPING[data.tag]}
              onClick={() => dispatch(savedFilterActions.setSelectedId(data.id))}
            >
              {data.title}
            </Link>
          }
          description={intl.get('screen.dashboard.cards.savedFilters.lastSaved', {
            date: distanceInWords(new Date(), new Date(data.updated_date)),
          })}
          className={styles.itemMeta}
        />
      </List.Item>
      <Modal
        title={intl.get('components.querybuilder.header.modal.edit.title')}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        onOk={() => editForm.submit()}
      >
        <Form
          form={editForm}
          fields={[
            {
              name: ['title'],
              value: data.title,
            },
          ]}
          layout="vertical"
          onFinish={(values) => {
            if (data.title !== values.title) {
              dispatch(
                updateSavedFilter({
                  ...data,
                  title: values.title,
                }),
              );
            }
            setModalVisible(false);
          }}
        >
          <Form.Item noStyle>
            <Form.Item
              name="title"
              label={intl.get('components.querybuilder.header.modal.edit.input.label')}
              rules={[{ required: true, type: 'string', max: FILTER_NAME_MAX_LENGTH }]}
              required={false}
              className={styles.filterEditFormItem}
            >
              <Input
                placeholder={intl.get(
                  'components.querybuilder.header.modal.edit.input.placeholder',
                )}
              />
            </Form.Item>
            <span>
              {FILTER_NAME_MAX_LENGTH}{' '}
              {intl.get('components.querybuilder.header.modal.edit.input.maximumLength')}
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SavedFiltersListItem;
