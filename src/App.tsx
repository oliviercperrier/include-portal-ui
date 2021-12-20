import { Suspense } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Switch, Route, Redirect } from "react-router-dom";
import ContextProvider from "provider/ContextProvider";

import Home from "views/Home";
import Dashboard from "views//Dashboard";
import SideImageLayout from "components/Layout/SideImage";
import { STATIC_ROUTES } from "utils/routes";
import Spinner from "components/uiKit/Spinner";
import MainSideImage from "components/assets/mainSideImage.jpg";
import ProtectedRoute from "ProtectedRoute";
import PageLayout from "components/Layout";
import Authenticator from "auth/Authenticator";
import Studies from "views/Studies";
import Participants from "views/Participants";
import Biospecimen from "views/Biospecimen";
import DataFiles from "views/DataFiles";
import MyProfile from "views/MyProfile";
import Settings from "views/Settings";
import DataExploration from "views/DataExploration";

const App = () => {
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  return (
    <div className="App" id="appContainer">
      {keycloakIsReady ? (
        <Authenticator>
          <Suspense fallback={<Spinner size={"large"} />}>
            <Switch>
              <Route exact path={STATIC_ROUTES.HOME}>
                <SideImageLayout sideImgSrc={MainSideImage}>
                  <Home />
                </SideImageLayout>
              </Route>
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.DASHBOARD}
                render={() => <Dashboard />}
                layout={PageLayout}
              />
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.STUDIES}
                render={() => <Studies />}
                layout={PageLayout}
              />
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.DATA_EXPLORATION}
                render={() => <DataExploration />}
                layout={PageLayout}
              />
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.PARTICIPANTS}
                render={() => <Participants />}
                layout={PageLayout}
              />
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.BIOSPECIMEN}
                render={() => <Biospecimen />}
                layout={PageLayout}
              />
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.DATA_FILES}
                render={() => <DataFiles />}
                layout={PageLayout}
              />
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.MY_PROFILE}
                render={() => <MyProfile />}
                layout={PageLayout}
              />
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.SETTINGS}
                render={() => <Settings />}
                layout={PageLayout}
              />
              <Redirect from="*" to={STATIC_ROUTES.DASHBOARD} />
            </Switch>
          </Suspense>
        </Authenticator>
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
