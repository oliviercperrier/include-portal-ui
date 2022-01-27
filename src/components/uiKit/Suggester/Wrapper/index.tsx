import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import { Col, Row, Tooltip, Typography } from "antd";

import styles from "./index.module.scss";

type SuggesterWrapperProps = {
  children: React.ReactNode;
  tooltipMessage: string;
  title: string;
};

const {Title} = Typography;

const SuggesterWrapper = (props: SuggesterWrapperProps) => {
  const { children, tooltipMessage, title } = props;

  return (
    <StackLayout vertical className={styles.autoCompleteContainer} fitContent>
      <div id={"anchor-search-bar"}>
        <Row gutter={5} className={styles.suggesterTitleWrapper}>
          <Col>
            <Title level={5} className={styles.searchTitle}>{title}</Title>
          </Col>
          <Col>
            <Tooltip
              align={{
                offset: [-12],
              }}
              placement="topLeft"
              title={tooltipMessage}
            >
              <InfoCircleOutlined className={styles.searchIconsDisabled} />
            </Tooltip>
          </Col>
        </Row>
        {children}
      </div>
    </StackLayout>
  );
};

export default SuggesterWrapper;
