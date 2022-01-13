import { Button, Result } from "antd";
import { ExceptionStatusType } from "antd/lib/result";
import history from "utils/history";
import { STATIC_ROUTES } from "utils/routes";

import styles from "./index.module.scss";

interface OwnProps {
  status?: ExceptionStatusType;
}

const getResultProps = (
  status: ExceptionStatusType
): {
  status: ExceptionStatusType;
  title: string;
  subTitle: string;
} => {
  switch (status.toString()) {
    case "403":
      return {
        status: "403",
        title: "403",
        subTitle: "Sorry, you are not authorized to access this page.",
      };
    case "404":
      return {
        status: "404",
        title: "404",
        subTitle: "Sorry, the page you visited does not exist.",
      };
    default:
      return {
        status: "500",
        title: "500",
        subTitle: "Sorry, something went wrong.",
      };
  }
};

const ErrorPage = ({ status }: OwnProps) => {
  return (
    <Result
      className={styles.errorPage}
      {...getResultProps(status || "500")}
      extra={
        <Button type="primary" onClick={() => history.push(STATIC_ROUTES.HOME)}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
