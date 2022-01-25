import React, { useState } from "react";
import { Button } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

type OwnProps<T> = {
  nbToShow?: number;
  dataSource: T[];
  renderItem?: (item: T, id: number) => React.ReactNode;
};

const DEFAULT_NUM_COLLAPSED = 3;

const renderItemDefault = (item: any, id: number) => (
  <span key={id}>{item}</span>
);

const ExpandableCell = <T,>({
  nbToShow = DEFAULT_NUM_COLLAPSED,
  dataSource = [],
  renderItem = renderItemDefault,
}: OwnProps<T>) => {
  const [showAll, setShowAll] = useState(false);
  const dataTotalLength = dataSource?.length || 0;
  const sliceNum = showAll ? dataTotalLength : nbToShow;
  const showButton = dataTotalLength > nbToShow;
  const slicedData = dataSource.slice(0, sliceNum);

  return (
    <>
      {slicedData.map((item, index: number) => renderItem(item, index))}
      {showButton && (
        <Button
          className={styles.tableCellButton}
          type={"link"}
          icon={showAll ? <CaretUpOutlined /> : <CaretDownOutlined />}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Less" : "More"}
        </Button>
      )}
    </>
  );
};

export default ExpandableCell;
