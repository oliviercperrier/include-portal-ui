import React, { ReactElement } from "react";
import EnvVariables from "helpers/EnvVariables";
import { Row } from "antd";

import style from "./index.module.scss";

interface OwnProps {
  logoSrc?: string;
  sideImgSrc?: string;
  children: ReactElement;
}

const SideImageLayout = ({ logoSrc, sideImgSrc, children }: OwnProps) => (
  <div className={style.sideImagePageContainer}>
    {logoSrc && (
      <a href={EnvVariables.configFor({ key: "INCLUDE_WEB_ROOT" })}>
        <img className={style.logoImage} src={logoSrc} alt="Kids First Logo" />
      </a>
    )}
    <Row className={style.contentWrapper}>
      <div
        className={style.sideImageContainer}
        style={{
          backgroundImage: `url(${sideImgSrc})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <Row className={style.pageContent}>{children}</Row>
    </Row>
  </div>
);

export default SideImageLayout;
