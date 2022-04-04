import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import Spinner from 'components/uiKit/Spinner';
import { useUser } from 'store/user';
import { fetchUser } from 'store/user/thunks';
import { userActions } from 'store/user/slice';
import { fetchSavedFilters } from 'store/savedFilter/thunks';

type Props = {
  children: React.ReactElement;
};

const Authenticator = ({ children }: Props) => {
  const { isLoading } = useUser();
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();

  useEffect(() => {
    if (keycloak.authenticated) {
      dispatch(fetchUser());
      dispatch(fetchSavedFilters());
    } else {
      dispatch(userActions.setIsUserLoading(false));
    }
  }, [dispatch, keycloak]);

  return isLoading ? <Spinner size={'large'} /> : children;
};

export default Authenticator;
