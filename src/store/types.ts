import { GlobalInitialState } from "store/global";
import { UserInitialState } from "store/user";
import { FenceInitialState } from "store/fence";

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  fence: FenceInitialState;
};
