import { SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popover, Space } from "antd";
import { ColumnType } from "antd/lib/table";
import cx from "classnames";

import styles from "./index.module.scss";

export interface ColumnSelectorType<T = any> extends ColumnType<T> {
  key: string;
  defaultHidden?: boolean;
}

interface OwnProps<T = any> {
  className?: string;
  defaultColumns: ColumnSelectorType<T>[];
  columns: ColumnSelectorType<T>[];
  onChange: (newColumns: ColumnSelectorType<T>[]) => void;
}

const ColumnSelector = ({
  className = "",
  defaultColumns,
  columns,
  onChange,
}: OwnProps) => (
  <Popover
    placement="bottomLeft"
    trigger="click"
    align={{
      offset: [-5, 0],
    }}
    content={
      <Space
        direction="vertical"
        className={cx(styles.columnSelector, className)}
      >
        {defaultColumns.map((column, index) => (
          <div key={index} className={styles.columnCheck}>
            <Checkbox
              defaultChecked={
                column.defaultHidden === undefined
                  ? true
                  : !column.defaultHidden
              }
              onChange={(e) => {
                if (!e.target.checked) {
                  onChange(
                    columns.filter(
                      (currentColumn) => currentColumn.key !== column.key
                    )
                  );
                } else {
                  const columnKeyToKeep = [
                    ...columns.map((column) => column.key),
                    column.key,
                  ];

                  onChange(
                    defaultColumns.filter((column) =>
                      columnKeyToKeep.includes(column.key)
                    )
                  );
                }
              }}
            >
              {column.title}
            </Checkbox>
          </div>
        ))}
      </Space>
    }
  >
    <Button
      type="text"
      icon={<SettingOutlined className={styles.settingBtnIcon} />}
    ></Button>
  </Popover>
);

export default ColumnSelector;
