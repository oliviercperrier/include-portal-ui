import { Form, Input, Modal } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import intl from 'react-intl-universal';

import styles from './index.module.scss';
import { IUserSetOutput } from 'services/api/savedSet/models';

interface OwnProps {
  visible?: boolean;
  onCancel: () => void;
  onTagRename: (setId: string, newTag: string) => void;
  set: IUserSetOutput;
  hasError: boolean;
  errorMessage: string;
}

const FILTER_NAME_MAX_LENGTH = 50;

const EditModal = ({
  visible = false,
  onCancel,
  set,
  onTagRename,
  hasError,
  errorMessage,
}: OwnProps) => {
  const [editForm] = Form.useForm();

  return (
    <Modal
      title={intl.get('components.savedSets.modal.edit.title')}
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
            value: set.tag,
          },
        ]}
        layout="vertical"
        onFinish={(value) => {
          if (set.tag !== value.title) {
            onTagRename(set.id, value.title);
          }
        }}
      >
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Form.Item
              name="title"
              label={intl.get('components.savedSets.modal.edit.input.label')}
              validateStatus={hasError ? 'error' : 'success'}
              help={errorMessage}
              rules={[
                {
                  type: 'string',
                  max: FILTER_NAME_MAX_LENGTH,
                  message: (
                    <span>
                      <WarningFilled /> {FILTER_NAME_MAX_LENGTH}{' '}
                      {intl.get('components.savedSets.modal.edit.input.maximumLength')}
                    </span>
                  ),
                },
                {
                  type: 'string',
                  required: true,
                  message: intl.get('global.forms.errors.requiredField'),
                },
              ]}
              required={false}
              className={styles.filterEditFormItem}
            >
              <Input placeholder={intl.get('components.savedSets.modal.edit.input.placeholder')} />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
