import Empty from '@ferlab/ui/core/components/Empty';
import { Input, Modal, Select, Space, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCavatica } from 'store/cavatica';
import { cavaticaActions } from 'store/cavatica/slice';

import styles from './index.module.scss';

const { Text } = Typography;

interface OwnProps {
  openAnalyseModalOnCancel?: boolean;
}

const CreateProjectModal = ({ openAnalyseModalOnCancel = true }: OwnProps) => {
  const { isCreateProjectModalOpen } = useCavatica();
  const dispatch = useDispatch();
  const [name, setName] = useState(undefined);
  const [billingGroup, setBillingGroup] = useState(undefined);

  const onNameChange = (e: any) => setName(e.target.value);
  const onBillingGroupChange = (e: any) => setBillingGroup(e.target.value);
  const handleOnCancel = () => {
    setName(undefined);
    setBillingGroup(undefined);
    dispatch(cavaticaActions.cancelCreateProject(openAnalyseModalOnCancel));
  };

  return (
    <Modal
      title="New project"
      visible={isCreateProjectModalOpen}
      okText="Create project"
      okButtonProps={{ disabled: !name || !billingGroup }}
      onCancel={handleOnCancel}
      className={styles.cavaticaCreateProjectModal}
    >
      <Space direction="vertical" size={24} className={styles.createProjectWrapper}>
        <Space direction="vertical" size={5} className={styles.projectNameWrapper}>
          <Text strong>Project name</Text>
          <Input placeholder="ex: Lorem ipsum dolor" value={name} onChange={onNameChange}></Input>
        </Space>
        <Space direction="vertical" size={5} className={styles.projectBillingWrapper}>
          <Text strong>Project billing group</Text>
          <Select
            style={{ width: '100%' }}
            placeholder="Select"
            value={billingGroup}
            onChange={onBillingGroupChange}
            notFoundContent={
              <Empty showImage={false} description={'You have no project billing group'} />
            }
          ></Select>
        </Space>
      </Space>
    </Modal>
  );
};

export default CreateProjectModal;
