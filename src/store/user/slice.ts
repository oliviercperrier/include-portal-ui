import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "store/user/types";
import { fetchUser } from "store/user/thunks";

export const UserState: initialState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => ({
      ...state,
      error: undefined,
      user: action.payload,
      isLoading: false,
    }));
    builder.addCase(fetchUser.rejected, (state, action) => ({
      ...state,
      error: action.payload as string,
      isLoading: false,
    }));
  },
});

export default userSlice.reducer;
