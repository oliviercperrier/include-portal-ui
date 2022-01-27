import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "store/riff/types";
import { fetchUser, updateFilter, deleteFilter } from "./thunks";

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
      state.entities = action.payload || [];
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Update Saved Filter
    builder.addCase(updateFilter.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(updateFilter.fulfilled, (state, action) => {
      const updatedIndex = state.entities.findIndex(
        (entity) => entity.id === action.payload.id
      );
      state.entities[updatedIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateFilter.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Delete Saved Filter
    builder.addCase(deleteFilter.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(deleteFilter.fulfilled, (state, action) => {
      state.entities = state.entities.filter(
        (entity) => entity.id !== action.payload.id
      );
      state.isLoading = false;
    });
    builder.addCase(deleteFilter.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const riffActions = riffSlice.actions;
export default riffSlice.reducer;
