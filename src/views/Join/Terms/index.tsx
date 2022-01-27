import { Button, Checkbox, Form, Space, Typography } from "antd";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import ScrollContent from "@ferlab/ui/core/layout/ScrollContent";
import { ArrowRightOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";
import { useDispatch } from "react-redux";
import { updateUser } from "store/user/thunks";
import history from "utils/history";
import { STATIC_ROUTES } from "utils/routes";
import { useUser } from "store/user";
import { TUser } from "services/api/user/models";
import { userActions } from "store/user/slice";

import styles from "./index.module.scss";

enum FORM_FIELDS {
  CHECKBOXES = "checkboxes",
}

enum CHECKBOXES_OPTIONS {
  ACCEPTED_TERMS = "accepted_terms",
  UNDERSTAND_DISCLAIMER = "understand_disclaimer",
}

const { Title, Text } = Typography;

const TermsStep = () => {
  const { userInfo, isUpdating } = useUser();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const getInitialValues = (user: TUser) => {
    let value = [];
    if (user?.accepted_terms) {
      value.push(CHECKBOXES_OPTIONS.ACCEPTED_TERMS);
    }
    if (user?.understand_disclaimer) {
      value.push(CHECKBOXES_OPTIONS.UNDERSTAND_DISCLAIMER);
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
        wrapperClassName={styles.cardWrapper}
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
        wrapperClassName={styles.cardWrapper}
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
            value: getInitialValues(userInfo!),
          },
        ]}
        onFinish={() => {
          const onComplete = () => {
            history.push(STATIC_ROUTES.JOIN_REGISTRATION);
          };

          if (!userInfo?.accepted_terms || !userInfo?.understand_disclaimer) {
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
              <Checkbox value={CHECKBOXES_OPTIONS.ACCEPTED_TERMS}>
                {intl.get("screen.join.disclaimers.terms.checkbox")}
              </Checkbox>
              <Checkbox value={CHECKBOXES_OPTIONS.UNDERSTAND_DISCLAIMER}>
                {intl.get("screen.join.disclaimers.disclaimer.checkbox")}
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </Form>
      <Space className={styles.checkboxFormFooter}>
        <Button onClick={() => dispatch(userActions.cleanLogout())}>
          {intl.get("screen.join.cancel")}
        </Button>
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
