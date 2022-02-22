import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, List, Modal, Space, Tag, TreeSelect, Typography } from 'antd';
import { ITableFileEntity } from 'graphql/files/models';
import { groupBy } from 'lodash';
import { LegacyDataNode } from 'rc-tree-select/lib/TreeSelect';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CavaticaApi } from 'services/api/cavatica';
import { useCavatica } from 'store/cavatica';
import { cavaticaActions } from 'store/cavatica/slice';
import { fetchAllProjects } from 'store/cavatica/thunks';
import { ICavaticaTreeNode } from 'store/cavatica/types';

import styles from './index.module.scss';

const { Text } = Typography;

const AnalyseModal = () => {
  const { isAnalyseModalOpen, projectsTree, isLoading, filesToCopy, newlyCreatedProjectId } =
    useCavatica();
  const dispatch = useDispatch();
  const [filesDest, setFilesDest] = useState<string | undefined>();
  const [localProjectTree, setLocalProjectTree] = useState<ICavaticaTreeNode[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onChange = (value: string) => setFilesDest(value);

  const handleOnCancel = () => {
    setLocalProjectTree(projectsTree);
    setFilesDest(undefined);
    dispatch(cavaticaActions.cancelAnalyse());
  };

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

  useEffect(() => {
    // TODO Check if connected
    dispatch(fetchAllProjects());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLocalProjectTree(projectsTree);
  }, [projectsTree]);

  useEffect(() => {
    if (newlyCreatedProjectId) {
      setFilesDest(newlyCreatedProjectId);
    }
  }, [newlyCreatedProjectId]);

  const onLoadData = async (node: LegacyDataNode) => {
    const { data } = await CavaticaApi.listFilesAndFolders(node.id, node.type === 'project');

    const childs =
      data?.items.map((child) => {
        let enrichedChild: any = {
          ...child,
          value: child.id,
          title: child.name,
          pId: node.id,
        };

        if (child.type === 'file') {
          enrichedChild.isLeaf = true;
        }
        return enrichedChild;
      }) || [];

    setLocalProjectTree([...localProjectTree, ...childs]);
  };

  const aggregateFilesToStudy = (filesToCopy: ITableFileEntity[]) =>
    Object.entries(groupBy(filesToCopy, 'study_id')).map((study) => ({
      title: study[0],
      nbFiles: study[1].length,
    }));

  return (
    <Modal
      title="Analyse in Cavatica"
      visible={isAnalyseModalOpen}
      okText="Copy files"
      okButtonProps={{ disabled: !filesDest }}
      onCancel={handleOnCancel}
      className={styles.cavaticaAnalyseModal}
      wrapClassName={styles.cavaticaModalWrapper}
      destroyOnClose
    >
      <Space direction="vertical" size={24}>
        <Space direction="vertical" size={5} className={styles.treeSelectorWrapper}>
          <Text strong>Copy files to...</Text>
          <TreeSelect
            treeDataSimpleMode
            open={dropdownOpen}
            showAction={['focus']}
            className={styles.treeSelector}
            loading={isLoading}
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
            onChange={onChange}
            loadData={onLoadData}
            treeData={localProjectTree}
            dropdownRender={(menu) => (
              <>
                <div className={styles.cavaticaTreeDropdownMenu}>{menu}</div>
                {localProjectTree.length > 0 && (
                  <>
                    <Divider className={styles.cavaticaTreeDropdownDivider} />
                    <div className={styles.cavaticaTreeDropdownFooter}>
                      <NewProjectButton />
                    </div>
                  </>
                )}
              </>
            )}
          />
        </Space>
        <Text>
          <Text>You are authorized to copy</Text>{' '}
          <Tag className={styles.authorizedFilesTag} icon={<FileTextOutlined />}>
            8 files
          </Tag>{' '}
          <Text>(out of {filesToCopy.length} selected) to your Cavatica workspace.</Text>
        </Text>
        <List
          size="small"
          className={styles.studiesList}
          dataSource={aggregateFilesToStudy(filesToCopy)}
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
