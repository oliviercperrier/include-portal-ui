import { Button, Checkbox, Form, Input, Radio, Space, Typography } from "antd";
import cx from "classnames";
import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

const { Title } = Typography;

const RegistrationStep = () => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: "This field is required!",
    types: {
      email: "Enter a valid email",
    },
  };

  return (
    <Form
      form={form}
      className={styles.checkboxForm}
      onFinish={(values) => console.log(values)}
      layout="vertical"
      validateMessages={validateMessages}
    >
      <Title level={3} className={styles.subSectionTitle}>
        Identification
      </Title>
      <Form.Item
        name="externalid"
        label="I have an eRA Commons ID or NIH NED User ID:"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.externalid !== currentValues.externalid
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("externalid") === "yes" ? (
            <Form.Item
              className={cx(styles.withCustomHelp, styles.dynamicField)}
              name="userId"
              label="Please enter your user ID"
              rules={[{ required: true }]}
            >
              <div>
                <span className={styles.help}>
                  This information will not be made public.
                </span>
                <Input />
              </div>
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.externalid !== currentValues.externalid
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("externalid") === "no" ? (
            <div className={styles.dynamicField}>
              <span className={styles.help}>
                Please provide the name and email address of an individual at
                your institution, organization, or similar who is aware of your
                intended use of the data (We do not expect to contact this
                individual except in cases where we need to verify your
                identity).
              </span>
              <Form.Item
                name="fullName"
                label="Full name"
                rules={[{ required: true }]}
                className={styles.fullNameField}
              >
                <Input placeholder="First Last" />
              </Form.Item>
              <Form.Item
                name="externalEmail"
                label="Email"
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
        Role & Affiliation
      </Title>
      <Form.Item
        className={styles.withCustomHelp}
        name="role"
        label="I am a:"
        rules={[{ required: true }]}
      >
        <Checkbox.Group>
          <span className={styles.help}>Check all that apply</span>
          <Space direction="vertical">
            <Checkbox value="Researcher at an academic or not-for-profit institution">
              Researcher at an academic or not-for-profit institution
            </Checkbox>
            <Checkbox value="Representative from a For-Profit or Commercial Entity">
              Representative from a For-Profit or Commercial Entity
            </Checkbox>
            <Checkbox value="Tool or Algorithm Developer">
              Tool or Algorithm Developer
            </Checkbox>
            <Checkbox value="Clinician">Clinician</Checkbox>
            <Checkbox value="Community member">Community member</Checkbox>
            <Checkbox value="Federal Employee">Federal Employee</Checkbox>
            <Checkbox value="other">Other</Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.role !== currentValues.role
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("role")?.includes("other") ? (
            <Form.Item
              className={styles.dynamicField}
              name="otherRole"
              label="Please describe"
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
          prevValues.noAffiliation !== currentValues.noAffiliation
        }
      >
        {({ getFieldValue }) =>
          !getFieldValue("noAffiliation") ? (
            <Form.Item
              className={cx(styles.withCustomHelp, styles.affiliationField)}
              name="affiliation"
              label="I am affiliated with:"
              rules={[{ required: true }]}
            >
              <div>
                <span className={styles.help}>
                  Provide institutional or organizational affiliation
                </span>
                <Input />
              </div>
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.noAffiliation !== currentValues.noAffiliation
        }
      >
        {() => (
          <Form.Item
            name="noAffiliation"
            label={
              form.getFieldValue("noAffiliation") ? "I am affiliated with:" : ""
            }
            className={cx(styles.withCustomHelp, styles.noAffiliationField)}
            rules={[{ required: true }]}
            valuePropName="checked"
          >
            <Checkbox value="noAffiliation">
              I do not have an institutional affiliation.
            </Checkbox>
          </Form.Item>
        )}
      </Form.Item>
      <Title level={3} className={styles.subSectionTitle}>
        Research & Data Use
      </Title>
      <Form.Item
        className={styles.withCustomHelp}
        name="dataUse"
        label="I intend to use the INCLUDE Portal data to:"
        rules={[{ required: true }]}
      >
        <Checkbox.Group>
          <span className={styles.help}>Check all that apply</span>
          <Space direction="vertical">
            <Checkbox value="Learn more about Down syndrome and its health outcomes, management, and/or treatment">
              Learn more about Down syndrome and its health outcomes,
              management, and/or treatment
            </Checkbox>
            <Checkbox value="Help me design a new research study">
              Help me design a new research study
            </Checkbox>
            <Checkbox value="Identify datasets that I want to analyze">
              Identify datasets that I want to analyze
            </Checkbox>
            <Checkbox value="other">Other</Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.dataUse !== currentValues.dataUse
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("dataUse")?.includes("other") ? (
            <Form.Item
              className={cx(styles.withCustomHelp, styles.dynamicField)}
              name="otherDataUse"
              label="Data use statement"
              rules={[{ required: true }]}
            >
              <span className={styles.help}>
                For other purpose, including commercial purpose, you must
                describe your use below
              </span>
              <Input.TextArea />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        className={cx(styles.withCustomHelp, styles.researchAreaField)}
        name="reasearchArea"
        label="My research area or area of interest may best be described as:"
      >
        <span className={styles.help}>
          Provide a brief description and a link to your professional biography
          or organization website, if available
        </span>
        <Input.TextArea />
      </Form.Item>

      <Space className={styles.registrationFooter}>
        <Button icon={<ArrowLeftOutlined />}>Back</Button>
        <Space>
          <Button>{intl.get("screen.join.cancel")}</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Space>
      </Space>
    </Form>
  );
};

export default RegistrationStep;
