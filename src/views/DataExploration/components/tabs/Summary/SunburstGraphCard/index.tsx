import { ISyntheticSqon } from "@ferlab/ui/core/data/sqon/types";
import { isNotEmptySqon } from "@ferlab/ui/core/data/sqon/utils";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import { Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { TreeNode } from "./OntologyTree";
import { PhenotypeStore } from "./PhenotypeStore";
import { ResponsiveSunburst } from "@nivo/sunburst";

interface OwnProps {
  className?: string;
  sqon: ISyntheticSqon;
}

const { Title } = Typography;

const SunburstGraphCard = ({ className = "", sqon }: OwnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TreeNode[]>([]);
  const phenotypeStore = useRef(new PhenotypeStore());

  useEffect(() => {
    if (isNotEmptySqon(sqon)) {
      setIsLoading(true);
      phenotypeStore.current.fetch("observed_phenotype", sqon).then(() => {
        setData(phenotypeStore.current.getTree());
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(sqon)]);

  return (
    <GridCard
      wrapperClassName={className}
      theme="shade"
      loadingType="spinner"
      loading={isLoading}
      title={<Title level={4}>Chart title 2</Title>}
      content={
        <div style={{ height: "350px" }}>
          <ResponsiveSunburst
            id="key"
            data={data.length ? data[0] : []}
            value={"valueText"}
          />
        </div>
      }
    />
  );
};

export default SunburstGraphCard;
