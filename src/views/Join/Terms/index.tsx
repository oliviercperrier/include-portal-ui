import { Button, Checkbox, Form, Space, Typography } from "antd";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import ScrollContent from "@ferlab/ui/core/layout/ScrollContent";
import { ArrowRightOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";
import { useDispatch } from "react-redux";
import { updateUser } from "store/user/thunks";
import history from "utils/history";

import styles from "./index.module.scss";
import { STATIC_ROUTES } from "utils/routes";
import { useUser } from "store/user";
import { TUser } from "services/api/user/models";

enum FORM_FIELDS {
  CHECKBOXES = "checkboxes",
}

const { Title, Text } = Typography;

const TermsStep = () => {
  const { user, isUpdating } = useUser();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const getInitialValues = (user: TUser) => {
    let value = [];
    if (user?.accepted_terms) {
      value.push("accepted_terms");
    }
    if (user?.understand_disclaimer) {
      value.push("understand_disclaimer");
    }
    return value;
  };

  return (
    <Space
      direction="vertical"
      size={24}
      className={styles.termsAndConditionsWrapper}
    >
      <Title level={3}>{intl.get("screen.join.disclaimers.title")}</Title>
      <Text>{intl.get("screen.join.disclaimers.description")}</Text>
      <GridCard
        className={styles.card}
        title={
          <div className={styles.termsCardHeader}>
            <span className={styles.title}>
              {intl.get("screen.join.disclaimers.terms.title")}
            </span>
            <span className={styles.lastUpdateDate}>
              {intl.get("screen.join.disclaimers.terms.lastUpdate", {
                date: "07/11/2021",
              })}
            </span>
          </div>
        }
        content={
          <ScrollContent className={styles.termsListWrapper}>
            <ul className={styles.termsList}>
              <li>{intl.get("screen.join.disclaimers.terms.bullets.1")}</li>
              <li>{intl.get("screen.join.disclaimers.terms.bullets.2")}</li>
              <li>{intl.get("screen.join.disclaimers.terms.bullets.3")}</li>
              <li>{intl.get("screen.join.disclaimers.terms.bullets.4")}</li>
              <li>{intl.get("screen.join.disclaimers.terms.bullets.5")}</li>
            </ul>
          </ScrollContent>
        }
      />
      <GridCard
        className={styles.card}
        title={intl.get("screen.join.disclaimers.disclaimer.title")}
        content={
          <ul className={styles.termsList}>
            <li>{intl.get("screen.join.disclaimers.disclaimer.bullets.1")}</li>
            <li>{intl.get("screen.join.disclaimers.disclaimer.bullets.2")}</li>
            <li>{intl.get("screen.join.disclaimers.disclaimer.bullets.3")}</li>
          </ul>
        }
      />
      <Form
        form={form}
        className={styles.checkboxForm}
        fields={[
          {
            name: [FORM_FIELDS.CHECKBOXES],
            value: getInitialValues(user!),
          },
        ]}
        onFinish={() => {
          const onComplete = () => {
            history.push(STATIC_ROUTES.JOIN_REGISTRATION);
          };

          if (!user?.accepted_terms || !user?.understand_disclaimer) {
            dispatch(
              updateUser({
                data: {
                  accepted_terms: true,
                  understand_disclaimer: true,
                  consent_date: new Date(),
                },
                callback: onComplete,
              })
            );
          } else {
            onComplete();
          }
        }}
      >
        <Form.Item
          className={styles.checkboxItem}
          name={FORM_FIELDS.CHECKBOXES}
          rules={[
            {
              validator: async (rule, value: string[]) => {
                return value?.length === 2
                  ? Promise.resolve()
                  : Promise.reject(intl.get("screen.join.disclaimers.errors"));
              },
            },
          ]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value={"accepted_terms"}>
                {intl.get("screen.join.disclaimers.terms.checkbox")}
              </Checkbox>
              <Checkbox value={"understand_disclaimer"}>
                {intl.get("screen.join.disclaimers.disclaimer.checkbox")}
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
          loading={isUpdating}
          onClick={() => form.submit()}
        >
          {intl.get("screen.join.next")} <ArrowRightOutlined />
        </Button>
      </Space>
    </Space>
  );
};

export default TermsStep;
