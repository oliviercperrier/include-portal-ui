import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { RiffApi } from "services/api/riff";
import {
  TRiffEntity,
  TRiffEntityCreate,
  TUpdateFilterArg,
} from "services/api/riff/models";
import { RIFF_TYPES, TRiffContent, TRiffSavedFilterContent } from "./types";
import intl from "react-intl-universal";
import { AxiosError } from "axios";
import { RootState } from "store/types";

const fetchUser = createAsyncThunk<
  TRiffEntity<TRiffContent>[],
  void,
  { rejectValue: string }
>("riff/user/fetch", async (_, thunkAPI) => {
  const { data, error } = await RiffApi.fetchRiffUser();

  return handleApiResponse(
    error,
    data,
    thunkAPI.rejectWithValue,
    "riff.error.fetchUser"
  );
});

const createFilter = createAsyncThunk<
  TRiffEntity<TRiffSavedFilterContent>,
  TRiffEntityCreate<TRiffSavedFilterContent>,
  { rejectValue: string }
>("riff/create/filter", async (updateData, thunkAPI) => {
  const { data, error } =
    await RiffApi.createRiffEntity<TRiffSavedFilterContent>(updateData);

  return handleApiResponse(
    error,
    data,
    thunkAPI.rejectWithValue,
    "riff.error.saveFilter"
  );
});

const updateFilter = createAsyncThunk<
  TRiffEntity<TRiffSavedFilterContent>,
  TUpdateFilterArg,
  { state: RootState; rejectValue: string }
>("riff/update/filter", async (updateData, thunkAPI) => {
  const { riff } = thunkAPI.getState();
  const filterRiffEntity = findFilterRiffEntity(
    riff.entities,
    updateData.savedFilter.id
  );

  const { data, error } = await RiffApi.updateSavedFilter({
    riffId: filterRiffEntity?.id,
    ...updateData,
  });

  return handleApiResponse(
    error,
    data,
    thunkAPI.rejectWithValue,
    "riff.error.saveFilter"
  );
});

const deleteFilter = createAsyncThunk<
  { id: string },
  string,
  { state: RootState; rejectValue: string }
>("riff/delete/filter", async (savedFilterId, thunkAPI) => {
  const { riff } = thunkAPI.getState();
  const filterRiffEntity = findFilterRiffEntity(riff.entities, savedFilterId);

  const { error } = await RiffApi.deleteSavedFilter(filterRiffEntity.id);

  return handleApiResponse(
    error,
    {
      id: filterRiffEntity.id,
    },
    thunkAPI.rejectWithValue,
    "riff.error.deleteFilter"
  );
});

const findFilterRiffEntity = (
  entities: TRiffEntity<TRiffContent>[],
  savedFilterId: string
) =>
  entities.find(
    (entity) =>
      entity.content.riffType === RIFF_TYPES.FILTER &&
      entity.content.filter.id === savedFilterId
  )!;

const handleApiResponse = (
  error: AxiosError | undefined,
  data: any,
  reject: (error: string) => any,
  errorDescKey: string = "global.notification.genericError"
) => {
  if (error) {
    notification.error({
      message: intl.get("riff.error.title"),
      description: intl.get(errorDescKey),
    });
    reject(error.message);
  }

  return data;
};

export { fetchUser, updateFilter, deleteFilter, createFilter };
