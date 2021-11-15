import React from "react";
import { Switch, Route } from "react-router-dom";
import { Router } from "react-router";
import history from "utils/history";

import Home from "views/screens/Home";
import Dashboard from "views/screens/Dashboard";

const AppRouter = (): React.ReactElement => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
