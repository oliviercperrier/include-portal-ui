import { Form, Input, Modal } from 'antd';
import { TUserSavedFilter } from 'services/api/savedFilter/models';
import { WarningFilled } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { updateSavedFilter } from 'store/savedFilter/thunks';

import styles from './index.module.scss';

interface OwnProps {
  visible?: boolean;
  onCancel: () => void;
  filter: TUserSavedFilter;
}

const FILTER_NAME_MAX_LENGTH = 50;

const EditModal = ({ visible = false, onCancel, filter }: OwnProps) => {
  const dispatch = useDispatch();
  const [editForm] = Form.useForm();

  return (
    <Modal
      title={intl.get('components.querybuilder.header.modal.edit.title')}
      onCancel={() => {
        onCancel();
        editForm.resetFields();
      }}
      visible={visible}
      onOk={() => editForm.submit()}
    >
      <Form
        form={editForm}
        fields={[
          {
            name: ['title'],
            value: filter.title,
          },
        ]}
        layout="vertical"
        onFinish={(values) => {
          if (filter.title !== values.title) {
            dispatch(
              updateSavedFilter({
                ...filter,
                title: values.title,
              }),
            );
          }
          onCancel();
        }}
      >
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Form.Item
              name="title"
              label={intl.get('components.querybuilder.header.modal.edit.input.label')}
              rules={[
                {
                  type: 'string',
                  max: FILTER_NAME_MAX_LENGTH,
                  message: (
                    <span>
                      <WarningFilled /> {FILTER_NAME_MAX_LENGTH}{' '}
                      {intl.get('components.querybuilder.header.modal.edit.input.maximumLength')}
                    </span>
                  ),
                  validateTrigger: 'onSubmit',
                },
                {
                  type: 'string',
                  required: true,
                  message: intl.get('global.forms.errors.requiredField'),
                  validateTrigger: 'onSubmit',
                },
              ]}
              required={false}
              className={styles.filterEditFormItem}
            >
              <Input
                placeholder={intl.get(
                  'components.querybuilder.header.modal.edit.input.placeholder',
                )}
              />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
