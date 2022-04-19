import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Modal } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { SetActionType } from '..';
import { createSavedSet } from 'store/savedSet/thunks';
import filtersToName from 'common/sqonToName';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import intl from 'react-intl-universal';
import { FILED_ID, MAX_LENGTH_NAME, PROJECT_ID, useSavedSet } from 'store/savedSet';

import styles from './index.module.scss';

const FORM_NAME = 'save-set';
const SET_NAME_KEY = 'nameSet';

type OwnProps = {
  title: string;
  saveSetActionType: SetActionType;
  hideModalCb: Function;
  sqon?: ISqonGroupFilter;
  setType: string;
};

const SaveSetModal = ({ sqon, hideModalCb, title, saveSetActionType, setType }: OwnProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const { isLoading, savedSets } = useSavedSet();

  const onSuccessCreateCb = () => {
    setIsVisible(false);
    hideModalCb();
  };

  const onFinish = async (value: Store) => {
    const existingTagNames = savedSets.map((s) => s.tag);
    const { nameSet } = value;

    if (existingTagNames.includes(nameSet)) {
      form.setFields([
        {
          name: SET_NAME_KEY,
          errors: ['A set with this name already exists'],
        },
      ]);
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
    form.setFieldsValue({ [SET_NAME_KEY]: defaultName });
  }, [form, saveSetActionType, sqon]);

  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okButtonProps={{ disabled: isLoading }}
      okText="Save"
    >
      <Form
        form={form}
        name={FORM_NAME}
        layout="vertical"
        onFinish={onFinish}
        validateMessages={{
          required: intl.get('global.forms.errors.requiredField'),
        }}
      >
        <Form.Item
          label="Name"
          className={styles.setCreateFormItem}
          name={SET_NAME_KEY}
          rules={[
            {
              required: true,
              max: MAX_LENGTH_NAME,
              validateTrigger: 'onSubmit',
            },
          ]}
          required={false}
        >
          <Input autoFocus placeholder="Enter the name of your new set" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaveSetModal;
