import { Col, Row } from 'antd';
import { RawAggregation } from 'graphql/models';
import PieChart from 'components/uiKit/charts/Pie';
import { toChartData } from 'utils/charts';
import { SEX } from 'common/constants';
import intl from 'react-intl-universal';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { addFieldToActiveQuery } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { useHistory } from 'react-router-dom';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { ARRANGER_API_PROJECT_URL } from 'provider/ApolloProvider';
import { DEMOGRAPHIC_QUERY } from 'graphql/summary/queries';
import useApi from 'hooks/useApi';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';

import styles from "./index.module.scss";

interface OwnProps {
  id: string;
  className?: string;
}

const getSexColor = (sex: SEX) => {
  switch (sex.toLowerCase()) {
    case SEX.FEMALE:
      return '#ffadd2';
    case SEX.MALE:
      return '#adc6ff';
    default:
      return 'gray';
  }
};

const transformData = (results: RawAggregation) => {
  const aggs = results?.data?.participant?.aggregations;

  return {
    race: (aggs?.race.buckets || []).map(toChartData),
    sex: (aggs?.sex.buckets || []).map((sex) => ({
      color: getSexColor(sex.key as SEX),
      ...toChartData(sex),
    })),
    ethnicity: (aggs?.ethnicity.buckets || []).map(toChartData),
  };
};

const graphSetting = {
  height: 175,
  margin: {
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
  },
};

const addToQuery = (field: string, key: string, history: any) =>
  addFieldToActiveQuery({
    field,
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    history,
    index: INDEXES.PARTICIPANT,
  });

const DemographicsGraphCard = ({ id, className = '' }: OwnProps) => {
  const history = useHistory();
  const { sqon } = useParticipantResolvedSqon();
  const { loading, result } = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: {
        query: DEMOGRAPHIC_QUERY,
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
          title={intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle')}
          withHandle
        />
      }
      content={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.demographic.sexTitle')}
              data={result ? transformData(result).sex : []}
              onClick={(datum) => addToQuery('sex', datum.id as string, history)}
              {...graphSetting}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.demographic.raceTitle')}
              data={result ? transformData(result).race : []}
              onClick={(datum) => addToQuery('race', datum.id as string, history)}
              {...graphSetting}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.demographic.ethnicityTitle')}
              data={result ? transformData(result).ethnicity : []}
              onClick={(datum) => addToQuery('ethnicity', datum.id as string, history)}
              {...graphSetting}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default DemographicsGraphCard;
