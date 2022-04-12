import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import UserSetsForm from './UserSetsForm';
import { Store } from 'antd/lib/form/interface';
import { SetActionType } from './index';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { IUserSetOutput } from 'services/api/savedSet/models';
import { updateSavedSet } from 'store/savedSet/thunks';
import { useDispatch } from 'react-redux';
import { FILED_ID, PROJECT_ID } from 'store/savedSet';
import intl from 'react-intl-universal';

const FORM_NAME = 'add-remove-set';

type OwnProps = {
  hideModalCb: Function;
  userSets: IUserSetOutput[];
  sqon?: ISqonGroupFilter;
  setActionType: SetActionType;
};

const finishButtonText = (type: string) => {
  switch (type) {
    case SetActionType.ADD_IDS:
      return 'Add to set';
    case SetActionType.REMOVE_IDS:
      return 'Remove from set';
    default:
      break;
  }
};

const formTitle = (type: string) => {
  switch (type) {
    case SetActionType.ADD_IDS:
      return intl.get('components.savedSets.modal.addParticipants.title');
    case SetActionType.REMOVE_IDS:
      return intl.get('components.savedSets.modal.removeParticipants.title');
    default:
      break;
  }
};

const AddRemoveSaveSetModal: FunctionComponent<OwnProps> = (props) => {
  const { hideModalCb, userSets, setActionType, sqon } = props;
  const [isVisible, setIsVisible] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  const onSuccessCreateCb = () => {
    setIsVisible(false);
    setIsUpdate(false);
    hideModalCb();
  };

  const onFinish = async (values: Store) => {
    const { setId } = values;
    switch (setActionType) {
      case SetActionType.ADD_IDS:
      case SetActionType.REMOVE_IDS:
        setIsUpdate(true);
        dispatch(
          updateSavedSet({
            id: setId,
            subAction: setActionType,
            idField: FILED_ID,
            projectId: PROJECT_ID,
            sqon: sqon!,
            onCompleteCb: onSuccessCreateCb,
          }),
        );
        break;
      default:
        setIsVisible(false);
        hideModalCb();
        break;
    }
  };

  const onCancel = () => {
    setIsVisible(false);
    hideModalCb();
  };

  const [form] = Form.useForm();

  return (
    <Modal
      title={formTitle(setActionType)}
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Form.Item key={'submit'} noStyle>
          <Button
            id="EditSaveSets"
            form={FORM_NAME}
            htmlType="submit"
            key="save"
            type="primary"
            loading={isUpdate}
          >
            {finishButtonText(setActionType)}
          </Button>
        </Form.Item>,
      ]}
    >
      <UserSetsForm userSets={userSets} form={form} formName={FORM_NAME} onFinish={onFinish} />
    </Modal>
  );
};

export default AddRemoveSaveSetModal;
