import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { RiffApi } from 'services/api/riff';
import { TRiffEntity } from 'services/api/riff/models';
import { TRiffContent } from './types';
import intl from 'react-intl-universal';
import { handleThunkApiReponse } from 'store/utils';

const fetchUser = createAsyncThunk<TRiffEntity<TRiffContent>[], void, { rejectValue: string }>(
  'riff/user/fetch',
  async (_, thunkAPI) => {
    const { data, error } = await RiffApi.fetchRiffUser();

    return handleThunkApiReponse({
      error,
      data: data!,
      reject: thunkAPI.rejectWithValue,
      onError: (error) =>
        notification.error({
          message: intl.get('api.riff.error.title'),
          description: intl.get('api.riff.error.fetchUser'),
        }),
    });
  },
);

export { fetchUser };
