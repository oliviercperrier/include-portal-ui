import { createSlice } from '@reduxjs/toolkit';
import { omit } from 'lodash';
import { initialState } from 'store/fenceConnection/types';
import { FENCE_CONNECTION_STATUSES, FENCE_NAMES } from 'common/fenceTypes';
import { connectFence, disconnectFence, fetchFenceConnection } from './thunks';

export const FenceConnectionState: initialState = {
  loadingFences: [],
  connectionStatus: {
    [FENCE_NAMES.gen3]: FENCE_CONNECTION_STATUSES.unknown,
    [FENCE_NAMES.cavatica]: FENCE_CONNECTION_STATUSES.unknown,
  },
  fencesConnectError: [],
  fencesDisconnectError: [],
  connections: {},
};

const removeFenceAuthError = (state: FENCE_NAMES[], fenceName: FENCE_NAMES) =>
  state.filter((name) => name !== fenceName);

const removeLoadingFences = (state: initialState, fenceName: FENCE_NAMES) =>
  state.loadingFences.filter((name) => name !== fenceName);

const addLoadingFences = (state: initialState, fenceName: FENCE_NAMES) =>
  state.loadingFences.includes(fenceName)
    ? state.loadingFences
    : [...state.loadingFences, fenceName];

const fenceConnectionSlice = createSlice({
  name: 'fence',
  initialState: FenceConnectionState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH FENCE CONNECTION
    builder.addCase(fetchFenceConnection.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
      state.fencesConnectError = removeFenceAuthError(state.fencesConnectError, action.meta.arg);
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
      state.fencesConnectError = removeFenceAuthError(state.fencesConnectError, action.meta.arg);
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
      state.fencesDisconnectError = removeFenceAuthError(
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
