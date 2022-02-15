import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import ConditionalWrapper from "components/utils/ConditionalWrapper";
import { STATIC_ROUTES } from "utils/routes";
import { useUser } from "store/user";

type OwnProps = Omit<RouteProps, "component" | "render" | "children"> & {
  layout?: (children: any) => React.ReactElement;
  children: React.ReactNode;
};

const ProtectedRoute = ({ children, layout, ...routeProps }: OwnProps) => {
  const { userInfo, error } = useUser();
  const { keycloak } = useKeycloak();
  const RouteLayout = layout!;
  const userNeedsToLogin = !userInfo || !keycloak.authenticated;

  if (error) {
    return <Redirect to={STATIC_ROUTES.ERROR} />;
  }

  if (userNeedsToLogin) {
    return <Redirect to={STATIC_ROUTES.LOGIN} />;
  }

  if (
    !userInfo.accepted_terms ||
    !userInfo.understand_disclaimer ||
    !userInfo.completed_registration
  ) {
    return <Redirect to={STATIC_ROUTES.JOIN} />;
  }

  const currentPath = routeProps.path;

  if (currentPath === STATIC_ROUTES.LOGIN) {
    return <Redirect to={STATIC_ROUTES.DASHBOARD} />;
  }
  
  return (
    <ConditionalWrapper
      condition={RouteLayout !== undefined}
      children={<Route {...routeProps}>{children}</Route>}
      wrapper={(children) => <RouteLayout>{children}</RouteLayout>}
    />
  );
};

export default ProtectedRoute;
