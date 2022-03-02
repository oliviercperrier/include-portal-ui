import { Button, Space, Tree, Typography } from 'antd';
import { addFieldToActiveQuery } from 'utils/sqons';
import { TreeNode } from 'views/DataExploration/utils/OntologyTree';
import intl from 'react-intl-universal';
import { RegexExtractPhenotype } from '..';
import { INDEXES } from 'graphql/constants';
import { useHistory } from 'react-router-dom';

import styles from './index.module.scss';

interface OwnProps {
  currentNode: TreeNode;
  treeData: TreeNode[];
  getSelectedPhenotype: (node: TreeNode) => void;
  updateSunburst: (key: string) => void;
}

const { Title, Text } = Typography;

const getExpandedNode = (currentNode: TreeNode): string[] =>
  currentNode?.key.match(RegexExtractPhenotype) || [];

const getSelectedKeys = (currentNode: TreeNode): string[] =>
  [currentNode?.key.match(RegexExtractPhenotype)?.reverse()[0]!] || [];

const getPath = (node: string, treeNodes: TreeNode[], path: string[] = []): string[] => {
  const updatePath = [...path];
  const currentNodeText = treeNodes[0].key;
  updatePath.push(currentNodeText);
  if (node !== currentNodeText) {
    return getPath(node, treeNodes[0].children, updatePath);
  }
  return updatePath;
};

const TreePanel = ({ currentNode, treeData, getSelectedPhenotype, updateSunburst }: OwnProps) => {
  const history = useHistory();

  return (
    <Space direction="vertical" className={styles.phenotypeSunburstTree}>
      <Title level={5}>{currentNode?.name}</Title>
      <Text>
        {intl.get(
          'screen.dataExploration.tabs.summary.observedPhenotype.phenotypeTree.nbParticipant',
          {
            count: currentNode?.results,
          },
        )}
      </Text>
      <Button
        className={styles.addTermBtn}
        type="link"
        size="small"
        onClick={() => {
          addFieldToActiveQuery(
            'observed_phenotype.name',
            [currentNode?.title!],
            INDEXES.PARTICIPANT,
            history,
          );
        }}
      >
        {intl.get(
          'screen.dataExploration.tabs.summary.observedPhenotype.phenotypeTree.addTermToQuery',
        )}
      </Button>
      <Space className={styles.treeWrapper} direction="vertical" size={5}>
        <Text type="secondary">
          {intl.get(
            'screen.dataExploration.tabs.summary.observedPhenotype.phenotypeTree.currentPath',
          )}
        </Text>
        <Tree
          height={213}
          switcherIcon={<div />}
          selectedKeys={getSelectedKeys(currentNode!)}
          expandedKeys={getExpandedNode(currentNode!)}
          className={styles.phenotypeTree}
          treeData={treeData!}
          onSelect={(keys) => {
            if (keys.length) {
              const key = getPath(keys[0] as string, treeData!).join('-');
              getSelectedPhenotype({
                title: keys[0] as string,
                name: keys[0] as string,
                key,
                children: [],
                valueText: 0,
              });
              updateSunburst(key);
            } else {
              return {};
            }
          }}
        ></Tree>
      </Space>
    </Space>
  );
};

export default TreePanel;
