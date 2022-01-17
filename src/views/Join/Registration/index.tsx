import { Button, Checkbox, Form, Input, Radio, Space, Typography } from "antd";
import cx from "classnames";
import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";
import history from "utils/history";
import { STATIC_ROUTES } from "utils/routes";
import { useDispatch } from "react-redux";
import { completeRegistration } from "store/user/thunks";
import { useUser } from "store/user";
import { userActions } from "store/user/slice";

import styles from "./index.module.scss";

enum FORM_FIELDS {
  EXTERNAL_ID = "external_id",
  USER_ID = "user_id",
  FULL_NAME = "full_name",
  EXTERNAL_EMAIL = "external_email",
  ROLES = "roles",
  OTHER_ROLE = "other_role",
  AFFILIATION = "affiliation",
  NO_AFFILIATION = "no_affiliation",
  DATA_USAGE = "data_use",
  OTHER_DATA_USAGE = "other_data_use",
  RESEARCH_AREA = "reasearch_area",
}

enum EXTERNAL_ID_OPTIONS {
  ERA = "era",
  NIH = "nih",
  NO = "no",
}

const OTHER_KEY = "other";

const { Title } = Typography;

const RegistrationStep = () => {
  const { isUpdating } = useUser();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const validateMessages = {
    required: intl.get("global.forms.errors.requiredField"),
    types: {
      email: intl.get("global.forms.errors.enterValidEmail"),
    },
  };

  const removeOtherKey = (list: string[], otherValue: string) => {
    const listWithoutOtherKey = list.filter((value) => value !== OTHER_KEY);
    if (otherValue) {
      listWithoutOtherKey.push(otherValue);
    }
    return listWithoutOtherKey;
  };

  const roleOptions = [
    intl.get("screen.join.registration.roleOptions.1"),
    intl.get("screen.join.registration.roleOptions.2"),
    intl.get("screen.join.registration.roleOptions.3"),
    intl.get("screen.join.registration.roleOptions.4"),
    intl.get("screen.join.registration.roleOptions.5"),
    intl.get("screen.join.registration.roleOptions.6"),
  ];

  const usageOptions = [
    intl.get("screen.join.registration.usageOptions.1"),
    intl.get("screen.join.registration.usageOptions.2"),
    intl.get("screen.join.registration.usageOptions.3"),
  ];

  return (
    <Form
      form={form}
      className={styles.registrationForm}
      onFinish={(values) =>
        dispatch(
          completeRegistration({
            data: {
              era_commons_id:
                values[FORM_FIELDS.EXTERNAL_ID] === EXTERNAL_ID_OPTIONS.ERA
                  ? values[FORM_FIELDS.USER_ID]
                  : undefined,
              nih_ned_id:
                values[FORM_FIELDS.EXTERNAL_ID] === EXTERNAL_ID_OPTIONS.NIH
                  ? values[FORM_FIELDS.USER_ID]
                  : undefined,
              external_individual_fullname: values[FORM_FIELDS.FULL_NAME],
              external_individual_email: values[FORM_FIELDS.EXTERNAL_EMAIL],
              roles: removeOtherKey(
                values[FORM_FIELDS.ROLES],
                values[FORM_FIELDS.OTHER_ROLE]
              ),
              affiliation: values[FORM_FIELDS.AFFILIATION],
              research_area: values[FORM_FIELDS.RESEARCH_AREA],
              portal_usages: removeOtherKey(
                values[FORM_FIELDS.DATA_USAGE],
                values[FORM_FIELDS.OTHER_DATA_USAGE]
              ),
            },
            callback: () => history.push(STATIC_ROUTES.DASHBOARD),
          })
        )
      }
      layout="vertical"
      validateMessages={validateMessages}
    >
      <Title level={3} className={styles.subSectionTitle}>
        {intl.get("screen.join.registration.sections.identification")}
      </Title>
      <Form.Item
        name={FORM_FIELDS.EXTERNAL_ID}
        label={intl.get("screen.join.registration.labels.haveAUserID")}
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={EXTERNAL_ID_OPTIONS.ERA}>
              {intl.get("screen.join.registration.userIdOptions.1")}
            </Radio>
            <Radio value={EXTERNAL_ID_OPTIONS.NIH}>
              {intl.get("screen.join.registration.userIdOptions.2")}
            </Radio>
            <Radio value={EXTERNAL_ID_OPTIONS.NO}>
              {intl.get("screen.join.registration.userIdOptions.3")}
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.external_id !== currentValues.external_id
        }
      >
        {({ getFieldValue }) =>
          [EXTERNAL_ID_OPTIONS.ERA, EXTERNAL_ID_OPTIONS.NIH].includes(
            getFieldValue(FORM_FIELDS.EXTERNAL_ID)
          ) ? (
            <Form.Item
              className={cx(styles.withCustomHelp, styles.dynamicField)}
              label={intl.get("screen.join.registration.labels.enterUserId")}
              required
            >
              <span className={styles.help}>
                {intl.get("screen.join.registration.noticeNotPublicInfo")}
              </span>
              <Form.Item
                name={FORM_FIELDS.USER_ID}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.external_id !== currentValues.external_id
        }
      >
        {({ getFieldValue }) =>
          getFieldValue(FORM_FIELDS.EXTERNAL_ID) === EXTERNAL_ID_OPTIONS.NO ? (
            <div className={styles.dynamicField}>
              <span className={styles.help}>
                {intl.get("screen.join.registration.nameAndEmailOfIndividual")}
              </span>
              <Form.Item
                name={FORM_FIELDS.FULL_NAME}
                label={intl.get("screen.join.registration.labels.fullName")}
                rules={[{ required: true }]}
                className={styles.fullNameField}
              >
                <Input
                  placeholder={intl.get("screen.join.placeHolders.firstLast")}
                />
              </Form.Item>
              <Form.Item
                name={FORM_FIELDS.EXTERNAL_EMAIL}
                label={intl.get("screen.join.registration.labels.email")}
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  placeholder="name@domain.com"
                  suffix={<MailOutlined className={styles.iconSuffix} />}
                />
              </Form.Item>
            </div>
          ) : null
        }
      </Form.Item>
      <Title level={3} className={styles.subSectionTitle}>
        {intl.get("screen.join.registration.sections.roleAndAffiliation")}
      </Title>
      <Form.Item
        className={styles.withCustomHelp}
        name={FORM_FIELDS.ROLES}
        label={intl.get("screen.join.registration.labels.iAmA")}
        rules={[{ required: true }]}
      >
        <Checkbox.Group>
          <span className={styles.help}>
            {intl.get("screen.join.registration.helps.checkAllThatApply")}
          </span>
          <Space direction="vertical">
            {roleOptions.map((option, index) => (
              <Checkbox key={index} value={option}>
                {option}
              </Checkbox>
            ))}
            <Checkbox value={OTHER_KEY}>
              {intl.get("screen.join.registration.optionsOther")}
            </Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.roles !== currentValues.roles
        }
      >
        {({ getFieldValue }) =>
          getFieldValue(FORM_FIELDS.ROLES)?.includes(OTHER_KEY) ? (
            <Form.Item
              className={styles.dynamicField}
              name={FORM_FIELDS.OTHER_ROLE}
              label={intl.get("screen.join.registration.labels.pleaseDescribe")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.no_affiliation !== currentValues.no_affiliation
        }
      >
        {({ getFieldValue }) =>
          !getFieldValue(FORM_FIELDS.NO_AFFILIATION) ? (
            <Form.Item
              className={cx(styles.withCustomHelp, styles.affiliationField)}
              label={intl.get(
                "screen.join.registration.labels.iAmAffiliatedWith"
              )}
              required
            >
              <span className={styles.help}>
                {intl.get(
                  "screen.join.registration.helps.provideOrgAffiliation"
                )}
              </span>
              <Form.Item
                name={FORM_FIELDS.AFFILIATION}
                className={styles.noMargin}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.no_affiliation !== currentValues.no_affiliation
        }
      >
        {() => (
          <Form.Item
            name={FORM_FIELDS.NO_AFFILIATION}
            label={
              form.getFieldValue(FORM_FIELDS.NO_AFFILIATION)
                ? intl.get("screen.join.registration.labels.iAmAffiliatedWith")
                : ""
            }
            required
            className={cx(
              styles.withCustomHelp,
              form.getFieldValue(FORM_FIELDS.NO_AFFILIATION) &&
                styles.noAffiliationField
            )}
            rules={[{ required: false }]}
            valuePropName="checked"
          >
            <Checkbox>
              {intl.get("screen.join.registration.noAffiliationOption")}
            </Checkbox>
          </Form.Item>
        )}
      </Form.Item>
      <Title level={3} className={styles.subSectionTitle}>
        {intl.get("screen.join.registration.sections.researchAndDataUse")}
      </Title>
      <Form.Item
        className={styles.withCustomHelp}
        name={FORM_FIELDS.DATA_USAGE}
        label={intl.get("screen.join.registration.labels.intendToUser")}
        rules={[{ required: true }]}
      >
        <Checkbox.Group>
          <span className={styles.help}>
            {intl.get("screen.join.registration.helps.checkAllThatApply")}
          </span>
          <Space direction="vertical">
            {usageOptions.map((option, index) => (
              <Checkbox key={index} value={option}>
                {option}
              </Checkbox>
            ))}
            <Checkbox value={OTHER_KEY}>
              {intl.get("screen.join.registration.optionsOther")}
            </Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.data_use !== currentValues.data_use
        }
      >
        {({ getFieldValue }) =>
          getFieldValue(FORM_FIELDS.DATA_USAGE)?.includes(OTHER_KEY) ? (
            <Form.Item
              className={cx(styles.withCustomHelp, styles.dynamicField)}
              label={intl.get(
                "screen.join.registration.labels.dataUseStatement"
              )}
              required
            >
              <span className={styles.help}>
                {intl.get("screen.join.registration.helps.describeUseBelow")}
              </span>
              <Form.Item
                name={FORM_FIELDS.OTHER_DATA_USAGE}
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        className={cx(styles.withCustomHelp, styles.researchAreaField)}
        label={intl.get("screen.join.registration.labels.researchAreaDescribe")}
      >
        <span className={styles.help}>
          {intl.get("screen.join.registration.helps.provideBriefDescription")}
        </span>
        <Form.Item name={FORM_FIELDS.RESEARCH_AREA}>
          <Input.TextArea />
        </Form.Item>
      </Form.Item>
      <Space className={styles.registrationFooter}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => history.push(STATIC_ROUTES.JOIN_TERMS)}
        >
          {intl.get("screen.join.back")}
        </Button>
        <Space>
          <Button onClick={() => dispatch(userActions.cleanLogout())}>
            {intl.get("screen.join.cancel")}
          </Button>
          <Button
            type="primary"
            loading={isUpdating}
            onClick={() => form.submit()}
          >
            {intl.get("screen.join.submit")}
          </Button>
        </Space>
      </Space>
    </Form>
  );
};

export default RegistrationStep;
