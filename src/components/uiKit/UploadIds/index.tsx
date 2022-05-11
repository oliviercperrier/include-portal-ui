import { UploadOutlined } from '@ant-design/icons';
import { Button, PopoverProps } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import cx from 'classnames';
import useDebounce from 'components/utils/useDebounce';
import { difference } from 'lodash';
import UploadModal from './UploadModal';

import styles from './index.module.scss';

export interface MatchTableItem {
  submittedId: string;
  matchField: string;
  mappedTo: string;
}

export interface UnmatchTableItem {
  submittedId: string;
}

export interface UploadIdDictionary {
  modalTitle: string;
  collapseTitle?: (matchCount: number, unmatchCount: number) => string;
  matchTabTitle?: (matchCount: number) => string;
  unmatchTabTitle?: (unmatchCount: number) => string;
  submittedColTitle: string;
  modalOkText?: ReactNode;
  modalCancelText?: ReactNode;
  modalUploadBtnText?: string;
  inputLabel?: ReactNode;
  mappedTo?: string;
  uploadBtnText: string;
  matchTable: {
    idColTitle: string;
    matchFieldColTitle: string;
    mappedToFieldColTitle: string;
  };
}

export interface UploadIdsProps {
  className?: string;
  fetchMatch: (ids: string[]) => Promise<MatchTableItem[]>;
  popoverProps?: PopoverProps;
  dictionary: UploadIdDictionary;
  placeHolder: string;
  onUpload: (matchIds: string[]) => void;
  modalWidth?: number;
}

const UploadIds = ({
  className = '',
  fetchMatch,
  popoverProps,
  dictionary,
  placeHolder,
  onUpload,
  modalWidth,
}: UploadIdsProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [match, setMatch] = useState<MatchTableItem[] | undefined>(undefined);
  const [unmatch, setUnmatch] = useState<UnmatchTableItem[] | undefined>(undefined);
  const debouncedValue = useDebounce(value, 500);

  const getValueList = () => value.split(/[\n,\r ]/).filter((val) => !!val);
  const getUnmatchList = (results: MatchTableItem[]) =>
    difference(
      getValueList(),
      results.map((item) => item.submittedId),
    ).map((id) => ({
      submittedId: id,
    }));

  useEffect(() => {
    if (debouncedValue) {
      (async () => {
        setIsLoading(true);
        const results = await fetchMatch(getValueList());
        setMatch(results);
        setUnmatch(getUnmatchList(results));
        setIsLoading(false);
      })();
    } else {
      // clear match/unmatch
      setValue('');
      setMatch(undefined);
      setUnmatch(undefined);
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  return (
    <>
      <Button
        type="primary"
        className={cx(styles.fuiUploadIdsButton, className)}
        icon={<UploadOutlined />}
        onClick={() => setModalVisible(true)}
      >
        {dictionary.uploadBtnText}
      </Button>
      <UploadModal
        width={modalWidth}
        visible={modalVisible}
        setVisible={setModalVisible}
        matchItems={match}
        unmatchItems={unmatch}
        dictionary={dictionary}
        popoverProps={popoverProps}
        placeHolder={placeHolder}
        inputValue={value}
        setInputValue={setValue}
        onUpload={onUpload}
        loading={isLoading}
      />
    </>
  );
};

export default UploadIds;
