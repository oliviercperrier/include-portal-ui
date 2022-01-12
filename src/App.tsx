import { useKeycloak } from "@react-keycloak/web";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import ContextProvider from "provider/ContextProvider";

import Home from "views/Home";
import SideImageLayout from "components/Layout/SideImage";
import { DYNAMIC_ROUTES, STATIC_ROUTES } from "utils/routes";
import Spinner from "components/uiKit/Spinner";
import MainSideImage from "components/assets/mainSideImage.jpg";
import ProtectedRoute from "ProtectedRoute";
import PageLayout from "components/Layout";
import Authenticator from "auth/Authenticator";
import ErrorPage from "views/Error";
import loadable from "@loadable/component";

const loadableProps = { fallback: <Spinner size="large"/> };
const Dashboard = loadable(() => import("views/Dashboard"), loadableProps);
const Studies = loadable(() => import("views/Studies"), loadableProps);
const MyProfile = loadable(() => import("views/MyProfile"), loadableProps);
const Settings = loadable(() => import("views/Settings"), loadableProps);
const DataExploration = loadable(() => import("views/DataExploration"), loadableProps);
const JoinPage = loadable(() => import("views/Join"), loadableProps);

const App = () => {
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  return (
    <div className="App" id="appContainer">
      {keycloakIsReady ? (
        <Authenticator>
          <Switch>
            <Route exact path={STATIC_ROUTES.HOME}>
              <SideImageLayout sideImgSrc={MainSideImage}>
                <Home />
              </SideImageLayout>
            </Route>
            <Route
              path={STATIC_ROUTES.JOIN}
              render={() => (
                <SideImageLayout
                  sideImgSrc={MainSideImage}
                  theme="light"
                  alignCenter={false}
                >
                  <JoinPage />
                </SideImageLayout>
              )}
            />
            <Route
              exact
              path={STATIC_ROUTES.ERROR}
              render={() => (
                <SideImageLayout sideImgSrc={MainSideImage}>
                  <ErrorPage />
                </SideImageLayout>
              )}
            />
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
              path={DYNAMIC_ROUTES.DATA_EXPLORATION}
              render={(props: RouteComponentProps<{ tab?: string }>) => (
                <DataExploration tab={props.match?.params.tab} />
              )}
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
