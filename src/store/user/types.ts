import { TUser } from "services/api/user/models";

export type initialState = {
  userInfo: TUser | null;
  isLoading: boolean;
  isUpdating: boolean;
  error?: string;
};
