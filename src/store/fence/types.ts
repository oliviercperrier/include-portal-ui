import {
  FENCE_CONNECTION_STATUSES,
  FENCE_NAMES,
  TFenceConnections,
} from "utils/fenceTypes";

export type initialState = {
  loadingFences: FENCE_NAMES[];
  fencesConnectError: FENCE_NAMES[];
  fencesDisconnectError: FENCE_NAMES[];
  fenceConnections: TFenceConnections;
  connectionStatus: {
    [FENCE_NAMES.gen3]: FENCE_CONNECTION_STATUSES;
    [FENCE_NAMES.dcf]: FENCE_CONNECTION_STATUSES;
  };
};
