import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, List, Modal, Space, Tag, TreeSelect, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCavatica } from 'store/cavatica';
import { cavaticaActions } from 'store/cavatica/slice';

import styles from './index.module.scss';

const { Text } = Typography;
const { TreeNode } = TreeSelect;

const AnalyseModal = () => {
  const { isAnalyseModalOpen } = useCavatica();
  const dispatch = useDispatch();
  const [filesDest, setFilesDest] = useState(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onChange = (value: any) => setFilesDest(value);
  const handleOnCancel = () => dispatch(cavaticaActions.cancelAnalyse());
  const handleCreateProject = () => {
    setDropdownOpen(false);
    // Need a timeout else the dropdown stay visible
    // when the create project modal open
    setTimeout(() => {
      dispatch(cavaticaActions.beginCreateProject());
    }, 100);
  };

  const NewProjectButton = () => (
    <Button size="small" icon={<PlusOutlined />} onClick={handleCreateProject}>
      New project
    </Button>
  );

  return (
    <Modal
      title="Analyse in Cavatica"
      visible={isAnalyseModalOpen}
      okText="Copy files"
      okButtonProps={{ disabled: !filesDest }}
      onCancel={handleOnCancel}
      className={styles.cavaticaAnalyseModal}
      wrapClassName={styles.cavaticaModalWrapper}
    >
      <Space direction="vertical" size={24}>
        <Space direction="vertical" size={5} className={styles.treeSelectorWrapper}>
          <Text strong>Copy files to...</Text>
          <TreeSelect
            open={dropdownOpen}
            showAction={['focus']}
            className={styles.treeSelector}
            notFoundContent={
              <Space
                direction="vertical"
                className={styles.treeSelectEmpty}
                align="center"
                size={16}
              >
                <Text type="secondary">Create a project to push your files to.</Text>
                <NewProjectButton />
              </Space>
            }
            onDropdownVisibleChange={setDropdownOpen}
            showSearch
            value={filesDest}
            dropdownClassName={styles.cavaticaTreeDropdown}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Select a project"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            dropdownRender={(menu) => (
              <>
                <div className={styles.cavaticaTreeDropdownMenu}>{menu}</div>
                <Divider className={styles.cavaticaTreeDropdownDivider} />
                <div className={styles.cavaticaTreeDropdownFooter}>
                  <NewProjectButton />
                </div>
              </>
            )}
          >
            <TreeNode value="parent 1" title="parent 1">
              <TreeNode value="parent 1-0" title="parent 1-0">
                <TreeNode value="leaf1" title="leaf1" />
                <TreeNode value="leaf2" title="leaf2" />
              </TreeNode>
              <TreeNode value="parent 1-1" title="parent 1-1">
                <TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
              </TreeNode>
            </TreeNode>
          </TreeSelect>
        </Space>
        <Text>
          <Text>You are authorized to copy</Text>{' '}
          <Tag className={styles.authorizedFilesTag} icon={<FileTextOutlined />}>
            8 files
          </Tag>{' '}
          <Text>(out of 45 selected) to your Cavatica workspace.</Text>
        </Text>
        <List
          size="small"
          className={styles.filesList}
          dataSource={[
            {
              title:
                'Lorem ipsum dolor sit amet consectetur adipiscing minus tulic asdf asf asf asf s',
              nbFiles: 4,
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
              nbFiles: 7,
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit tortor',
              nbFiles: 3,
            },
          ]}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta description={item.title} />
                <Text type="secondary">
                  {item.nbFiles} <FileTextOutlined />
                </Text>
              </List.Item>
            );
          }}
        />
      </Space>
    </Modal>
  );
};

export default AnalyseModal;
