import { useKeycloak } from '@react-keycloak/web';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import ContextProvider from 'provider/ContextProvider';
import Empty from '@ferlab/ui/core/components/Empty';
import Login from 'views/Login';
import SideImageLayout from 'components/Layout/SideImage';
import { DYNAMIC_ROUTES, STATIC_ROUTES } from 'utils/routes';
import Spinner from 'components/uiKit/Spinner';
import MainSideImage from 'components/assets/mainSideImage.jpg';
import ProtectedRoute from 'ProtectedRoute';
import PageLayout from 'components/Layout';
import Authenticator from 'auth/Authenticator';
import ErrorPage from 'views/Error';
import loadable from '@loadable/component';
import { useGlobals } from 'store/global';
import { ConfigProvider } from 'antd';
import { LANG } from 'common/constants';
import frFR from 'antd/lib/locale/fr_FR';
import enUS from 'antd/lib/locale/en_US';
import ErrorBoundary from 'components/ErrorBoundary';
import FenceRedirect from 'views/FenceRedirect';
import { FENCE_NAMES } from 'common/fenceTypes';

const loadableProps = { fallback: <Spinner size="large" /> };
const Dashboard = loadable(() => import('views/Dashboard'), loadableProps);
const Studies = loadable(() => import('views/Studies'), loadableProps);
const MyProfile = loadable(() => import('views/MyProfile'), loadableProps);
const Settings = loadable(() => import('views/Settings'), loadableProps);
const DataExploration = loadable(() => import('views/DataExploration'), loadableProps);
const JoinPage = loadable(() => import('views/Join'), loadableProps);

const App = () => {
  const { lang } = useGlobals();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFR : enUS}
      renderEmpty={() => <Empty imageType="grid" />}
    >
      <div className="App" id="appContainer">
        {keycloakIsReady ? (
          <Authenticator>
            <Router>
              <Switch>
                <Route
                  path={STATIC_ROUTES.GEN3_REDIRECT}
                  exact
                  render={() => <FenceRedirect fence={FENCE_NAMES.gen3} />}
                />
                <Route
                  path={STATIC_ROUTES.DCF_REDIRECT}
                  exact
                  render={() => <FenceRedirect fence={FENCE_NAMES.dcf} />}
                />
                <Route exact path={STATIC_ROUTES.LOGIN}>
                  <SideImageLayout sideImgSrc={MainSideImage}>
                    <Login />
                  </SideImageLayout>
                </Route>
                <Route
                  path={STATIC_ROUTES.JOIN}
                  render={() => (
                    <SideImageLayout sideImgSrc={MainSideImage} theme="light" alignCenter={false}>
                      <JoinPage />
                    </SideImageLayout>
                  )}
                />
                <Route
                  path={DYNAMIC_ROUTES.ERROR}
                  render={(props: RouteComponentProps<{ status?: any }>) => (
                    <ErrorPage status={props.match.params.status} />
                  )}
                />
                <ProtectedRoute exact path={STATIC_ROUTES.DASHBOARD} layout={PageLayout}>
                  <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute exact path={STATIC_ROUTES.STUDIES} layout={PageLayout}>
                  <Studies />
                </ProtectedRoute>
                <ProtectedRoute exact path={DYNAMIC_ROUTES.DATA_EXPLORATION} layout={PageLayout}>
                  <DataExploration />
                </ProtectedRoute>
                <ProtectedRoute exact path={STATIC_ROUTES.MY_PROFILE} layout={PageLayout}>
                  <MyProfile />
                </ProtectedRoute>
                <ProtectedRoute exact path={STATIC_ROUTES.SETTINGS} layout={PageLayout}>
                  <Settings />
                </ProtectedRoute>
                <Redirect from="*" to={STATIC_ROUTES.DASHBOARD} />
              </Switch>
            </Router>
          </Authenticator>
        ) : (
          <Spinner size={'large'} />
        )}
      </div>
    </ConfigProvider>
  );
};

const EnhanceApp = () => {
  return (
    <ErrorBoundary>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ErrorBoundary>
  );
};

export default EnhanceApp;
