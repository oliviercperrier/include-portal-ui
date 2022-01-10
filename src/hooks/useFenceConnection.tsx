import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFence } from "store/fence";
import { fetchAllFenceConnections } from "store/fence/thunks";
import { concatAllFencesAcls } from "store/fence/utils";
import {
  FENCE_CONNECTION_STATUSES,
  FENCE_NAMES,
  TFenceConnections,
} from "utils/fenceTypes";

type Output = {
  fenceConnections: TFenceConnections;
  fencesAllAcls: string[];
  connectionStatus: { [fenceName: string]: FENCE_CONNECTION_STATUSES };
  loadingFences: FENCE_NAMES[];
};

const useFenceConnections = (): Output => {
  const dispatch = useDispatch();
  const { fenceConnections, connectionStatus, loadingFences } = useFence();

  useEffect(() => {
    dispatch(fetchAllFenceConnections());
    // eslint-disable-next-line
  }, []);

  return {
    loadingFences,
    fenceConnections,
    fencesAllAcls: concatAllFencesAcls(fenceConnections),
    connectionStatus,
  };
};
export default useFenceConnections;
