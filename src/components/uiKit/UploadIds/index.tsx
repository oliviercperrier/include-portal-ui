import { PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table, Tabs, Upload } from 'antd';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import useDebounce from 'components/utils/useDebounce';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';

import styles from './index.module.scss';
import { isEmpty } from 'lodash';

export interface UploadIdsProps<T> {
  className?: string;
  fetchMatch: (ids: string[]) => Promise<T[]>;
}

const UploadIds = <T extends object = any>({ className = '', fetchMatch }: UploadIdsProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [match, setMatch] = useState<T[]>([]);
  const [unmatch, setUnmatch] = useState<{ id: string }[]>([]);
  const debouncedValue = useDebounce(value, 500);

  const getValueList = () => value.split(/[\n,\r ]/).filter((val) => !!val);

  useEffect(() => {
    if (debouncedValue) {
      (async () => {
        const results = await fetchMatch(getValueList());
        setMatch(results);
        setUnmatch([{ id: 'lol' }]);
      })();
    } else {
      // clear match/unmatch
      setValue('');
      setMatch([]);
      setUnmatch([]);
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
        Upload a [ entity ] list
      </Button>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={945}
        title="Upload [Entity] List"
        okText="Upload"
        wrapClassName={styles.fuiUploadIdsModalWrapper}
        destroyOnClose
      >
        <Space direction="vertical" className={styles.space}>
          <ProLabel
            title="Copy-paste a list of indentifiers or upload a file"
            popoverProps={{
              title: 'Allo',
              content: 'Bonjour',
            }}
          />
          <Space direction="vertical" size={12} className={styles.space}>
            <Input.TextArea
              rows={4}
              placeholder="Ex: TP53, ENSG00000367, Q8WZ42"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            ></Input.TextArea>
            <Upload
              accept=".txt, .csv, .tsv"
              multiple={false}
              maxCount={1}
              itemRender={(_, file) => (
                <Space size={5} className={styles.fuiUploadIdsListItem}>
                  <PaperClipOutlined className={styles.paperClipIcon} />
                  {file.name}
                </Space>
              )}
              className={styles.fuiUploadIdsUpload}
              beforeUpload={async (file, fileList) => {
                setValue(await file.text());
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload a File</Button>
            </Upload>
          </Space>
        </Space>
        {isEmpty(match) && isEmpty(unmatch) ? null : (
          <Collapse className={styles.fuiUploadIdsMatchUnmatch}>
            <CollapsePanel
              className={styles.fuiUploadIdsCollapsePanel}
              key="match-unmatch-ids"
              header="Summary Table (98 matched, 3 unmatched)"
            >
              <Tabs size="small" defaultActiveKey="matched">
                <Tabs.TabPane key="matched" tab="Matched (98)">
                  <Table
                    bordered
                    size="small"
                    className={styles.fuiUploadIdsResultsTable}
                    dataSource={match}
                    columns={[
                      {
                        title: 'Submitted [Entity] Identifier',
                        align: 'center',
                        className: styles.fuiUploadIdsTableCell,
                        children: [
                          {
                            title: 'title',
                            dataIndex: 'id',
                          },
                        ],
                      },
                      {
                        title: 'Mapped To',
                        align: 'center',
                        children: [
                          {
                            title: 'title',
                            dataIndex: 'id1',
                          },
                          {
                            title: 'title2',
                            dataIndex: 'id2',
                          },
                        ],
                      },
                    ]}
                  ></Table>
                </Tabs.TabPane>
                <Tabs.TabPane key="unmatched" tab="Unmatched (3)">
                  <Table
                    bordered
                    size="small"
                    dataSource={unmatch}
                    className={styles.fuiUploadIdsResultsTable}
                    columns={[
                      {
                        title: 'Submitted [Entity] Identifier',
                        dataIndex: 'id',
                      },
                    ]}
                  ></Table>
                </Tabs.TabPane>
              </Tabs>
            </CollapsePanel>
          </Collapse>
        )}
      </Modal>
    </>
  );
};

export default UploadIds;
