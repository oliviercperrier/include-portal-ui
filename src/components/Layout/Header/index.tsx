/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { PageHeader, Dropdown, Button, Menu } from "antd";
import IncludeIcon from "components/Icons/IncludeIcon";
import {
  ExperimentOutlined,
  UserOutlined,
  ReadOutlined,
  HomeOutlined,
  FileSearchOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import ExternalLinkIcon from "components/Icons/ExternalLinkIcon";
import { DownOutlined } from "@ant-design/icons";
import Gravatar from "components/uiKit/Gravatar";
import HeaderLink from "components/Layout/Header/HeaderLink";
import { STATIC_ROUTES } from "utils/routes";
import history from "utils/history";
import { useUser } from "store/user";
import intl from "react-intl-universal";

import style from "./index.module.scss";

const iconSize = { width: 14, height: 14 };

const Header = () => {
  const { user } = useUser();
  const currentPathName = history.location.pathname;

  return (
    <PageHeader
      title={<IncludeIcon className={style.logo} />}
      subTitle={
        <nav className={style.headerList}>
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.DASHBOARD}
            icon={<HomeOutlined />}
            title={intl.get("layout.main.menu.dashboard")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.STUDIES}
            icon={<ReadOutlined />}
            title={intl.get("layout.main.menu.studies")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.DATA_EXPLORATION}
            icon={<FileSearchOutlined />}
            title={intl.get("layout.main.menu.explore")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.PARTICIPANTS}
            icon={<UserOutlined />}
            title={intl.get("layout.main.menu.participants")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.BIOSPECIMEN}
            icon={<ExperimentOutlined />}
            title={intl.get("layout.main.menu.biospecimen")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.DATA_FILES}
            icon={<FileTextOutlined />}
            title={intl.get("layout.main.menu.datafiles")}
          />
        </nav>
      }
      extra={[
        <Button key="external-website" className={style.headerBtn}>
          {intl.get("layout.main.menu.website")}{" "}
          <ExternalLinkIcon className={style.icon} {...iconSize} />
        </Button>,
        <Dropdown
          key="user-menu"
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="profile">
                {intl.get("layout.user.menu.myprofile")}
              </Menu.Item>
              <Menu.Item key="settings">
                {intl.get("layout.user.menu.settings")}
              </Menu.Item>
              <Menu.Divider key="divider 1" />
              <Menu.Item key="logout">
                {intl.get("layout.user.menu.logout")}
              </Menu.Item>
            </Menu>
          }
        >
          <a
            className={style.userMenuTrigger}
            onClick={(e) => e.preventDefault()}
            href=""
          >
            {/* CHANGE WITH USER */}
            <Gravatar
              className={style.userGravatar}
              email="ocastro-perrier@ferlab.bio"
              size={100}
            />
            <span className={style.userName}>{user?.firstName}</span>
            <DownOutlined />
          </a>
        </Dropdown>,
      ]}
      className={style.mainHeader}
    />
  );
};

export default Header;
