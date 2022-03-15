import { Col, Row, Typography } from 'antd';
import { RawAggregation } from 'graphql/models';
import { toChartData } from 'utils/charts';
import BarChart from 'components/uiKit/charts/Bar';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import intl from 'react-intl-universal';
import { truncateString } from 'utils/string';
import { addFieldToActiveQuery } from 'utils/sqons';
import { INDEXES } from 'graphql/constants';
import { useHistory } from 'react-router-dom';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';

interface OwnProps {
  className?: string;
  loading?: boolean;
  dataTypeData: RawAggregation;
  dataCategoryData: RawAggregation;
}

const transformDataType = (results: RawAggregation) =>
  (results?.data?.participant?.aggregations?.files__data_type.buckets || []).map(toChartData);

const transformDataCategory = (results: RawAggregation) =>
  (results?.data?.participant?.aggregations?.files__data_category.buckets || []).map(toChartData);

const graphSetting: any = {
  height: 300,
  margin: {
    bottom: 45,
    left: 125,
  },
  enableLabel: false,
  layout: 'horizontal',
};

const { Title } = Typography;

const addToQuery = (field: string, key: string, history: any) =>
  addFieldToActiveQuery(field, [key], INDEXES.FILE, history);

const AvailableDataGraphCard = ({
  className = '',
  loading = false,
  dataTypeData,
  dataCategoryData,
}: OwnProps) => {
  const history = useHistory();

  return (
    <GridCard
      wrapperClassName={className}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      title={
        <Title level={4}>
          {intl.get('screen.dataExploration.tabs.summary.availableData.cardTitle')}
        </Title>
      }
      content={
        <Row gutter={[48, 24]}>
          <Col span={12}>
            <BarChart
              title="Participants by Data Category"
              data={transformDataCategory(dataCategoryData)}
              axisLeft={{
                legend: 'Data Category',
                legendPosition: 'middle',
                legendOffset: -120,
                format: (title: string) => truncateString(title, 15),
              }}
              tooltipLabel={(node) => node.data.id}
              axisBottom={{
                legend: '# of participants',
                legendPosition: 'middle',
                legendOffset: 35,
              }}
              onClick={(datum) => addToQuery('data_category', datum.indexValue as string, history)}
              {...graphSetting}
            />
          </Col>
          <Col span={12}>
            <BarChart
              title="Participants by Data Type"
              data={transformDataType(dataTypeData)}
              axisLeft={{
                legend: 'Data Types',
                legendPosition: 'middle',
                legendOffset: -120,
                format: (title: string) => truncateString(title, 15),
              }}
              tooltipLabel={(node) => node.data.id}
              axisBottom={{
                legend: '# of participants',
                legendPosition: 'middle',
                legendOffset: 35,
              }}
              onClick={(datum) =>
                addToQuery(
                  'data_type',
                  (datum.indexValue as string).toLowerCase() === 'no data'
                    ? ArrangerValues.missing
                    : (datum.indexValue as string),
                  history,
                )
              }
              {...graphSetting}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default AvailableDataGraphCard;
