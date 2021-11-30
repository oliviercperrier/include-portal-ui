import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import { Button } from "antd";

import style from "./index.module.scss";

interface OwnProps {
  className?: string;
  to: string;
  title: string;
  currentPathName: string;
  icon?: React.ReactElement;
}

const HeaderLink = ({
  className = "",
  to,
  currentPathName,
  icon,
  title,
  ...props
}: OwnProps) => {
  return (
    <Link className={style.headerLink} to={to} {...props}>
      <Button
        className={cx(
          className,
          style.headerBtn,
          currentPathName === to ? style.active : ""
        )}
        icon={icon}
      >
        {title}
      </Button>
    </Link>
  );
};

export default HeaderLink;
