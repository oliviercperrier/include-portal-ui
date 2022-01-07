import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "services/api/user";

const fetchUser = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
  const { data, error } = await UserApi.fetchUser();

  if (!error) {
    return data;
  }

  if (error?.response?.status === 404) {
    const { data: newUser, error: newUserError } = await UserApi.createUser();
    if (newUserError) {
      return thunkAPI.rejectWithValue(error?.message);
    }
    return newUser;
  } else {
    return thunkAPI.rejectWithValue(error?.message);
  }
});

export { fetchUser };
