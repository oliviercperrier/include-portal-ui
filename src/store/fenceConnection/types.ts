import {
  FENCE_CONNECTION_STATUSES,
  FENCE_NAMES,
  TFenceConnections,
} from "common/fenceTypes";

export type initialState = {
  loadingFences: FENCE_NAMES[];
  fencesConnectError: FENCE_NAMES[];
  fencesDisconnectError: FENCE_NAMES[];
  connections: TFenceConnections;
  connectionStatus: {
    [FENCE_NAMES.gen3]: FENCE_CONNECTION_STATUSES;
    [FENCE_NAMES.cavatica]: FENCE_CONNECTION_STATUSES;
  };
};
