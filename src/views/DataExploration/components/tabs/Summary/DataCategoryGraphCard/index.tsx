import { Typography } from 'antd';
import { RawAggregation } from 'graphql/models';
import { toChartData } from 'utils/charts';
import BarChart from 'components/uiKit/charts/Bar';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import intl from 'react-intl-universal';
import { truncateString } from 'utils/string';
import { addFieldToActiveQuery } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { useHistory } from 'react-router-dom';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import { isEmpty } from 'lodash';
import Empty from '@ferlab/ui/core/components/Empty';

interface OwnProps {
  className?: string;
  loading?: boolean;
  data: RawAggregation;
}

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
  addFieldToActiveQuery({
    field,
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    history,
    index: INDEXES.FILE,
  });

const DataCategoryGraphCard = ({ className = '', loading = false, data }: OwnProps) => {
  const history = useHistory();
  const dataCategoryResults = transformDataCategory(data);

  return (
    <GridCard
      wrapperClassName={className}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      title={
        <Title level={4}>
          {intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle')}
        </Title>
      }
      content={
        <>
          {isEmpty(dataCategoryResults) ? (
            <Empty />
          ) : (
            <BarChart
              title="Participants by Data Category"
              data={dataCategoryResults}
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
          )}
        </>
      }
    />
  );
};

export default DataCategoryGraphCard;
