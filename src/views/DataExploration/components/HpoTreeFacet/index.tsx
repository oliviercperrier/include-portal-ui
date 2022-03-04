import CollapseLikeFacet from 'components/uiKit/FilterList/CollapseLikeFacet.tsx';
import { Col, Modal, Row, Spin, Tooltip, Transfer, Tree } from 'antd';
import intl from 'react-intl-universal';
import { useEffect, useRef, useState } from 'react';
import { TreeNode } from 'views/DataExploration/utils/OntologyTree';
import { PhenotypeStore } from 'views/DataExploration/utils/PhenotypeStore';
import { addFieldToActiveQuery } from 'utils/sqons';
import { INDEXES } from 'graphql/constants';
import { useHistory } from 'react-router-dom';
import { BranchesOutlined, UserOutlined } from '@ant-design/icons';
import TreeNodeTitle from './TreeNodeTitle';

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
  const history = useHistory();

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
          name: (
            <TreeNodeTitle
              title={props.name}
              exactTagCount={props.exactTagCount || 0}
              totalCount={props.results || 0}
            />
          ),
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

  const findChildrenKey = (checkedKeys: string[], node: TreeNode[]): boolean =>
    node.some(
      ({ key, children }) => checkedKeys.includes(key) || findChildrenKey(checkedKeys, children),
    );

  const checkKeys = (
    key: string | number,
    dataSource = treeData ? [treeData] : [],
    accu: { check: string[]; halfcheck: string[] } = {
      check: [],
      halfcheck: [],
    },
  ) => {
    dataSource.forEach((o) => {
      if (o.key === key) {
        return accu.check.push(o.key);
      }

      if (accu.check.length === 0) {
        checkKeys(key, o.children, accu);

        if (accu.check.length > 0) {
          accu.halfcheck.push(o.key);
        }
      }
    });
    return accu;
  };

  const onCheckOrSelect = (
    onItemSelect: any,
    key: string,
    checkedKeys: string[],
    children: TreeNode[],
  ) => {
    const hasChildAlreadyChecked = findChildrenKey(checkedKeys, children);
    onItemSelect(key.toString(), !isChecked(checkedKeys, key.toString()));
    setTargetKeys(hasChildAlreadyChecked ? [key] : [...checkedKeys, key]);
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
        title={intl.get('screen.dataExploration.hpoTree.modal.title')}
        okText={intl.get('screen.dataExploration.hpoTree.modal.okText')}
        onOk={() => {
          const flatTreeData = getFlattenTree(treeData!);
          const results = flatTreeData
            .filter(({ key }) => targetKeys.includes(key))
            .map(({ title }) => title);

          addFieldToActiveQuery('observed_phenotype.name', results, INDEXES.PARTICIPANT, history);
          setVisible(false);
        }}
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
              searchInTree(value, tree, hits);
              setExpandedKeys(hits);
              setTreeData(tree);
            } else {
              setExpandedKeys([]);
              setTreeData(rootNode);
            }
          }}
          locale={{
            searchPlaceholder: intl.get('screen.dataExploration.hpoTree.searchPlaceholder'),
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
          {({ direction, onItemSelect, selectedKeys, onItemSelectAll }) => {
            if (direction === 'left') {
              const checkedKeys = [...selectedKeys, ...targetKeys];
              const halfCheckedKeys = checkedKeys
                .map((k) => checkKeys(k))
                .flatMap((k) => k.halfcheck);
              return (
                <Spin spinning={isLoading}>
                  <Row justify="space-between" className={styles.phenotypeTreeHeader}>
                    <Col></Col>
                    <Col>
                      <Row style={{ width: 100 }}>
                        <Col span={12} className={styles.phenotypeTreeCountTag}>
                          <Tooltip title={intl.get('screen.dataExploration.hpoTree.tags.exact')}>
                            <UserOutlined />
                          </Tooltip>
                        </Col>
                        <Col span={12} className={styles.phenotypeTreeCountTag}>
                          <Tooltip title={intl.get('screen.dataExploration.hpoTree.tags.all')}>
                            <BranchesOutlined />
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Tree
                    checkable
                    checkStrictly
                    height={600}
                    expandedKeys={expandedKeys}
                    onExpand={(keys) => setExpandedKeys(keys as string[])}
                    checkedKeys={{
                      checked: checkedKeys,
                      halfChecked: halfCheckedKeys,
                    }}
                    titleRender={(node) => node.name}
                    treeData={treeData ? generateTree([treeData], checkedKeys) : []}
                    onCheck={(_, { node: { key, children } }) =>
                      onCheckOrSelect(
                        onItemSelect,
                        key as string,
                        checkedKeys,
                        children as TreeNode[],
                      )
                    }
                    onSelect={(_, { node: { key, children } }) =>
                      onCheckOrSelect(
                        onItemSelect,
                        key as string,
                        checkedKeys,
                        children as TreeNode[],
                      )
                    }
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
