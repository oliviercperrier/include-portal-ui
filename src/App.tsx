import { ReactKeycloakProvider } from "@react-keycloak/web";
import Router from "views/route";
import intl from "react-intl-universal";
import locales from "locales";
// import keycloak from 'auth/keycloak-api/keycloak';

import styles from "./App.module.scss";
import "style/themes/include/main.scss";
import "style/themes/include/dist/antd.css";

const App = () => {
  intl.init({ currentLocale: "fr", locales: { fr: locales.fr } });

  return (
    <div className={styles.app}>
      <Router />
    </div>
  );
};

export default App;
