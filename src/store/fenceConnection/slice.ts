import { createSlice } from '@reduxjs/toolkit';
import { merge, omit } from 'lodash';
import { initialState } from 'store/fenceConnection/types';
import { FENCE_CONNECTION_STATUSES, FENCE_NAMES } from 'common/fenceTypes';
import {
  checkFenceAuthStatus,
  connectFence,
  connectToFence,
  disconnectFence,
  fetchFenceConnection,
} from './thunks';

export const FenceConnectionState: initialState = {
  connectionStatus: {
    [FENCE_NAMES.gen3]: FENCE_CONNECTION_STATUSES.unknown,
    [FENCE_NAMES.cavatica]: FENCE_CONNECTION_STATUSES.unknown,
  },
  fencesInfo: {
    [FENCE_NAMES.gen3]: undefined,
    [FENCE_NAMES.cavatica]: undefined,
  },
  loadingFences: [],
  connectedFences: [],
  fencesConnectError: [],
  fencesDisconnectError: [],
  connections: {},
};

const removeFenceFromList = (state: FENCE_NAMES[], fenceName: FENCE_NAMES) =>
  state.filter((name) => name !== fenceName);

const removeLoadingFences = (state: initialState, fenceName: FENCE_NAMES) =>
  state.loadingFences.filter((name) => name !== fenceName);

const addLoadingFences = (state: initialState, fenceName: FENCE_NAMES) =>
  merge(state.loadingFences, [fenceName]);

const fenceConnectionSlice = createSlice({
  name: 'fence',
  initialState: FenceConnectionState,
  reducers: {},
  extraReducers: (builder) => {
    /** NEW */
    // CONNECT FENCE
    builder.addCase(connectToFence.pending, (state, action) => {
      state.loadingFences = merge(state.loadingFences, [action.meta.arg]);
      state.fencesConnectError = removeFenceFromList(state.fencesConnectError, action.meta.arg);
    });
    builder.addCase(connectToFence.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectedFences = merge(state.connectedFences, [action.meta.arg]);
      state.fencesInfo[action.meta.arg] = action.payload;
    });
    builder.addCase(connectToFence.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.fencesConnectError = [...state.fencesConnectError, action.meta.arg];
      state.connectedFences = removeFenceFromList(state.connectedFences, action.meta.arg);
    });

    // CHECK AUTH STATUS
    builder.addCase(checkFenceAuthStatus.pending, (state, action) => {
      state.loadingFences = merge(state.loadingFences, [action.meta.arg]);
    });
    builder.addCase(checkFenceAuthStatus.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      if (action.payload && action.payload.authenticated) {
        state.connectedFences = merge(state.connectedFences, [action.meta.arg]);
      }
    });
    builder.addCase(checkFenceAuthStatus.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectedFences = removeFenceFromList(state.connectedFences, action.meta.arg);
    });

    /** OLD  */

    // FETCH FENCE CONNECTION
    builder.addCase(fetchFenceConnection.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
      state.fencesConnectError = removeFenceFromList(state.fencesConnectError, action.meta.arg);
    });
    builder.addCase(fetchFenceConnection.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.connected;
      state.connections[action.meta.arg] = action.payload.data;
    });
    builder.addCase(fetchFenceConnection.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      if (!action.payload?.skipConnectionError) {
        state.fencesConnectError = [...state.fencesConnectError, action.meta.arg];
      }
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.disconnected;
    });

    // CONNECT FENCE
    builder.addCase(connectFence.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
      state.fencesConnectError = removeFenceFromList(state.fencesConnectError, action.meta.arg);
    });
    builder.addCase(connectFence.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.connected;
      state.connections[action.meta.arg] = action.payload;
    });
    builder.addCase(connectFence.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.fencesConnectError = [...state.fencesConnectError, action.meta.arg];
      state.connections = omit(state.connections, [action.meta.arg]);
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.disconnected;
    });

    // DISCONNECT FENCE
    builder.addCase(disconnectFence.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
      state.fencesDisconnectError = removeFenceFromList(
        state.fencesDisconnectError,
        action.meta.arg,
      );
    });
    builder.addCase(disconnectFence.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.disconnected;
      state.connections = omit(state.connections, [action.meta.arg]);
    });
    builder.addCase(disconnectFence.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.fencesDisconnectError = [...state.fencesDisconnectError, action.meta.arg];
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.disconnected;
      state.connections = omit(state.connections, [action.meta.arg]);
    });
  },
});

export default fenceConnectionSlice.reducer;
