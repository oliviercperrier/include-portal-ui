import React from "react";
import intl from "react-intl-universal";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router";
import KeycloakProvider from "provider/KeycloakProvider";
import history from "utils/history";
import getStoreConfig from "store";
import { LANG } from "utils/constants";
import locales from "locales";

const { store, persistor } = getStoreConfig();
persistor.subscribe(function () {
  intl.init({
    currentLocale: store.getState().global.lang || LANG.EN,
    locales,
  });
});

export default ({ children }: any) => {
  return (
    <KeycloakProvider>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>{children}</Router>
        </PersistGate>
      </ReduxProvider>
    </KeycloakProvider>
  );
};
