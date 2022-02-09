import { GlobalInitialState } from "store/global";
import { UserInitialState } from "store/user";
import { FenceInitialState } from "store/fence";
import { RiffInitialState } from "./riff";
import { SavedFilterInitialState } from "./savedFilter";
import { ReportInitialState } from "./report";

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  report: ReportInitialState;
  fence: FenceInitialState;
  riff: RiffInitialState;
  savedFilter: SavedFilterInitialState;
};
