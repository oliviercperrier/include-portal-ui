/* eslint-disable jsx-a11y/anchor-is-valid */
import { PageHeader, Dropdown, Button, Menu } from "antd";
import IncludeIcon from "components/Icons/IncludeIcon";
import {
  ExperimentOutlined,
  UserOutlined,
  ReadOutlined,
  HomeOutlined,
  FileSearchOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import ExternalLinkIcon from "components/Icons/ExternalLinkIcon";
import { DownOutlined } from "@ant-design/icons";
import Gravatar from "components/uiKit/Gravatar";
import HeaderLink from "components/Layout/Header/HeaderLink";
import { STATIC_ROUTES } from "utils/routes";
import history from "utils/history";
import { useUser } from "store/user";
import intl from "react-intl-universal";
import { getFTEnvVarByKey } from "helpers/EnvVariables";
import NotificationBanner from "components/featureToggle/NotificationBanner";
import { AlterTypes } from "common/types";
import { useKeycloak } from "@react-keycloak/web";
import { IncludeKeycloakTokenParsed } from "common/tokenTypes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "store/user/slice";

import style from "./index.module.scss";

const iconSize = { width: 14, height: 14 };
const FT_FLAG_KEY = "SITE_WIDE_BANNER";
const BANNER_TYPE_KEY = FT_FLAG_KEY + "_TYPE";
const BANNER_MSG_KEY = FT_FLAG_KEY + "_MSG";

const Header = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const currentPathName = history.location.pathname;

  return (
    <>
      <NotificationBanner
        className={style.siteWideBanner}
        featureToggleKey={FT_FLAG_KEY}
        type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, "warning")}
        message={getFTEnvVarByKey(BANNER_MSG_KEY)}
        banner
        closable
      />
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
              to={[
                STATIC_ROUTES.DATA_EXPLORATION,
                STATIC_ROUTES.DATA_EXPLORATION_SUMMARY,
              ]}
              icon={<FileSearchOutlined />}
              title={intl.get("layout.main.menu.explore")}
            />
            <HeaderLink
              currentPathName={currentPathName}
              to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
              icon={<UserOutlined />}
              title={intl.get("layout.main.menu.participants")}
            />
            <HeaderLink
              currentPathName={currentPathName}
              to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
              icon={<ExperimentOutlined />}
              title={intl.get("layout.main.menu.biospecimen")}
            />
            <HeaderLink
              currentPathName={currentPathName}
              to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
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
                  <Link to={STATIC_ROUTES.MY_PROFILE}>
                    {intl.get("layout.user.menu.myprofile")}
                  </Link>
                </Menu.Item>
                <Menu.Item key="settings">
                  <Link to={STATIC_ROUTES.SETTINGS}>
                    {intl.get("layout.user.menu.settings")}{" "}
                  </Link>
                </Menu.Item>
                <Menu.Divider key="divider 1" />
                <Menu.Item
                  key="logout"
                  onClick={() => dispatch(userActions.cleanLogout())}
                >
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
              <Gravatar
                className={style.userGravatar}
                email={
                  (keycloak.tokenParsed as IncludeKeycloakTokenParsed).email
                }
                size={100}
              />
              <span className={style.userName}>{user?.first_name}</span>
              <DownOutlined />
            </a>
          </Dropdown>,
        ]}
        className={style.mainHeader}
      />
    </>
  );
};

export default Header;
