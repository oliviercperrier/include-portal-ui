import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserActionsEnum } from "store/user/types";
import keycloak from "initKeycloak";

const userApi: any = {
  fetchById: (token: string) => ({
    firstname: "Olivier Castro-Perrier",
  }),
}; // link the service to retrieve user

const fetchUser = createAsyncThunk<User>(
  UserActionsEnum.FETCH_USER,
  async (thunkAPI) => {
    const response = userApi.fetchById(keycloak.token);
    return response;
  }
);

export { fetchUser };
