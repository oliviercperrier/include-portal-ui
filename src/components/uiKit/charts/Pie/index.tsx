import { ResponsivePie, PieSvgProps, DefaultRawDatum } from "@nivo/pie";
import { Typography } from "antd";

import styles from "./index.module.scss";

type OwnProps = Omit<PieSvgProps<DefaultRawDatum>, "width" | "height"> & {
  title?: string;
  height: number;
};

const { Title } = Typography;

const PieChart = ({
  title,
  height,
  enableArcLabels = false,
  enableArcLinkLabels = false,
  ...rest
}: OwnProps) => {
  return (
    <div className={styles.pieChartWrapper}>
      {title && <Title level={5}>{title}</Title>}
      <div className={styles.chartWrapper} style={{ height: height }}>
        <ResponsivePie
          enableArcLabels={enableArcLabels}
          enableArcLinkLabels={enableArcLinkLabels}
          {...rest}
        />
      </div>
    </div>
  );
};

export default PieChart;
