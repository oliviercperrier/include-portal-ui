import { Button, Checkbox, Form, Space, Typography } from "antd";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import ScrollContent from "@ferlab/ui/core/layout/ScrollContent";
import { ArrowRightOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

const { Title, Text } = Typography;

const TermsStep = () => {
  const [form] = Form.useForm();

  return (
    <Space
      direction="vertical"
      size={24}
      className={styles.termsAndConditionsWrapper}
    >
      <Title level={3}>{intl.get("screen.join.title")}</Title>
      <Text>{intl.get("screen.join.description")}</Text>
      <GridCard
        className={styles.card}
        title={
          <div className={styles.termsCardHeader}>
            <span className={styles.title}>
              {intl.get("screen.join.terms.title")}
            </span>
            <span className={styles.lastUpdateDate}>
              {intl.get("screen.join.terms.lastUpdate", {
                date: "07/11/2021",
              })}
            </span>
          </div>
        }
        content={
          <ScrollContent className={styles.termsListWrapper}>
            <ul className={styles.termsList}>
              <li>{intl.get("screen.join.terms.bullets.1")}</li>
              <li>{intl.get("screen.join.terms.bullets.2")}</li>
              <li>{intl.get("screen.join.terms.bullets.3")}</li>
              <li>{intl.get("screen.join.terms.bullets.4")}</li>
              <li>{intl.get("screen.join.terms.bullets.5")}</li>
            </ul>
          </ScrollContent>
        }
      />
      <GridCard
        className={styles.card}
        title={intl.get("screen.join.disclaimer.title")}
        content={
          <ul className={styles.termsList}>
            <li>{intl.get("screen.join.disclaimer.bullets.1")}</li>
            <li>{intl.get("screen.join.disclaimer.bullets.2")}</li>
            <li>{intl.get("screen.join.disclaimer.bullets.3")}</li>
          </ul>
        }
      />
      <Form
        form={form}
        className={styles.checkboxForm}
        onFinish={(values) => console.log(values)}
      >
        <Form.Item
          className={styles.checkboxItem}
          name="checkoxGroup"
          rules={[
            {
              validator: async (rule, value: string[]) => {
                return value.length == 2
                  ? Promise.resolve()
                  : Promise.reject(intl.get("screen.join.errors"));
              },
            },
          ]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value="accepted_terms">
                {intl.get("screen.join.terms.checkbox")}
              </Checkbox>
              <Checkbox value="understand_disclaimer">
                {intl.get("screen.join.disclaimer.checkbox")}
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </Form>
      <Space className={styles.checkboxFormFooter}>
        <Button>{intl.get("screen.join.cancel")}</Button>
        <Button
          type="primary"
          className="iconRight"
          onClick={() => form.submit()}
        >
          {intl.get("screen.join.next")} <ArrowRightOutlined />
        </Button>
      </Space>
    </Space>
  );
};

export default TermsStep;
