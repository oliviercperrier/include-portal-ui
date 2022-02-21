import { createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { deleteFenceTokens, fenceConnect, getFenceConnection } from 'services/fenceApi';
import {} from 'store/fenceConnection/types';
import { RootState } from 'store/types';
import { ALL_FENCE_NAMES, FENCE_CONNECTION_STATUSES, FENCE_NAMES } from 'common/fenceTypes';

const fetchAllFenceConnections = createAsyncThunk<any, never, { state: RootState }>(
  'fence/fetch/all/connections',
  async (_, thunkAPI) => {
    ALL_FENCE_NAMES.forEach(
      async (fenceName) => await thunkAPI.dispatch(fetchFenceConnection(fenceName)),
    );
  },
);

const fetchFenceConnection = createAsyncThunk<any, FENCE_NAMES, { state: RootState }>(
  'fence/fetch/connection',
  async (fenceName, thunkApi) => {
    const { data, error } = await getFenceConnection(fenceName);

    if (error) {
      return thunkApi.rejectWithValue('error');
    }

    return data;
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
  async (fenceName, thunkAPI) => {
    try {
      await fenceConnect(fenceName);
      const { data, error } = await getFenceConnection(fenceName);

      if (error) {
        return thunkAPI.rejectWithValue(`An error occured while trying to connect to ${fenceName}`);
      }

      return data;
    } catch {
      return thunkAPI.rejectWithValue('error');
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
