import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFenceConnection } from 'store/fenceConnection';
import { fetchAllFenceConnections } from 'store/fenceConnection/thunks';
import { concatAllFencesAcls } from 'store/fenceConnection/utils';
import { FENCE_CONNECTION_STATUSES, FENCE_NAMES, TFenceConnections } from 'common/fenceTypes';

type Output = {
  connections: TFenceConnections;
  fencesAllAcls: string[];
  connectionStatus: { [fenceName: string]: FENCE_CONNECTION_STATUSES };
  loadingFences: FENCE_NAMES[];
};

const useFenceConnections = (): Output => {
  const dispatch = useDispatch();
  const { connections, connectionStatus, loadingFences } = useFenceConnection();

  useEffect(() => {
    dispatch(fetchAllFenceConnections());
    // eslint-disable-next-line
  }, []);

  return {
    loadingFences,
    connections,
    fencesAllAcls: concatAllFencesAcls(connections),
    connectionStatus,
  };
};
export default useFenceConnections;
