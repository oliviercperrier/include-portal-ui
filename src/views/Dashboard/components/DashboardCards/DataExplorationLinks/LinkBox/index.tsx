import { Link } from "react-router-dom";
import { Space } from "antd";

import styles from "./index.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";

interface OwnProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const LinkBox = ({ title, icon, href }: OwnProps) => (
  <Link to={href} className={styles.dataExploBox}>
    <Space direction="horizontal" size={16}>
      <div className={styles.linkIconWrapper}>{icon}</div>
      <span className={styles.linkTitle}>{title}</span>
      <ArrowRightOutlined className={styles.linkArrow}/>
    </Space>
  </Link>
);

export default LinkBox;
