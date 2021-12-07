import { GlobalInitialState } from "store/global";
import { UserInitialState } from "store/user";

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState
};
