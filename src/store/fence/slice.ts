import { createSlice } from "@reduxjs/toolkit";
import { omit } from "lodash";
import { initialState } from "store/fence/types";
import { FENCE_CONNECTION_STATUSES, FENCE_NAMES } from "utils/fenceTypes";
import { connectFence, fetchFenceConnection } from "./thunks";

export const FenceState: initialState = {
  loadingFences: [],
  connectionStatus: {
    [FENCE_NAMES.gen3]: FENCE_CONNECTION_STATUSES.unknown,
    [FENCE_NAMES.dcf]: FENCE_CONNECTION_STATUSES.unknown,
  },
  fencesConnectError: [],
  fencesDisconnectError: [],
  fenceConnections: {},
};

const removeLoadingFences = (state: initialState, fenceName: FENCE_NAMES) =>
  state.loadingFences.filter((name) => name !== fenceName);

const addLoadingFences = (state: initialState, fenceName: FENCE_NAMES) =>
  state.loadingFences.includes(fenceName)
    ? state.loadingFences
    : [...state.loadingFences, fenceName];

const fenceSlice = createSlice({
  name: "fence",
  initialState: FenceState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH FENCE
    builder.addCase(fetchFenceConnection.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
    });
    builder.addCase(fetchFenceConnection.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] =
        FENCE_CONNECTION_STATUSES.connected;
      state.fenceConnections[action.meta.arg] = action.payload;
    });
    builder.addCase(fetchFenceConnection.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.fencesConnectError = [...state.fencesConnectError, action.meta.arg];
      state.connectionStatus[action.meta.arg] =
        FENCE_CONNECTION_STATUSES.disconnected;
    });

    // CONNECT FENCE
    builder.addCase(connectFence.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
    });
    builder.addCase(connectFence.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] =
        FENCE_CONNECTION_STATUSES.connected;
      state.fenceConnections[action.meta.arg] = action.payload;
    });
    builder.addCase(connectFence.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.fencesConnectError = [...state.fencesConnectError, action.meta.arg];
      state.fenceConnections = omit(state.fenceConnections, [action.meta.arg]);
      state.connectionStatus[action.meta.arg] =
        FENCE_CONNECTION_STATUSES.disconnected;
    });

    // DISCONNECT FENCE
    builder.addCase(connectFence.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
    });
    builder.addCase(connectFence.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] =
        FENCE_CONNECTION_STATUSES.disconnected;
      state.fenceConnections = omit(state.fenceConnections, [action.meta.arg]);
    });
    builder.addCase(connectFence.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.fencesDisconnectError = [
        ...state.fencesDisconnectError,
        action.meta.arg,
      ];
      state.connectionStatus[action.meta.arg] =
        FENCE_CONNECTION_STATUSES.disconnected;
      state.fenceConnections = omit(state.fenceConnections, [action.meta.arg]);
    });
  },
});

export default fenceSlice.reducer;
