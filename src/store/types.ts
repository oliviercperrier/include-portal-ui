import { GlobalInitialState } from 'store/global';
import { UserInitialState } from 'store/user';
import { FenceConnectionInitialState } from 'store/fenceConnection';
import { RiffInitialState } from './riff';
import { SavedFilterInitialState } from './savedFilter';
import { ReportInitialState } from './report';

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  report: ReportInitialState;
  fenceConnection: FenceConnectionInitialState;
  riff: RiffInitialState;
  savedFilter: SavedFilterInitialState;
};
