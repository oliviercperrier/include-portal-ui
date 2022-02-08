import { GlobalInitialState } from "store/global";
import { UserInitialState } from "store/user";
import { FenceInitialState } from "store/fence";
import { RiffInitialState } from "./riff";
import { SavedFilterInitialState } from "./savedFilter";

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  fence: FenceInitialState;
  riff: RiffInitialState;
  savedFilter: SavedFilterInitialState;
};
