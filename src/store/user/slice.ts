import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "store/user/types";
import keycloak from "auth/keycloak-api/keycloak";
import {
  completeRegistration,
  fetchUser,
  updateUser,
  updateUserConfig,
} from "store/user/thunks";

export const UserState: initialState = {
  userInfo: null,
  isLoading: true,
  isUpdating: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: UserState,
  reducers: {
    cleanLogout: (state) => {
      keycloak.logout({
        redirectUri: window.location.origin,
      });

      return UserState;
    },
    setIsUserLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
  extraReducers: (builder) => {
    // Fetch User
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => ({
      ...state,
      userInfo: action.payload,
      isLoading: false,
    }));
    builder.addCase(fetchUser.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
    // Update User
    builder.addCase(updateUser.pending, (state) => {
      state.isUpdating = true;
      state.error = undefined;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => ({
      ...state,
      userInfo: action.payload,
      isUpdating: false,
    }));
    builder.addCase(updateUser.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isUpdating: false,
    }));
    // Complete Registration
    builder.addCase(completeRegistration.pending, (state) => {
      state.isUpdating = true;
      state.error = undefined;
    });
    builder.addCase(completeRegistration.fulfilled, (state, action) => ({
      ...state,
      userInfo: action.payload,
      isUpdating: false,
    }));
    builder.addCase(completeRegistration.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isUpdating: false,
    }));
    // Update User Config
    builder.addCase(updateUserConfig.fulfilled, (state, action) => ({
      ...state,
      userInfo: {
        ...state.userInfo!,
        config: action.payload,
      },
    }));
    builder.addCase(updateUserConfig.rejected, (state, action) => ({
      ...state,
      error: action.payload,
    }));
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
