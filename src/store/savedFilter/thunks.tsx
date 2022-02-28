import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TUserSavedFilter,
  TUserSavedFilterInsert,
  TUserSavedFilterUpdate,
} from 'services/api/savedFilter/models';
import { SavedFilterApi } from 'services/api/savedFilter';
import { handleThunkApiReponse } from 'store/utils';
import { notification } from 'antd';
import intl from 'react-intl-universal';

const fetchSavedFilters = createAsyncThunk<
  TUserSavedFilter[],
  void | string,
  { rejectValue: string }
>('savedfilters/fetch', async (tag, thunkAPI) => {
  const { data, error } = await SavedFilterApi.fetchAll(tag as string);

  return handleThunkApiReponse({
    error,
    data: data || [],
    reject: thunkAPI.rejectWithValue,
  });
});

const createSavedFilter = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterInsert,
  { rejectValue: string }
>('savedfilters/create', async (filter, thunkAPI) => {
  const { data, error } = await SavedFilterApi.create(filter);

  return handleThunkApiReponse({
    error,
    data: data!,
    reject: thunkAPI.rejectWithValue,
  });
});

const updateSavedFilter = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterUpdate & { id: string },
  { rejectValue: string }
>('savedfilters/update', async (filter, thunkAPI) => {
  const { id, ...filterInfo } = filter;
  const { data, error } = await SavedFilterApi.update(id, filterInfo);

  return handleThunkApiReponse({
    error,
    data: data!,
    reject: thunkAPI.rejectWithValue,
    onError: () => {
      notification.error({
        message: intl.get('api.savedFilter.error.title'),
        description: intl.get('api.savedFilter.error.messageUpdate'),
      });
    },
  });
});

const setSavedFilterAsDefault = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterUpdate & { id: string },
  { rejectValue: string }
>('savedfilters/setDefault', async (filter, thunkAPI) => {
  const { id, ...filterInfo } = filter;
  const { data, error } = await SavedFilterApi.setAsDefault(id, filterInfo);

  return handleThunkApiReponse({
    error,
    data: data!,
    reject: thunkAPI.rejectWithValue,
  });
});

const deleteSavedFilter = createAsyncThunk<string, string, { rejectValue: string }>(
  'savedfilters/delete',
  async (id, thunkAPI) => {
    const { data, error } = await SavedFilterApi.destroy(id);

    return handleThunkApiReponse({
      error,
      data: data!,
      reject: thunkAPI.rejectWithValue,
      onError: () => {
        notification.error({
          message: intl.get('api.savedFilter.error.title'),
          description: intl.get('api.savedFilter.error.messageDelete'),
        });
      },
    });
  },
);

export {
  fetchSavedFilters,
  createSavedFilter,
  updateSavedFilter,
  deleteSavedFilter,
  setSavedFilterAsDefault,
};