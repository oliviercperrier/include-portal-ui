import { Col, Row } from 'antd';
import useApi from 'hooks/useApi';
import { ARRANGER_API_PROJECT_URL } from 'provider/ApolloProvider';
import { DATATYPE_QUERY, DEMOGRAPHIC_QUERY, DATA_CATEGORY_QUERY } from 'graphql/summary/queries';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import DemographicsGraphCard from './DemographicGraphCard';
import DataCategoryGraphCard from './DataCategoryGraphCard';
import DataTypeGraphCard from './DataTypeGraphCard';
import SunburstGraphCard from './SunburstGraphCard';

import styles from './index.module.scss';

interface OwnProps {
  sqon: ISqonGroupFilter;
}

const SummaryTab = ({ sqon }: OwnProps) => {
  const { loading, result } = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: [
        {
          query: DEMOGRAPHIC_QUERY,
          variables: { sqon },
        },
        {
          query: DATATYPE_QUERY,
          variables: { sqon },
        },
        {
          query: DATA_CATEGORY_QUERY,
          variables: { sqon },
        },
      ],
    },
  });

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={6}>
        <DemographicsGraphCard
          loading={loading}
          className={styles.summaryGrapCard}
          data={result ? result[0] : null}
        />
      </Col>
      <Col xs={24} md={18}>
        <SunburstGraphCard className={styles.summaryGrapCard} sqon={sqon} />
      </Col>
      <Col span={12}>
        <DataCategoryGraphCard
          loading={loading}
          className={styles.summaryGrapCard}
          data={result ? result[2] : null}
        />
      </Col>
      <Col span={12}>
        <DataTypeGraphCard
          loading={loading}
          className={styles.summaryGrapCard}
          data={result ? result[1] : null}
        />
      </Col>
    </Row>
  );
};

export default SummaryTab;
