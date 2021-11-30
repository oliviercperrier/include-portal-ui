import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import { hasUserRole } from "helpers/roles";
import { STATIC_ROUTES } from "utils/routes";

const ProtectedRoute = ({ ...routeProps }: RouteProps) => {
  const { user } = { user: { roles: ["allo"], acceptedTerms: true } } as any; //useUser(); TODO
  const { keycloak } = useKeycloak();
  const userNeedsToLogin = !keycloak.authenticated;

  if (userNeedsToLogin) {
    return <Redirect to={STATIC_ROUTES.HOME} />;
  }

  if (!hasUserRole(user)) {
    return <Redirect to={STATIC_ROUTES.JOIN} />;
  }

  if (!user!.acceptedTerms) {
    return <Redirect to={STATIC_ROUTES.TERMS} />;
  }

  const currentPath = routeProps.path;
  if (currentPath === STATIC_ROUTES.HOME) {
    return <Redirect to={STATIC_ROUTES.DASHBOARD} />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
