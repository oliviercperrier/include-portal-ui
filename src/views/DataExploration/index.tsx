import SidebarMenu, {
  ISidebarMenuItem,
} from "@ferlab/ui/core/components/sidebarMenu";
import intl from "react-intl-universal";
import StackLayout from "@ferlab/ui/core/layout/StackLayout";
import ScrollContent from "@ferlab/ui/core/layout/ScrollContent";
import {
  ExperimentOutlined,
  UserOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import PageContent from "views/DataExploration/components/PageContent";

import styles from "./index.module.scss";

const DataExploration = () => {
  const menuItems: ISidebarMenuItem[] = [
    {
      key: "1",
      title: intl.get("screen.dataExploration.sidemenu.participant"),
      icon: <UserOutlined className={styles.sideMenuIcon} />,
      panelContent: <></>,
    },
    {
      key: "2",
      title: intl.get("screen.dataExploration.sidemenu.biospecimen"),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: <></>,
    },
    {
      key: "3",
      title: intl.get("screen.dataExploration.sidemenu.datafiles"),
      icon: <FileSearchOutlined className={styles.sideMenuIcon} />,
      panelContent: <></>,
    },
  ];

  return (
    <StackLayout horizontal className={styles.dataExplorationLayout}>
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContent className={styles.scrollContent}>
        <PageContent mappingResults={{}}></PageContent>
      </ScrollContent>
    </StackLayout>
  );
};

export default DataExploration;
