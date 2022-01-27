import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserApi } from "services/api/user";
import { TUser, TUserConfig, TUserUpdate } from "services/api/user/models";
import { RootState } from "store/types";
import { mergeDeep } from "utils/object";

const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  "user/fetch",
  async (_, thunkAPI) => {
    const { data, error } = await UserApi.fetchUser();

    if (!error) {
      return data!;
    }

    if (error?.response?.status === 404) {
      const { data: newUser, error: newUserError } = await UserApi.createUser();

      return handleUserReponse(
        newUserError,
        newUser!,
        thunkAPI.rejectWithValue
      );
    } else {
      return thunkAPI.rejectWithValue(error?.message);
    }
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
    const { data, error } = await UserApi.updateUser(args.data);

    return handleUserReponse(
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

    const deepCopyUserConfig = JSON.parse(JSON.stringify(user.user?.config));
    const deepCopyNewConfig = JSON.parse(JSON.stringify(config));
    const mergedConfig = mergeDeep<TUserConfig>(
      deepCopyUserConfig,
      deepCopyNewConfig
    );

    const { error } = await UserApi.updateUser({
      config: mergedConfig,
    });

    return handleUserReponse(error, mergedConfig, thunkAPI.rejectWithValue);
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

    return handleUserReponse(
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

const handleUserReponse = <T>(
  error: AxiosError | undefined,
  data: T,
  reject: (error: string) => any,
  callback?: () => void
) => {
  if (error) {
    return reject(error?.message);
  }

  if (callback) {
    callback();
  }

  return data;
};

export { fetchUser, updateUser, completeRegistration, updateUserConfig };
