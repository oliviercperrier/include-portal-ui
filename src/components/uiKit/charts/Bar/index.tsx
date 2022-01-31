import { ResponsiveBar, BarSvgProps, BarDatum } from "@nivo/bar";
import { Typography } from "antd";

import styles from "./index.module.scss";

type OwnProps = Omit<BarSvgProps<BarDatum>, "width" | "height"> & {
  title?: string;
  height: number;
};

const { Title } = Typography;

const BarChart = ({ title, height, ...rest }: OwnProps) => {
  return (
    <div className={styles.barChartWrapper}>
      {title && <Title level={5}>{title}</Title>}
      <div className={styles.chartWrapper} style={{ height: height }}>
        <ResponsiveBar {...rest} />
      </div>
    </div>
  );
};

export default BarChart;
