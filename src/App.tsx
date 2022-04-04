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
import AuthMiddleware from 'middleware/AuthMiddleware';
import ErrorPage from 'views/Error';
import loadable from '@loadable/component';
import { useLang } from 'store/global';
import { ConfigProvider } from 'antd';
import { LANG } from 'common/constants';
import frFR from 'antd/lib/locale/fr_FR';
import enUS from 'antd/lib/locale/en_US';
import ErrorBoundary from 'components/ErrorBoundary';
import FenceRedirect from 'views/FenceRedirect';
import { FENCE_NAMES } from 'common/fenceTypes';
import NotificationContextHolder from 'components/utils/NotificationContextHolder';

const loadableProps = { fallback: <Spinner size="large" /> };
const Dashboard = loadable(() => import('views/Dashboard'), loadableProps);
const Community = loadable(() => import('views/Community'), loadableProps);
const Studies = loadable(() => import('views/Studies'), loadableProps);
const MyProfile = loadable(() => import('views/MyProfile'), loadableProps);
const Settings = loadable(() => import('views/Settings'), loadableProps);
const DataExploration = loadable(() => import('views/DataExploration'), loadableProps);
const Variants = loadable(() => import('views/Variants'), loadableProps);

const App = () => {
  const lang = useLang();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFR : enUS}
      renderEmpty={() => <Empty imageType="grid" />}
    >
      <div className="App" id="appContainer">
        {keycloakIsReady ? (
          <AuthMiddleware>
            <Router>
              <Switch>
                <Route
                  path={STATIC_ROUTES.GEN3_FENCE_REDIRECT}
                  exact
                  render={() => <FenceRedirect fence={FENCE_NAMES.gen3} />}
                />
                <Route
                  path={STATIC_ROUTES.CAVATICA_FENCE_REDIRECT}
                  exact
                  render={() => <FenceRedirect fence={FENCE_NAMES.cavatica} />}
                />
                <Route exact path={STATIC_ROUTES.LOGIN}>
                  <SideImageLayout sideImgSrc={MainSideImage}>
                    <Login />
                  </SideImageLayout>
                </Route>
                <Route
                  path={DYNAMIC_ROUTES.ERROR}
                  render={(props: RouteComponentProps<{ status?: any }>) => (
                    <ErrorPage status={props.match.params.status} />
                  )}
                />
                <ProtectedRoute exact path={STATIC_ROUTES.DASHBOARD} layout={PageLayout}>
                  <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute exact path={STATIC_ROUTES.COMMUNITY} layout={PageLayout}>
                  <Community />
                </ProtectedRoute>
                <ProtectedRoute exact path={STATIC_ROUTES.STUDIES} layout={PageLayout}>
                  <Studies />
                </ProtectedRoute>
                <ProtectedRoute exact path={DYNAMIC_ROUTES.DATA_EXPLORATION} layout={PageLayout}>
                  <DataExploration />
                </ProtectedRoute>
                <ProtectedRoute exact path={DYNAMIC_ROUTES.VARIANT} layout={PageLayout}>
                  <Variants />
                </ProtectedRoute>
                <ProtectedRoute exact path={STATIC_ROUTES.MY_PROFILE} layout={PageLayout}>
                  <MyProfile />
                </ProtectedRoute>
                <ProtectedRoute exact path={STATIC_ROUTES.SETTINGS} layout={PageLayout}>
                  <Settings />
                </ProtectedRoute>
                <Redirect from="*" to={STATIC_ROUTES.DASHBOARD} />
              </Switch>
              <NotificationContextHolder />
            </Router>
          </AuthMiddleware>
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
