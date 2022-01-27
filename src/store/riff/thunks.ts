import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { RiffApi } from "services/api/riff";
import { TRiffEntity } from "services/api/riff/models";
import { TRiffContent } from "./types";
import intl from "react-intl-universal";
import { AxiosError } from "axios";

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

export { fetchUser };
