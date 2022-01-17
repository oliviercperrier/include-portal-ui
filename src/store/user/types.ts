import { TUser } from "services/api/user/models";

export type initialState = {
  user: TUser | null;
  isLoading: boolean;
  isUpdating: boolean;
  error?: string;
};
