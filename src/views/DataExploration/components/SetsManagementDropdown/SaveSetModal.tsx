import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { SetActionType } from './index';
import { createSavedSet } from 'store/savedSet/thunks';
import filtersToName from 'common/sqonToName';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';

import { FILED_ID, MAX_LENGTH_NAME, PROJECT_ID, useSavedSet } from 'store/savedSet';

const FORM_NAME = 'save-set';

type OwnProps = {
  title: string;
  saveSetActionType: SetActionType;
  hideModalCb: Function;
  sqon?: ISqonGroupFilter;
  setType: string;
};

type NameSetValidator = {
  msg: string;
  err: boolean;
};

export const validateNameSetInput = (rawValue: string): NameSetValidator => {
  const value = (rawValue || '').trim();
  if (!value) {
    return { msg: 'Please input the name of your set', err: true };
  }
  return { msg: '', err: false };
};

const SaveSetModal: FunctionComponent<OwnProps> = (props) => {
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState('');

  const { isLoading, savedSets } = useSavedSet();

  const dispatch = useDispatch();

  const { sqon, hideModalCb, title, saveSetActionType, setType } = props;

  const onSuccessCreateCb = () => {
    setIsVisible(false);
    hideModalCb();
  };

  const onFinish = async (value: Store) => {
    const existingTagNames = savedSets.map((s) => s.tag);

    const { nameSet } = value;

    if (existingTagNames.includes(nameSet)) {
      setHasError(true);
      setHasErrorMessage('A set with this name already exists');
    } else {
      dispatch(
        createSavedSet({
          idField: FILED_ID,
          projectId: PROJECT_ID,
          sort: [],
          sqon: sqon!,
          tag: nameSet,
          type: setType,
          onCompleteCb: onSuccessCreateCb,
        }),
      );
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    hideModalCb();
  };

  useEffect(() => {
    const defaultName = filtersToName({ filters: sqon });

    form.setFieldsValue({ nameSet: defaultName });
  }, [form, saveSetActionType, sqon]);

  const displayHelp = () => {
    if (hasError) {
      return hasErrorMessage;
    } else {
      return '';
    }
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Form.Item key={'submit'} noStyle>
          <Button
            id="CreateSaveSets"
            form={FORM_NAME}
            htmlType="submit"
            key="save"
            type="primary"
            disabled={hasError}
            loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>,
      ]}
    >
      <Form form={form} name={FORM_NAME} onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="nameSet"
          hasFeedback
          validateStatus={hasError ? 'error' : 'success'}
          help={displayHelp()}
          rules={[
            () => ({
              validator: (_, value) => {
                const { msg, err } = validateNameSetInput(value);
                setHasError(err);
                setHasErrorMessage(msg);
                if (err) {
                  return Promise.reject(msg);
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input
            autoFocus
            maxLength={MAX_LENGTH_NAME}
            placeholder="Enter the name of your new set"
            allowClear={true}
            onFocus={handleFocus}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaveSetModal;
