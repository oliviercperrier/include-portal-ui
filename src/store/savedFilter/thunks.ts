import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TUserSavedFilter,
  TUserSavedFilterInsert,
  TUserSavedFilterUpdate,
} from "services/api/savedFilter/models";
import { SavedFilterApi } from "services/api/savedFilter";
import { handleApiReponse } from "store/utils";

const fetchSavedFilters = createAsyncThunk<
  TUserSavedFilter[],
  void | string,
  { rejectValue: string }
>("savedfilters/fetch", async (tag, thunkAPI) => {
  const { data, error } = await SavedFilterApi.fetchAll(tag as string);

  return handleApiReponse(error, data || [], thunkAPI.rejectWithValue);
});

const createSavedFilter = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterInsert,
  { rejectValue: string }
>("savedfilters/create", async (filter, thunkAPI) => {
  const { data, error } = await SavedFilterApi.create(filter);

  return handleApiReponse(error, data!, thunkAPI.rejectWithValue);
});

const updateSavedFilter = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterUpdate & { id: string },
  { rejectValue: string }
>("savedfilters/update", async (filter, thunkAPI) => {
  const { id, ...filterInfo } = filter;
  const { data, error } = await SavedFilterApi.update(id, filterInfo);

  return handleApiReponse(error, data!, thunkAPI.rejectWithValue);
});

const setSavedFilterAsDefault = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterUpdate & { id: string },
  { rejectValue: string }
>("savedfilters/setDefault", async (filter, thunkAPI) => {
  const { id, ...filterInfo } = filter;
  const { data, error } = await SavedFilterApi.setAsDefault(id, filterInfo);

  return handleApiReponse(error, data!, thunkAPI.rejectWithValue);
});

const deleteSavedFilter = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("savedfilters/delete", async (id, thunkAPI) => {
  const { data, error } = await SavedFilterApi.destroy(id);

  return handleApiReponse(error, data!, thunkAPI.rejectWithValue);
});

export {
  fetchSavedFilters,
  createSavedFilter,
  updateSavedFilter,
  deleteSavedFilter,
  setSavedFilterAsDefault,
};
