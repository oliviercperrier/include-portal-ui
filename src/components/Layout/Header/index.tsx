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
            title="Dashboard"
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.STUDIES}
            icon={<BookIcon className={style.icon} {...iconSize} />}
            title="Studies"
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.DATA_EXPLORATION}
            icon={<DataExplorationIcon className={style.icon} {...iconSize} />}
            title="Data Exploration"
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.PARTICIPANTS}
            icon={<UserIcon className={style.icon} {...iconSize} />}
            title="Participants"
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.BIOSPECIMEN}
            icon={<ExperimentIcon className={style.icon} {...iconSize} />}
            title="Biospecimen"
          />
          <HeaderLink
            currentPathName={currentPathName}
            to={STATIC_ROUTES.DATA_FILES}
            icon={<FileTextIcon className={style.icon} {...iconSize} />}
            title="Data Files"
          />
        </div>
      }
      extra={[
        <Button key="external-website" className={style.headerBtn}>
          Website <ExternalLinkIcon className={style.icon} {...iconSize} />
        </Button>,
        <Dropdown
          key="user-menu"
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="profile">My Profile</Menu.Item>
              <Menu.Item key="settings">Settings</Menu.Item>
              <Menu.Divider key="divider 1" />
              <Menu.Item key="logout">Logout</Menu.Item>
            </Menu>
          }
        >
          <a
            className={style.userMenuTrigger}
            onClick={(e) => e.preventDefault()}
          >
            {/* CHANGE WITH USER */}
            <Gravatar className={style.userGravatar} email="" size={100} />
            <span className={style.userName}>{user?.firstname}</span>
            <DownOutlined />
          </a>
        </Dropdown>,
      ]}
      className={style.mainHeader}
    />
  );
};

export default Header;
