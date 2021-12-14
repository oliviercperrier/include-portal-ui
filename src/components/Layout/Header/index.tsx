import React from "react";
import { PageHeader, Dropdown, Button, Menu } from "antd";
import IncludeIcon from "components/Icons/IncludeIcon";
import HomeIcon from "components/Icons/HomeIcon";
import BookIcon from "components/Icons/BookIcon";
import DataExplorationIcon from "components/Icons/DataExplorationIcon";
import UserIcon from "components/Icons/UserIcon";
import FileTextIcon from "components/Icons/FileTextIcon";
import ExperimentIcon from "components/Icons/ExperimentIcon";
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
        <div className={style.headerList}>
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.DASHBOARD}
            icon={<HomeIcon className={style.icon} {...iconSize} />}
            title={intl.get("layout.main.menu.dashboard")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.STUDIES}
            icon={<BookIcon className={style.icon} {...iconSize} />}
            title={intl.get("layout.main.menu.studies")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.DATA_EXPLORATION}
            icon={<DataExplorationIcon className={style.icon} {...iconSize} />}
            title={intl.get("layout.main.menu.explore")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.PARTICIPANTS}
            icon={<UserIcon className={style.icon} {...iconSize} />}
            title={intl.get("layout.main.menu.participants")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.BIOSPECIMEN}
            icon={<ExperimentIcon className={style.icon} {...iconSize} />}
            title={intl.get("layout.main.menu.biospecimen")}
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.DATA_FILES}
            icon={<FileTextIcon className={style.icon} {...iconSize} />}
            title={intl.get("layout.main.menu.datafiles")}
          />
        </div>
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
