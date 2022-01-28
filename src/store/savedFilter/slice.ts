import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "store/savedFilter/types";
import {
  createSavedFilter,
  deleteSavedFilter,
  fetchSavedFilters,
  updateSavedFilter,
} from "./thunks";

export const SavedFilterState: initialState = {
  savedFilters: [],
  isLoading: true,
  isUpdating: false,
};

const savedFilterSlice = createSlice({
  name: "user",
  initialState: SavedFilterState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchSavedFilters.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchSavedFilters.fulfilled, (state, action) => ({
      ...state,
      savedFilters: action.payload,
      isLoading: false,
    }));
    builder.addCase(fetchSavedFilters.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
    // Create
    builder.addCase(createSavedFilter.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(createSavedFilter.fulfilled, (state, action) => ({
      ...state,
      savedFilters: [...state.savedFilters, action.payload],
      isLoading: false,
    }));
    builder.addCase(createSavedFilter.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
    // Update
    builder.addCase(updateSavedFilter.pending, (state) => {
      state.isUpdating = true;
      state.error = undefined;
    });
    builder.addCase(updateSavedFilter.fulfilled, (state, action) => {
      const filters = [
        ...state.savedFilters.filter(({ id }) => action.payload.id !== id),
      ];

      return {
        ...state,
        savedFilters: [...filters, action.payload],
        isUpdating: false,
      };
    });
    builder.addCase(updateSavedFilter.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isUpdating: false,
    }));
    // Update
    builder.addCase(deleteSavedFilter.fulfilled, (state, action) => ({
      ...state,
      savedFilters: state.savedFilters.filter(
        ({ id }) => id !== action.payload
      ),
    }));
    builder.addCase(deleteSavedFilter.rejected, (state, action) => ({
      ...state,
      error: action.payload,
    }));
  },
});

export const savedFilterActions = savedFilterSlice.actions;
export default savedFilterSlice.reducer;
