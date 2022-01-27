import { GlobalInitialState } from "store/global";
import { UserInitialState } from "store/user";
import { RiffInitialState } from "./riff";
import { SavedFilterInitialState } from "./savedFilter";

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  riff: RiffInitialState;
  savedFilter: SavedFilterInitialState;
};
