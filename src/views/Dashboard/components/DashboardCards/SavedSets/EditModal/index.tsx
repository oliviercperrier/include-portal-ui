import { Form, Input, Modal } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import styles from './index.module.scss';
import { IUserSetOutput } from 'services/api/savedSet/models';
import { updateSavedSet } from 'store/savedSet/thunks';
import { SetActionType } from '../../../../../DataExploration/components/SetsManagementDropdown';

interface OwnProps {
  visible?: boolean;
  onCancel: () => void;
  set: IUserSetOutput;
}

const FILTER_NAME_MAX_LENGTH = 50;

const EditModal = ({ visible = false, onCancel, set }: OwnProps) => {
  const dispatch = useDispatch();
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
            dispatch(
              updateSavedSet({
                onCompleteCb(): void {},
                id: set.id,
                subAction: SetActionType.RENAME_TAG,
                newTag: value.title,
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
              label={intl.get('components.savedSets.modal.edit.input.label')}
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
