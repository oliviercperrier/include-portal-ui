import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "services/api/user";
import { TUser, TUserUpdate } from "services/api/user/models";

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
>("user/update", async (args, thunkAPI) => {
  const { data, error } = await UserApi.updateUser(args.data);

  return handleUserReponse(
    error,
    data!,
    thunkAPI.rejectWithValue,
    args.callback
  );
});

const completeRegistration = createAsyncThunk<
  TUser,
  {
    data: TUserUpdate;
    callback?: () => void;
  },
  { rejectValue: string }
>("user/update", async (args, thunkAPI) => {
  const { data, error } = await UserApi.completeRegistration(args.data);

  return handleUserReponse(
    error,
    data!,
    thunkAPI.rejectWithValue,
    args.callback
  );
});

const handleUserReponse = (
  error: any,
  data: TUser,
  reject: (error: string) => any,
  callback?: () => void
) => {
  if (error) {
    return reject(error?.message);
  }

  if (callback) {
    callback();
  }

  return data!;
};

export { fetchUser, updateUser, completeRegistration };
