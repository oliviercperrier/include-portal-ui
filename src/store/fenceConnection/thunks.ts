import { createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { deleteFenceTokens, fenceConnect, getFenceConnection } from 'services/fenceApi';
import {} from 'store/fenceConnection/types';
import { RootState } from 'store/types';
import { ALL_FENCE_NAMES, FENCE_CONNECTION_STATUSES, FENCE_NAMES } from 'common/fenceTypes';
import { handleThunkApiReponse } from 'store/utils';
import { FenceApi } from 'services/api/fence';
import { IFenceAuthPayload, IFenceInfo } from 'services/api/fence/models';

/* NEW NEW NEW */

const checkFencesAuthStatus = createAsyncThunk<void, void, { state: RootState }>(
  'fence/checkAll/auth/status',
  async (_, thunkAPI) => {
    ALL_FENCE_NAMES.forEach(async (fence) => await thunkAPI.dispatch(checkFenceAuthStatus(fence)));
  },
);

const checkFenceAuthStatus = createAsyncThunk<IFenceAuthPayload, FENCE_NAMES, { state: RootState }>(
  'fence/check/auth/status',
  async (fence, thunkAPI) => {
    const { data, error } = await FenceApi.isAuthenticated(fence);

    return handleThunkApiReponse({
      error,
      data: data!,
      reject: thunkAPI.rejectWithValue,
    });
  },
);

const connectToFence = createAsyncThunk<IFenceInfo, FENCE_NAMES, { state: RootState }>(
  'fence/connection',
  async (fence, thunkAPI) => {
    const { fenceConnection } = thunkAPI.getState();
    let fenceInfo = fenceConnection.fencesInfo[fence];

    if (!fenceInfo) {
      const { data } = await FenceApi.fetchInfo(fence);
      fenceInfo = data;
    }

    const authUrl = `${fenceInfo?.authorize_uri}?client_id=${fenceInfo?.client_id}&response_type=code&scope=${fenceInfo?.scope}&redirect_uri=${fenceInfo?.redirect_uri}`;
    window.open(authUrl);

    return fenceInfo!;
  },
  {
    condition: (fence, { getState }) => !getState().fenceConnection.connectedFences.includes(fence),
  },
);

const disconnectFromFence = createAsyncThunk<any, FENCE_NAMES>(
  'fence/disconnection',
  async (fenceName, thunkAPI) => {},
);

/* OLD OLD OLD */

const fetchAllFenceConnections = createAsyncThunk<any, never, { state: RootState }>(
  'fence/fetch/all/connections',
  async (_, thunkAPI) => {
    ALL_FENCE_NAMES.forEach(
      async (fenceName) => await thunkAPI.dispatch(fetchFenceConnection(fenceName)),
    );
  },
);

const fetchFenceConnection = createAsyncThunk<
  any,
  FENCE_NAMES,
  {
    state: RootState;
    rejectValue: {
      message: string;
      skipConnectionError: boolean;
    };
  }
>(
  'fence/fetch/connection',
  async (fenceName, thunkApi) => {
    try {
      const { data, error } = await getFenceConnection(fenceName);
      return handleThunkApiReponse({
        error,
        data: {
          data: data!,
          skipConnectionError: false,
        },
        reject: (error) => {
          return thunkApi.rejectWithValue({
            message: error,
            skipConnectionError: false,
          });
        },
      });
    } catch (e: any) {
      return thunkApi.rejectWithValue({
        message: e.message || 'error',
        skipConnectionError: e.status === 404,
      });
    }
  },
  {
    condition: (fenceName, { getState }) => {
      const { fenceConnection } = getState();

      return (
        isEmpty(fenceConnection.connections[fenceName]) &&
        [FENCE_CONNECTION_STATUSES.unknown, FENCE_CONNECTION_STATUSES.connected].includes(
          fenceConnection.connectionStatus[fenceName],
        )
      );
    },
  },
);

const connectFence = createAsyncThunk<any, FENCE_NAMES>(
  'fence/connect',
  async (fenceName, thunkApi) => {
    try {
      await fenceConnect(fenceName);
      const { data, error } = await getFenceConnection(fenceName);

      return handleThunkApiReponse({
        error,
        data: data!,
        reject: thunkApi.rejectWithValue,
      });
    } catch {
      return thunkApi.rejectWithValue('error');
    }
  },
);

const disconnectFence = createAsyncThunk<any, FENCE_NAMES>(
  'fence/disconnect',
  async (fenceName, thunkAPI) => {
    try {
      await deleteFenceTokens(fenceName);
    } catch {
      return thunkAPI.rejectWithValue('error');
    }
  },
);

export {
  connectToFence,
  disconnectFromFence,
  checkFenceAuthStatus,
  checkFencesAuthStatus,
  fetchAllFenceConnections,
  fetchFenceConnection,
  connectFence,
  disconnectFence,
};
