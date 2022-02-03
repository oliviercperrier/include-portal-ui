import { ISyntheticSqon } from "@ferlab/ui/core/data/sqon/types";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Badge, Button, Col, Row, Space, Tree, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { emptyNode, TreeNode } from "./OntologyTree";
import { PhenotypeStore } from "./PhenotypeStore";
import { ResponsiveSunburst, ComputedDatum } from "@nivo/sunburst";
import { useTheme } from "@nivo/core";
import intl from "react-intl-universal";
import { VisualType } from "@ferlab/ui/core/components/filters/types";
import { addFieldToActiveQuery } from "utils/sqons";
import { getCommonColors } from "common/charts";

import styles from "./index.module.scss";

interface OwnProps {
  className?: string;
  sqon: ISyntheticSqon;
}

const { Title, Text } = Typography;
const RegexExtractPhenotype = new RegExp(/([A-Z].+?\(HP:\d+\))/, "g");

const SunburstGraphCard = ({ className = "", sqon }: OwnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rootNode, setRootNode] = useState<TreeNode>();
  const [currentNode, setCurrentNone] = useState<TreeNode>();
  const phenotypeStore = useRef(new PhenotypeStore());

  useEffect(() => {
    setIsLoading(true);
    phenotypeStore.current.fetch("observed_phenotype", sqon).then(() => {
      setCurrentNone(phenotypeStore.current.getRootNode()!);
      setRootNode(phenotypeStore.current.getRootNode()!);
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, [JSON.stringify(sqon)]);

  const CustomTooltip = ({
    id,
    value,
    color,
    data,
    ...rest
  }: ComputedDatum<TreeNode>) => {
    const theme = useTheme();
    return (
      <div style={{ ...theme.tooltip.container, display: "flex" }}>
        <Badge color={color} />
        <Space direction="vertical" size={3}>
          {data.name}
          <strong>{data.results}</strong>
        </Space>
      </div>
    );
  };

  const flatten = (data: TreeNode[]): TreeNode[] =>
    data.reduce((acc: TreeNode[], item: TreeNode) => {
      if (item.children) {
        return [...acc, item, ...flatten(item.children)];
      }
      return [...acc, item];
    }, []);

  const findObject = (data: TreeNode[], name: string) =>
    data.find((searchedName) => searchedName.name === name);

  const CenteredMetric = ({ nodes, centerX, centerY }: any) => {
    return (
      <foreignObject
        textAnchor="middle"
        dominantBaseline="central"
        style={{ textAlign: "center" }}
        x={centerX - 50}
        y={centerY - 11}
        width="100"
        height="22"
      >
        <strong>{currentNode?.results}</strong>
      </foreignObject>
    );
  };

  const getExpandedNode = (currentNode: TreeNode) => {
    const keys = currentNode?.id.match(RegexExtractPhenotype) || [];
    keys.pop();
    return keys;
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
            <div style={{ height: "335px" }}>
              <ResponsiveSunburst
                id="id"
                data={currentNode || emptyNode}
                transitionMode="pushIn"
                value={"value"}
                tooltip={CustomTooltip}
                colors={getCommonColors()}
                childColor={{
                  from: "color",
                  modifiers: [["brighter", 0.1]],
                }}
                onClick={(clickedData) => {
                  const foundObject = findObject(
                    flatten(currentNode!.children),
                    (clickedData.data as TreeNode).key as string
                  );

                  if (foundObject && foundObject.children.length) {
                    setCurrentNone(foundObject);
                  }
                }}
                layers={["arcs", "arcLabels", CenteredMetric]}
              />
            </div>
          </Col>
          <Col lg={16} xl={14}>
            <Space
              direction="vertical"
              className={styles.phenotypeSunburstTree}
            >
              <Title level={5}>{currentNode?.name}</Title>
              <Text>
                {currentNode?.results} participants (including descendant terms
                on this path)
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
                Add term to active query
              </Button>
              <Space
                className={styles.treeWrapper}
                direction="vertical"
                size={5}
              >
                <Text type="secondary">Current Path</Text>
                <Tree
                  height={213}
                  switcherIcon={<div />}
                  selectedKeys={[currentNode?.key!]}
                  expandedKeys={getExpandedNode(currentNode!)}
                  className={styles.phenotypeTree}
                  treeData={rootNode ? [rootNode] : []}
                  onSelect={(keys, { node }: any) => {
                    setCurrentNone(node);
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
