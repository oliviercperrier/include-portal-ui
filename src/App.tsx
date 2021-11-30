import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import intl from "react-intl-universal";
import locales from "locales";
import { Switch, Route } from "react-router-dom";
import ContextProvider from "provider/ContextProvider";

import Home from "views//Home";
import Dashboard from "views//Dashboard";
import SideImageLayout from "components/Layout/SideImage";
import { STATIC_ROUTES } from "utils/routes";
import Spinner from "components/uiKit/Spinner";
import MainSideImage from "components/assets/mainSideImage.jpg";
import ProtectedRoute from "ProtectedRoute";
import PageLayout from "components/Layout";

const App = () => {
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  return (
    <div className="App" id="appContainer">
      {keycloakIsReady ? (
        <Switch>
          <Route exact path={STATIC_ROUTES.HOME}>
            <SideImageLayout sideImgSrc={MainSideImage}>
              <Home />
            </SideImageLayout>
          </Route>
          <ProtectedRoute
            exact
            path={STATIC_ROUTES.DASHBOARD}
            render={() => (
              <PageLayout>
                <Dashboard />
              </PageLayout>
            )}
          />
        </Switch>
      ) : (
        <Spinner size={"large"} />
      )}
    </div>
  );
};

const enhanceApp = () => (
  //<ErrorBoundary>
  <ContextProvider>
    <App />
  </ContextProvider>
  //</ErrorBoundary>
);

export default enhanceApp;
