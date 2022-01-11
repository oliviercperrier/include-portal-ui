import ScrollContent from "@ferlab/ui/core/layout/ScrollContent";
import { useUser } from "store/user";
import TermsStep from "./Terms";
import RegistrationStep from "./Registration";

import styles from "./index.module.scss";

const JoinPage = () => {
  const { user } = useUser();

  return (
    <ScrollContent className={styles.joinPageWrapper}>
      <div className={styles.contentWrapper}>
        {!user?.accepted_terms ? <RegistrationStep /> : <TermsStep />}
      </div>
    </ScrollContent>
  );
};

export default JoinPage;
