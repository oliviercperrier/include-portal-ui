import CollapseLikeFacet from 'components/uiKit/FilterList/CollapseLikeFacet.tsx';
import { Modal, Spin, Transfer, Tree } from 'antd';
import intl from 'react-intl-universal';
import { useEffect, useRef, useState } from 'react';
import { TreeNode } from 'views/DataExploration/utils/OntologyTree';
import { PhenotypeStore } from 'views/DataExploration/utils/PhenotypeStore';

import styles from './index.module.scss';

const isChecked = (selectedKeys: string[], eventKey: string) =>
  selectedKeys.indexOf(eventKey) !== -1;

const HpoTreeFacet = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const phenotypeStore = useRef(new PhenotypeStore());
  const [rootNode, setRootNode] = useState<TreeNode>();
  const [treeData, setTreeData] = useState<TreeNode>();

  const onChange = (keys: string[]) => {
    setTargetKeys(keys);
  };

  const getFlattenTree = (root: TreeNode) => {
    const transferDataSource: TreeNode[] = [];
    const flatten = (list: TreeNode[] = []) => {
      list.forEach((item) => {
        transferDataSource.push(item);
        flatten(item.children);
      });
    };
    flatten([root]);
    return transferDataSource;
  };

  const generateTree = (
    treeNodes: TreeNode[] = [],
    checkedKeys: string[] = [],
    disabledTree: boolean = false,
  ): TreeNode[] =>
    treeNodes
      .map(({ children, ...props }) => {
        const isDisabled = checkedKeys.includes(props.key) || disabledTree;
        return {
          ...props,
          name: <span className="lol">{props.name}</span>,
          disabled: isDisabled,
          children: generateTree(children, checkedKeys, isDisabled),
        };
      })
      .filter((node) => (node.hidden ? false : !node.hidden));

  const searchInTree = (searchText: string, treeNode: TreeNode, hitTreeNodes: string[] = []) => {
    const cleanSearchText = searchText.replace(/[-/\\^$*+?.()|[\]{}]/g, '');
    const regex = new RegExp('\\b(\\w*' + cleanSearchText + '\\w*)\\b', 'gi');
    const text = treeNode.title;
    const result = text.search(regex) >= 0;
    let match = cleanSearchText === '' || result;

    if (treeNode.children.length > 0) {
      let matchChild = cleanSearchText === '' || false;
      treeNode.children.forEach((child: TreeNode) => {
        if (searchInTree(cleanSearchText, child, hitTreeNodes)) {
          matchChild = true;
        }
      });
      match = matchChild || match;
    }
    treeNode.hidden = !match;

    if (!treeNode.hidden) {
      hitTreeNodes.push(treeNode.key);
      if (result) {
        const [before, hit, after] = treeNode.title.split(regex);
        console.log(treeNode.title.split(regex));

        treeNode.name = (
          <span>
            {before}
            <div className={'highlight'} style={{ display: 'inherit' }}>
              {hit}
            </div>
            {after}
          </span>
        );
      }
    }
    return match;
  };

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
      phenotypeStore.current.fetch('observed_phenotype').then(() => {
        const rootNode = phenotypeStore.current.getRootNode()!;
        setTreeData(rootNode);
        setRootNode(rootNode);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [visible]);

  return (
    <>
      <CollapseLikeFacet
        title={intl.get('facets.observed_phenotype.name')}
        onClick={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        wrapClassName={styles.hpoTreeModalWrapper}
        className={styles.hpoTreeModal}
        title="Observed Phenotype (HPO) Browser"
        okText="Apply"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Transfer<TreeNode>
          className={styles.hpoTransfer}
          showSearch={true}
          targetKeys={targetKeys}
          selectedKeys={[]}
          onSearch={(direction, value) => {
            if (value && value.length > 3) {
              const hits: string[] = [];
              const tree = JSON.parse(JSON.stringify(treeData));
              const result = searchInTree(value, tree, hits);
              console.log(result);
              console.log(direction, value);
              setTreeData(tree);
            } else {
              setTreeData(rootNode);
            }
          }}
          filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1}
          onSelectChange={(s, t) => {
            setTargetKeys(
              targetKeys.filter((el) => {
                return !t.includes(el);
              }),
            );
          }}
          dataSource={treeData ? getFlattenTree(treeData) : []}
          render={(item) => item.title}
          onChange={onChange}
          showSelectAll={false}
          operationStyle={{ visibility: 'hidden', width: '5px' }}
        >
          {({ direction, onItemSelect, selectedKeys, dataSource }) => {
            if (direction === 'left') {
              const checkedKeys = [...selectedKeys, ...targetKeys];
              return (
                <Spin spinning={isLoading}>
                  <Tree
                    checkable
                    checkStrictly
                    expandedKeys={expandedKeys}
                    onExpand={(keys) => setExpandedKeys(keys as string[])}
                    checkedKeys={{
                      checked: checkedKeys,
                      halfChecked: [],
                    }}
                    titleRender={(node) => node.name}
                    treeData={treeData ? generateTree([treeData], checkedKeys) : []}
                    onCheck={(_, { node: { key } }) => {
                      onItemSelect(key.toString(), !isChecked(checkedKeys, key.toString()));
                      setTargetKeys([...checkedKeys, key as string]);
                    }}
                    onSelect={(_, { node: { key } }) => {
                      onItemSelect(key.toString(), !isChecked(checkedKeys, key.toString()));
                      setTargetKeys([...checkedKeys, key as string]);
                    }}
                  />
                </Spin>
              );
            }
          }}
        </Transfer>
      </Modal>
    </>
  );
};

export default HpoTreeFacet;
