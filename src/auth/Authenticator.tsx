import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import Spinner from "components/uiKit/Spinner";
import { useUser } from "store/user";
import { fetchUser } from "store/user/thunks";

type Props = {
  children: React.ReactElement;
};

const Authenticator = (props: Props) => {
  const user = useUser();
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();

  useEffect(() => {
    if (keycloak.authenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, keycloak]);

  return user.isLoading ? <Spinner size={"large"} /> : props.children;
};

export default Authenticator;
