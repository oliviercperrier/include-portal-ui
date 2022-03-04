import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Col, Row, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
  generateNavTreeFormKey,
  PhenotypeStore,
  RegexExtractPhenotype,
} from 'views/DataExploration/utils/PhenotypeStore';
import { lightTreeNodeConstructor, TreeNode } from 'views/DataExploration/utils/OntologyTree';

import intl from 'react-intl-universal';
import SunburstD3 from './utils/sunburst-d3';
import { getCommonColors } from 'common/charts';
import TreePanel from 'views/DataExploration/components/tabs/Summary/SunburstGraphCard/TreePanel';
import { extractPhenotypeTitleAndCode } from 'views/DataExploration/utils/helper';

import styles from './index.module.scss';

interface OwnProps {
  className?: string;
  sqon: ISyntheticSqon;
}

const { Title } = Typography;
const width = 335;
const height = 335;

const SunburstGraphCard = ({ className = '', sqon }: OwnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [treeData, setTreeData] = useState<TreeNode[]>();
  const [currentNode, setCurrentNode] = useState<TreeNode>();
  const phenotypeStore = useRef(new PhenotypeStore());
  const sunburstRef = useRef<SVGSVGElement>(null);
  const updateSunburst = useRef<(key: any) => void>();

  useEffect(() => {
    setIsLoading(true);
    phenotypeStore.current.fetch('observed_phenotype', sqon).then(() => {
      const rootNode = phenotypeStore.current.getRootNode()!;
      setCurrentNode(rootNode);
      setTreeData([lightTreeNodeConstructor(rootNode?.key)]);
      setIsLoading(false);

      updateSunburst.current = SunburstD3(
        sunburstRef,
        rootNode,
        {
          depth: 2,
          width: width,
          height: height,
          colors: getCommonColors(),
        },
        getSelectedPhenotype,
        {
          centerTitleFormatter: (data: TreeNode) => data.results,
          centerSubtitleFormatter: (data: TreeNode) => 'Participants with',
          centerDescriptionFormatter: (data: TreeNode) =>
            `HP:${extractPhenotypeTitleAndCode(data.title!)?.code}`,
          tooltipFormatter: (data: TreeNode) =>
            `<div>
              ${data.title}<br/><br/>
              Participants: <strong>${data.results}</strong>
            </div>`,
        },
      );
    });
    // eslint-disable-next-line
  }, [JSON.stringify(sqon)]);

  const getSelectedPhenotype = (node: TreeNode) => {
    const phenoReversed = (node.key.match(RegexExtractPhenotype) || []).reverse();
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
          {intl.get('screen.dataExploration.tabs.summary.observedPhenotype.cardTitle')}
        </Title>
      }
      content={
        <Row gutter={[24, 24]} id="tooltip-wrapper">
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
            <TreePanel
              currentNode={currentNode!}
              treeData={treeData!}
              getSelectedPhenotype={getSelectedPhenotype}
              updateSunburst={updateSunburst.current!}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default SunburstGraphCard;
