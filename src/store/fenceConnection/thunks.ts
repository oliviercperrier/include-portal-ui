import { createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { deleteFenceTokens, fenceConnect, getFenceConnection } from 'services/fenceApi';
import {} from 'store/fenceConnection/types';
import { RootState } from 'store/types';
import { ALL_FENCE_NAMES, FENCE_CONNECTION_STATUSES, FENCE_NAMES } from 'common/fenceTypes';
import { handleThunkApiReponse } from 'store/utils';

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

export { fetchAllFenceConnections, fetchFenceConnection, connectFence, disconnectFence };
