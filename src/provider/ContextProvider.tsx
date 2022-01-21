import intl from "react-intl-universal";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import KeycloakProvider from "provider/KeycloakProvider";
import getStoreConfig from "store";
import { LANG } from "common/constants";
import locales from "locales";
import { ConfigProvider } from "antd";
import Empty from "@ferlab/ui/core/components/Empty";

const { store, persistor } = getStoreConfig();
persistor.subscribe(function () {
  intl.init({
    currentLocale: store.getState().global.lang || LANG.EN,
    locales,
  });
});

const ContextProvider = ({ children }: any) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty imageType="grid" />}>
      <KeycloakProvider>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor}>{children}</PersistGate>
        </ReduxProvider>
      </KeycloakProvider>
    </ConfigProvider>
  );
};

export default ContextProvider;
