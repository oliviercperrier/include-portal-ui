import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "services/api/user";
import { TUser, TUserConfig, TUserUpdate } from "services/api/user/models";
import { RootState } from "store/types";
import { handleApiReponse } from "store/utils";
import { mergeDeep } from "utils/object";

const fetchUser = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string; state: RootState }
>(
  "user/fetch",
  async (_, thunkAPI) => {
    const { data, error } = await UserApi.fetch();

    if (!error) {
      return data!;
    }

    if (error?.response?.status === 404) {
      const { data: newUser, error: newUserError } = await UserApi.create();

      return handleApiReponse(newUserError, newUser!, thunkAPI.rejectWithValue);
    } else {
      return thunkAPI.rejectWithValue(error?.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState();
      if (user.userInfo) {
        return false;
      }
    },
  }
);

const updateUser = createAsyncThunk<
  TUser,
  {
    data: TUserUpdate;
    callback?: () => void;
  },
  { rejectValue: string }
>(
  "user/update",
  async (args, thunkAPI) => {
    const { data, error } = await UserApi.update(args.data);

    return handleApiReponse(
      error,
      data!,
      thunkAPI.rejectWithValue,
      args.callback
    );
  },
  {
    condition: (args) => {
      if (Object.keys(args.data).length < 1) {
        return false;
      }
    },
  }
);

const updateUserConfig = createAsyncThunk<
  TUserConfig,
  TUserConfig,
  { rejectValue: string; state: RootState }
>(
  "user/update/config",
  async (config, thunkAPI) => {
    const { user } = thunkAPI.getState();

    const deepCopyUserConfig = JSON.parse(
      JSON.stringify(user.userInfo?.config)
    );
    const deepCopyNewConfig = JSON.parse(JSON.stringify(config));
    const mergedConfig = mergeDeep<TUserConfig>(
      deepCopyUserConfig,
      deepCopyNewConfig
    );

    const { error } = await UserApi.update({
      config: mergedConfig,
    });

    return handleApiReponse(error, mergedConfig, thunkAPI.rejectWithValue);
  },
  {
    condition: (config) => {
      if (Object.keys(config).length < 1) {
        return false;
      }
    },
  }
);

const completeRegistration = createAsyncThunk<
  TUser,
  {
    data: TUserUpdate;
    callback?: () => void;
  },
  { rejectValue: string }
>(
  "user/complete/registration",
  async (args, thunkAPI) => {
    const { data, error } = await UserApi.completeRegistration(args.data);

    return handleApiReponse(
      error,
      data!,
      thunkAPI.rejectWithValue,
      args.callback
    );
  },
  {
    condition: (args) => {
      if (Object.keys(args.data).length < 1) {
        return false;
      }
    },
  }
);

export { fetchUser, updateUser, completeRegistration, updateUserConfig };
