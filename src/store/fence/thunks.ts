import { createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import {
  deleteFenceTokens,
  fenceConnect,
  getFenceConnection,
} from "services/fenceApi";
import {} from "store/fence/types";
import { RootState } from "store/types";
import {
  ALL_FENCE_NAMES,
  FENCE_CONNECTION_STATUSES,
  FENCE_NAMES,
} from "utils/fenceTypes";

const fetchAllFenceConnections = createAsyncThunk<
  any,
  never,
  { state: RootState }
>("fence/fetch/all/connections", async (_, thunkAPI) => {
  ALL_FENCE_NAMES.forEach((fenceName) =>
    thunkAPI.dispatch(fetchFenceConnection(FENCE_NAMES.gen3))
  );
});

const fetchFenceConnection = createAsyncThunk<
  any,
  FENCE_NAMES,
  { state: RootState }
>(
  "fence/fetch/connection",
  async (fenceName) => {
    const connection = await getFenceConnection(fenceName);
    return connection;
  },
  {
    condition: (fenceName, { getState }) => {
      const { fence } = getState();

      return (
        isEmpty(fence.connectionStatus[fenceName]) &&
        [
          FENCE_CONNECTION_STATUSES.unknown,
          FENCE_CONNECTION_STATUSES.connected,
        ].includes(fence.connectionStatus[fenceName])
      );
    },
  }
);

const connectFence = createAsyncThunk<any, FENCE_NAMES>(
  "fence/connect",
  async (fenceName, thunkAPI) => {
    try {
      await fenceConnect(fenceName);
      const connection = await getFenceConnection(fenceName);
      return connection;
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);

const disconnectFence = createAsyncThunk<any, FENCE_NAMES>(
  "fence/disconnect",
  async (fenceName, thunkAPI) => {
    try {
      await deleteFenceTokens(fenceName);
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);

export {
  fetchAllFenceConnections,
  fetchFenceConnection,
  connectFence,
  disconnectFence,
};
