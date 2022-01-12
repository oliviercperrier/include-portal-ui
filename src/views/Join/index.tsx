import ScrollContent from "@ferlab/ui/core/layout/ScrollContent";
import { useUser } from "store/user";
import TermsStep from "./Terms";
import RegistrationStep from "./Registration";
import { Switch, Route, Redirect } from "react-router-dom";
import { STATIC_ROUTES } from "utils/routes";

import styles from "./index.module.scss";

const JoinPage = () => {
  const { user } = useUser();

  if (user?.completed_registration) {
    return <Redirect to={STATIC_ROUTES.DASHBOARD} />;
  }

  return (
    <ScrollContent className={styles.joinPageWrapper}>
      <div className={styles.contentWrapper}>
        <Switch>
          <Route
            exact
            path={STATIC_ROUTES.JOIN_TERMS}
            render={() => <TermsStep />}
          />
          <Route
            exact
            path={STATIC_ROUTES.JOIN_REGISTRATION}
            render={() => <RegistrationStep />}
          />
          <Redirect
            from="*"
            to={
              user?.accepted_terms && user.understand_disclaimer
                ? STATIC_ROUTES.JOIN_REGISTRATION
                : STATIC_ROUTES.JOIN_TERMS
            }
          />
        </Switch>
      </div>
    </ScrollContent>
  );
};

export default JoinPage;
