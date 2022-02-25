import { ResponsivePie, PieSvgProps, DefaultRawDatum } from '@nivo/pie';
import { Typography } from 'antd';
import { getCommonColors } from 'common/charts';

import styles from './index.module.scss';

type OwnProps = Omit<PieSvgProps<DefaultRawDatum>, 'width' | 'height'> & {
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
          {...rest}
          colors={rest.colors || getCommonColors()}
          enableArcLabels={enableArcLabels}
          enableArcLinkLabels={enableArcLinkLabels}
          onMouseEnter={(_, e: any) => {
            if (rest.onMouseEnter) {
              rest.onMouseEnter(_, e);
            }
            e.target.style.cursor = 'pointer';
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
