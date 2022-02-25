import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFenceConnection } from 'store/fenceConnection';
import { checkFencesAuthStatus } from 'store/fenceConnection/thunks';
import { concatAllFencesAcls } from 'store/fenceConnection/utils';
import { FENCE_NAMES, TFenceConnections } from 'common/fenceTypes';

type Output = {
  connections: TFenceConnections;
  fencesAllAcls: string[];
  connectedFences: FENCE_NAMES[];
  loadingFences: FENCE_NAMES[];
  fencesConnectError: FENCE_NAMES[];
};

const useFenceConnections = (): Output => {
  const dispatch = useDispatch();
  const { connections, connectedFences, loadingFences, fencesConnectError } = useFenceConnection();

  useEffect(() => {
    dispatch(checkFencesAuthStatus());
    // eslint-disable-next-line
  }, []);

  return {
    loadingFences,
    connections,
    fencesAllAcls: concatAllFencesAcls(connections),
    connectedFences,
    fencesConnectError,
  };
};
export default useFenceConnections;
