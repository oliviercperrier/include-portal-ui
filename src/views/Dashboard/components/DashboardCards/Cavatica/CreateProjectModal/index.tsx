import Empty from '@ferlab/ui/core/components/Empty';
import { Form, Input, Modal, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCavatica } from 'store/cavatica';
import { cavaticaActions } from 'store/cavatica/slice';
import { createProjet, fetchAllBillingGroups } from 'store/cavatica/thunks';
import intl from 'react-intl-universal';

import styles from './index.module.scss';

const { Text } = Typography;

interface OwnProps {
  openAnalyseModalOnClose?: boolean;
  showSuccessNotification?: boolean;
  showErrorNotification?: boolean;
}

enum FORM_FIELDS {
  PROJECT_NAME = 'project_name',
  PROJECT_BILLING_GROUP = 'project_billing_group',
}

const CreateProjectModal = ({
  openAnalyseModalOnClose = true,
  showSuccessNotification = false,
  showErrorNotification = true,
}: OwnProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isFormValid, setFormValid] = useState(false);
  const { isCreateProjectModalOpen, isFetchingBillingGroup, billingGroups, isCreatingProject } =
    useCavatica();
  const handleOnCancel = () => {
    form.resetFields();
    setFormValid(false);
    dispatch(cavaticaActions.cancelCreateProject(openAnalyseModalOnClose));
  };

  const handleOnOk = () => {
    form.submit();
  };

  useEffect(() => {
    dispatch(fetchAllBillingGroups());
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      title="New project"
      visible={isCreateProjectModalOpen}
      okText="Create project"
      okButtonProps={{ disabled: !isFormValid, loading: isCreatingProject }}
      onOk={handleOnOk}
      onCancel={handleOnCancel}
      className={styles.cavaticaCreateProjectModal}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          dispatch(
            createProjet({
              showErrorNotification,
              showSuccessNotification,
              openAnalyseModalOnDone: openAnalyseModalOnClose,
              body: {
                billing_group: values[FORM_FIELDS.PROJECT_BILLING_GROUP],
                name: values[FORM_FIELDS.PROJECT_NAME],
              },
            }),
          );
        }}
        onFieldsChange={(f) => setFormValid(!f.some((item) => item.errors!.length > 0))}
        validateMessages={{
          required: intl.get('global.forms.errors.requiredField'),
        }}
        fields={[
          {
            name: [FORM_FIELDS.PROJECT_BILLING_GROUP],
            value: billingGroups.length === 1 ? billingGroups[0].id : undefined,
          },
        ]}
      >
        <Form.Item
          name={FORM_FIELDS.PROJECT_NAME}
          label={<Text strong>Project name</Text>}
          rules={[{ required: true, type: 'string' }]}
          required={false}
        >
          <Input placeholder="ex: Lorem ipsum dolor"></Input>
        </Form.Item>
        <Form.Item
          name={FORM_FIELDS.PROJECT_BILLING_GROUP}
          label={<Text strong>Project billing group</Text>}
          rules={[{ required: true, type: 'string' }]}
          required={false}
          className={styles.billingGroupItem}
        >
          <Select
            placeholder="Select"
            notFoundContent={
              <Empty showImage={false} description={'You have no project billing group'} />
            }
            loading={isFetchingBillingGroup}
          >
            {billingGroups.map((billingGroup) => (
              <Select.Option key={billingGroup.id} value={billingGroup.id}>
                {billingGroup.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
