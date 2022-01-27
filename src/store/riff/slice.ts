import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "store/riff/types";
import { fetchUser } from "./thunks";

export const RiffState: initialState = {
  entities: [],
  isLoading: false,
  error: undefined,
};

const riffSlice = createSlice({
  name: "riff",
  initialState: RiffState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Riff User
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.entities = action.payload || [];
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const riffActions = riffSlice.actions;
export default riffSlice.reducer;
