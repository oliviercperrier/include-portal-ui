import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import ConditionalWrapper from "components/utils/ConditionalWrapper";
import { STATIC_ROUTES } from "utils/routes";
import { useUser } from "store/user";

type OwnProps = RouteProps & {
  layout?: (children: any) => React.ReactElement;
};

const ProtectedRoute = ({ ...routeProps }: OwnProps) => {
  const { user, error } = useUser();
  const { keycloak } = useKeycloak();
  const Layout = routeProps.layout!;
  const userNeedsToLogin = !user || !keycloak.authenticated;

  if (error) {
    return <Redirect to={STATIC_ROUTES.ERROR} />;
  }

  if (userNeedsToLogin) {
    return <Redirect to={STATIC_ROUTES.LOGIN} />;
  }

  if (
    !user.accepted_terms ||
    !user.understand_disclaimer ||
    !user.completed_registration
  ) {
    return <Redirect to={STATIC_ROUTES.JOIN} />;
  }

  const currentPath = routeProps.path;

  if (currentPath === STATIC_ROUTES.LOGIN) {
    return <Redirect to={STATIC_ROUTES.DASHBOARD} />;
  }

  return (
    <ConditionalWrapper
      condition={Layout !== undefined}
      children={<Route {...routeProps} />}
      wrapper={(children) => <Layout>{children}</Layout>}
    />
  );
};

export default ProtectedRoute;
