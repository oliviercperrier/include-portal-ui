import { useEffect } from "react";
import { FENCE_NAMES } from "common/fenceTypes";
import { sendRequest } from "services/api";
import EnvironmentVariables from "helpers/EnvVariables";

type OwnProps = {
  fence: FENCE_NAMES;
};

const FENCE_AUTH_TOKENS_URI = EnvironmentVariables.configFor(
  "FENCE_AUTH_TOKENS_URI"
);

/*
 * Redirect Page Component
 * This component gets rendered in a new window. Nothing is rendered.
 * The code query param is sent to the Fence Token endpoint to request a token pair.
 */
const FenceRedirect = ({ fence }: OwnProps) => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      sendRequest({
        method: "GET",
        url: `${FENCE_AUTH_TOKENS_URI}?fence=${fence}&code=${code}`,
      }).then(({ error, data }) => {
        if (!error) {
          window.close();
        }

        console.error(error);
        window.alert(
          "Something went wrong, please refresh your window and try again."
        );
        window.close();
      });
    } else {
      window.alert(
        "Something went wrong (no code in the response), please refresh your window and try again."
      );
      window.close();
    }
  });

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <strong>Please wait while you are redirected.</strong>
      <strong>Do not close or refresh your browser.</strong>
    </div>
  );
};

export default FenceRedirect;
