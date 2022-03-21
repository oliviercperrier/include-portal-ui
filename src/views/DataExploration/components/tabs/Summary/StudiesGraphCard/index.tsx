import { RawAggregation } from 'graphql/models';
import PieChart from 'components/uiKit/charts/Pie';
import { toChartData } from 'utils/charts';
import intl from 'react-intl-universal';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { addFieldToActiveQuery } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { useHistory } from 'react-router-dom';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { ARRANGER_API_PROJECT_URL } from 'provider/ApolloProvider';
import { PARTICIPANT_BY_STUDIES_QUERY } from 'graphql/summary/queries';
import useApi from 'hooks/useApi';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';

import styles from './index.module.scss';

interface OwnProps {
  id: string;
  className?: string;
}

const transformData = (results: RawAggregation) =>
  (results?.data?.participant?.aggregations?.study_id.buckets || []).map(toChartData);

const addToQuery = (field: string, key: string, history: any) =>
  addFieldToActiveQuery({
    field,
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    history,
    index: INDEXES.PARTICIPANT,
  });

const StudiesGraphCard = ({ id, className = '' }: OwnProps) => {
  const history = useHistory();
  const { sqon } = useParticipantResolvedSqon();
  const { loading, result } = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: {
        query: PARTICIPANT_BY_STUDIES_QUERY,
        variables: { sqon },
      },
    },
  });

  return (
    <GridCard
      wrapperClassName={className}
      contentClassName={styles.graphContentWrapper}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      title={
        <CardHeader
          id={id}
          title={intl.get('screen.dataExploration.tabs.summary.availableData.studiesTitle')}
          withHandle
        />
      }
      content={
        <div className={styles.graphWrapper}>
          <PieChart
            data={result ? transformData(result) : []}
            onClick={(datum) => addToQuery('study_id', datum.id as string, history)}
            height={300}
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 20,
                itemTextColor: '#1c3863',
                itemDirection: 'left-to-right',
              },
            ]}
            enableArcLinkLabels={true}
            arcLinkLabel="value"
            margin={{
              top: 20,
              bottom: 12,
              left: 12,
              right: 12,
            }}
          />
        </div>
      }
    />
  );
};

export default StudiesGraphCard;
