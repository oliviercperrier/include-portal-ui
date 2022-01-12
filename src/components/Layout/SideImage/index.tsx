import { ReactElement } from "react";
import EnvVariables from "helpers/EnvVariables";
import cx from "classnames";
import { Row } from "antd";

import style from "./index.module.scss";

interface OwnProps {
  logoSrc?: string;
  sideImgSrc?: string;
  alignCenter?: boolean;
  theme?: "light" | "dark";
  children: ReactElement;
}

const SideImageLayout = ({
  logoSrc,
  sideImgSrc,
  alignCenter = true,
  theme = "dark",
  children,
}: OwnProps) => (
  <div className={style.sideImagePageContainer}>
    {logoSrc && (
      <a href={EnvVariables.configFor("INCLUDE_WEB_ROOT")}>
        <img
          className={style.logoImage}
          src={logoSrc}
          alt="Include Logo Logo"
        />
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
      <Row
        className={cx(
          style.pageContent,
          alignCenter && style.alignCenter,
          theme === "light" ? style.light : style.dark
        )}
      >
        {children}
      </Row>
    </Row>
  </div>
);

export default SideImageLayout;
