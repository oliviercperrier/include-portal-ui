import useFeatureToggle from "hooks/useFeatureToggle";
import { Alert } from "antd";
import { getFTEnvVarByKey } from "helpers/EnvVariables";
import parseHTML from "html-react-parser";

import styles from "./index.module.scss";

const FT_FLAG_KEY = "SITE_WIDE_BANNER";
const BANNER_TYPE_KEY = FT_FLAG_KEY + "_TYPE";
const BANNER_MSG_KEY = FT_FLAG_KEY + "_MSG";

type AlterTypes = "success" | "info" | "warning" | "error";

const SiteWideBanner = () => {
  const { isEnabled, hideFeature } = useFeatureToggle("SITE_WIDE_BANNER");

  return (
    <>
      {isEnabled && (
        <Alert
          className={styles.siteWideBanner}
          type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, "info")}
          message={parseHTML(getFTEnvVarByKey(BANNER_MSG_KEY))}
          closable
          banner
          afterClose={hideFeature}
        />
      )}
    </>
  );
};

export default SiteWideBanner;
