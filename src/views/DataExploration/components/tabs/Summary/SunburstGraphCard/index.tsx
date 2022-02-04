import { ISyntheticSqon } from "@ferlab/ui/core/data/sqon/types";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Button, Col, Row, Space, Tree, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { lightTreeNodeConstructor, TreeNode } from "./OntologyTree";
import { generateNavTreeFormKey, PhenotypeStore } from "./PhenotypeStore";
import intl from "react-intl-universal";
import { VisualType } from "@ferlab/ui/core/components/filters/types";
import { addFieldToActiveQuery } from "utils/sqons";
import SunburstD3 from "./sunburst-d3";

import styles from "./index.module.scss";

interface OwnProps {
  className?: string;
  sqon: ISyntheticSqon;
}

const { Title, Text } = Typography;
const width = 335;
const height = 335;
const RegexExtractPhenotype = new RegExp(/([A-Z].+?\(HP:\d+\))/, "g");

const getExpandedNode = (currentNode: TreeNode): string[] =>
  currentNode?.key.match(RegexExtractPhenotype) || [];

const getSelectedKeys = (currentNode: TreeNode): string[] =>
  [currentNode?.key.match(RegexExtractPhenotype)?.reverse()[0]!] || [];

const getPath = (
  node: string,
  treeNodes: TreeNode[],
  path: string[] = []
): string[] => {
  const updatePath = [...path];
  const currentNodeText = treeNodes[0].key;
  updatePath.push(currentNodeText);
  if (node !== currentNodeText) {
    return getPath(node, treeNodes[0].children, updatePath);
  }
  return updatePath;
};

const SunburstGraphCard = ({ className = "", sqon }: OwnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [treeData, setTreeData] = useState<TreeNode[]>();
  const [currentNode, setCurrentNode] = useState<TreeNode>();
  const phenotypeStore = useRef(new PhenotypeStore());
  const sunburstRef = useRef<SVGSVGElement>(null);
  const updateSunburst = useRef<(key: any) => void>();

  useEffect(() => {
    setIsLoading(true);
    phenotypeStore.current.fetch("observed_phenotype", sqon).then(() => {
      const rootNode = phenotypeStore.current.getRootNode()!;
      setCurrentNode(rootNode);
      setTreeData([lightTreeNodeConstructor(rootNode?.key)]);
      setIsLoading(false);

      updateSunburst.current = SunburstD3(
        sunburstRef,
        phenotypeStore.current.getRootNode(),
        {
          depth: 2,
          width: width,
          height: height,
        },
        getSelectedPhenotype,
        {
          centerTextFormatter: (data: TreeNode) => `${data.results}`,
          tooltipFormatter: (data: TreeNode) =>
            `${data.results}\n\n${data.title}`,
        }
      );
    });
    // eslint-disable-next-line
  }, [JSON.stringify(sqon)]);

  const getSelectedPhenotype = (node: TreeNode) => {
    const phenoReversed = (
      node.key.match(RegexExtractPhenotype) || []
    ).reverse();
    setCurrentNode(node);
    setTreeData(generateNavTreeFormKey(phenoReversed));
  };

  return (
    <GridCard
      wrapperClassName={className}
      theme="shade"
      loadingType="spinner"
      loading={isLoading}
      title={
        <Title level={4}>
          {intl.get(
            "screen.dataExploration.tabs.summary.observedPhenotype.cardTitle"
          )}
        </Title>
      }
      content={
        <Row gutter={24}>
          <Col lg={8} xl={10}>
            <svg
              className={styles.sunburstChart}
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              ref={sunburstRef}
            />
          </Col>
          <Col lg={16} xl={14}>
            <Space
              direction="vertical"
              className={styles.phenotypeSunburstTree}
            >
              <Title level={5}>{currentNode?.name}</Title>
              <Text>
                {intl.get(
                  "screen.dataExploration.tabs.summary.observedPhenotype.phenotypeTree.nbParticipant",
                  {
                    count: currentNode?.results,
                  }
                )}
              </Text>
              <Button
                className={styles.addTermBtn}
                type="link"
                size="small"
                onClick={() => {
                  addFieldToActiveQuery(
                    "observed_phenotype.name",
                    {
                      count: 1,
                      key: currentNode?.name!,
                    },
                    VisualType.Checkbox
                  );
                }}
              >
                {intl.get(
                  "screen.dataExploration.tabs.summary.observedPhenotype.phenotypeTree.addTermToQuery"
                )}
              </Button>
              <Space
                className={styles.treeWrapper}
                direction="vertical"
                size={5}
              >
                <Text type="secondary">
                  {intl.get(
                    "screen.dataExploration.tabs.summary.observedPhenotype.phenotypeTree.currentPath"
                  )}
                </Text>
                {console.log(treeData)}
                <Tree
                  height={213}
                  switcherIcon={<div />}
                  selectedKeys={getSelectedKeys(currentNode!)}
                  expandedKeys={getExpandedNode(currentNode!)}
                  className={styles.phenotypeTree}
                  treeData={treeData!}
                  onSelect={(keys) => {
                    if (keys.length) {
                      const key = getPath(keys[0] as string, treeData!).join(
                        "-"
                      );
                      getSelectedPhenotype({
                        title: keys[0] as string,
                        key,
                        children: [],
                        valueText: 0,
                      });
                      updateSunburst.current!(key);
                    } else {
                      return {};
                    }
                  }}
                ></Tree>
              </Space>
            </Space>
          </Col>
        </Row>
      }
    />
  );
};

export default SunburstGraphCard;
