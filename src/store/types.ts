import { GlobalInitialState } from 'store/global';
import { UserInitialState } from 'store/user';
import { FenceConnectionInitialState } from 'store/fenceConnection';
import { RiffInitialState } from './riff';
import { SavedFilterInitialState } from './savedFilter';
import { ReportInitialState } from './report';
import { cavaticaInitialState } from './cavatica';
import { fenceStudiesInitialState } from './fenceStudies';

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  report: ReportInitialState;
  fenceConnection: FenceConnectionInitialState;
  fenceStudies: fenceStudiesInitialState;
  riff: RiffInitialState;
  savedFilter: SavedFilterInitialState;
  cavatica: cavaticaInitialState;
};
