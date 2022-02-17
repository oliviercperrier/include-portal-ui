import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Modal, Space, Tag, TreeSelect, Typography } from 'antd';
import { useEffect, useState } from 'react';

import styles from './index.module.scss';

const { Text } = Typography;
//const { TreeNode } = TreeSelect;

interface OwnProps {
  open: boolean;
  onCancel: () => void;
}

const AnalyseModal = ({ open, onCancel }: OwnProps) => {
  const [modalVisible, setModalVisible] = useState(open);
  const [value, setValue] = useState(undefined);

  const onChange = (value: any) => setValue(value);

  const handleOnCancel = () => {
    setModalVisible(false);
    onCancel();
  };

  useEffect(() => {
    setModalVisible(open);
  }, [open]);

  return (
    <Modal
      title="Analyse in Cavatica"
      visible={modalVisible}
      okText="Copy files"
      okButtonProps={{ disabled: true }}
      onCancel={handleOnCancel}
    >
      <ConfigProvider
        renderEmpty={() => (
          <Space direction="vertical" className={styles.treeSelectEmpty} align="center" size={16}>
            <Text type="secondary">Create a project to push your files to.</Text>
            <Button size="small" icon={<PlusOutlined />}>
              New project
            </Button>
          </Space>
        )}
      >
        <Space direction="vertical" size={24}>
          <Space direction="vertical" size={5} className={styles.treeSelectorWrapper}>
            <Text strong>Copy to file...</Text>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Select a project"
              allowClear
              treeDefaultExpandAll
              onChange={onChange}
            ></TreeSelect>
          </Space>
          <Text>
            <Text>You are authorized to copy</Text>{' '}
            <Tag className={styles.authorizedFilesTag} icon={<FileTextOutlined />}>
              8 files
            </Tag>{' '}
            <Text>(out of 45 selected) to your Cavatica workspace.</Text>
          </Text>
        </Space>
      </ConfigProvider>
    </Modal>
  );
};

export default AnalyseModal;
