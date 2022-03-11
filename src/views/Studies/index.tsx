import ProTable from '@ferlab/ui/core/components/ProTable';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space, Typography } from 'antd';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { useStudies } from 'graphql/studies/actions';
import ApolloProvider from 'provider/ApolloProvider';
import { GraphqlBackend } from 'provider/types';
import { getProTableDictionary } from 'utils/translation';
import { createQueryParams } from '@ferlab/ui/core/data/filters/utils';
import { Link } from 'react-router-dom';
import { STATIC_ROUTES } from 'utils/routes';
import { IStudyEntity } from 'graphql/studies/models';
import { addFilters, generateValueFilter } from 'utils/sqons';
import { INDEXES } from 'graphql/constants';
import { CheckOutlined } from '@ant-design/icons';
import ExternalLink from 'components/uiKit/ExternalLink';

import styles from './index.module.scss';

const { Title } = Typography;

const columns: ProColumnType<any>[] = [
  {
    key: 'study_id',
    title: 'Study Code',
    dataIndex: 'study_id',
  },
  {
    key: 'study_name',
    title: 'Name',
    dataIndex: 'study_name',
    width: 500,
  },
  {
    key: 'program',
    title: 'Program',
    dataIndex: 'program',
  },
  {
    key: 'external_id',
    title: 'dbGaP',
    dataIndex: 'external_id',
    render: (external_id: string) => (
      <ExternalLink
        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${external_id}`}
      >
        {external_id}
      </ExternalLink>
    ),
  },
  {
    key: 'participant_count',
    title: 'Participants',
    render: (record: IStudyEntity) => {
      const participantCount = record.participant_count;

      return participantCount ? (
        <Link
          to={{
            pathname: STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS,
            search: createQueryParams({
              filters: addFilters(null, [
                generateValueFilter('study_id', [record.study_id], INDEXES.PARTICIPANT),
              ]),
            }),
          }}
        >
          {participantCount}
        </Link>
      ) : (
        participantCount || 0
      );
    },
  },
  {
    key: 'family_count',
    title: 'Families',
    dataIndex: 'family_count',
  },
  {
    key: 'clinical',
    title: 'Clinical',
    align: 'center',
  },
  {
    key: 'genomic',
    title: 'Genomic',
    align: 'center',
    render: () => <CheckOutlined />,
  },
  {
    key: 'transcriptomic',
    title: 'Transcriptomic',
    align: 'center',
  },
  {
    key: 'proteomic',
    title: 'Proteomic',
    align: 'center',
    render: () => <></>,
  },
  {
    key: 'immune_map',
    title: 'Immune Map',
    align: 'center',
    render: () => <></>,
  },
  {
    key: 'metabolic',
    title: 'Metabolomic',
    align: 'center',
    render: () => <></>,
  },
];

const Studies = () => {
  const { loading, data, total } = useStudies();

  return (
    <Space direction="vertical" size={16} className={styles.studiesWrapper}>
      <Title className={styles.title} level={4}>
        Studies
      </Title>
      <GridCard
        content={
          <ProTable
            tableId="studies"
            wrapperClassName={styles.tableWrapper}
            size="small"
            bordered
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
            headerConfig={{
              itemCount: {
                pageIndex: 1,
                pageSize: 20,
                total,
              },
            }}
            dictionary={getProTableDictionary()}
          />
        }
      />
    </Space>
  );
};

const StudiesWrapper = (props: any) => {
  return (
    <ApolloProvider backend={GraphqlBackend.ARRANGER}>
      <Studies {...props} />
    </ApolloProvider>
  );
};

export default StudiesWrapper;
