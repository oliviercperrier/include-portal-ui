import React from 'react';
import { Row, Col } from 'antd';
import {
  ExperimentOutlined,
  FileTextOutlined,
  ReadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import LinkBox from './LinkBox';
import { STATIC_ROUTES } from 'utils/routes';
import intl from 'react-intl-universal';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import CardHeader from 'views/Dashboard/components/CardHeader';

import styles from './index.module.scss';

const DataExplorationLinks = ({ id, className = '' }: DashboardCardProps) => {
  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={<CardHeader id={id} title="Data Exploration" />}
      content={
        <Row gutter={[16, 16]}>
          <Col flex="auto" className={styles.customCol}>
            <LinkBox
              title={intl.get('screen.dashboard.links.studies')}
              icon={<ReadOutlined />}
              href={STATIC_ROUTES.STUDIES}
            />
          </Col>
          <Col flex="auto" className={styles.customCol}>
            <LinkBox
              title={intl.get('screen.dashboard.links.participants')}
              icon={<UserOutlined />}
              href={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
            />
          </Col>
          <Col flex="auto" className={styles.customCol}>
            <LinkBox
              title={intl.get('screen.dashboard.links.biospecimens')}
              icon={<ExperimentOutlined />}
              href={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
            />
          </Col>
          <Col flex="auto" className={styles.customCol}>
            <LinkBox
              title={intl.get('screen.dashboard.links.datafiles')}
              icon={<FileTextOutlined />}
              href={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default DataExplorationLinks;
