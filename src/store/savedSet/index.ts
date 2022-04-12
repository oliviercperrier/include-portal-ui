import { useSelector } from 'react-redux';
import { savedSetSelector } from './selector';
import EnvironmentVariables from '../../helpers/EnvVariables';

export type { initialState as SavedSetInitialState } from './types';
export { default, SavedSetState } from './slice';

export const MAX_LENGTH_NAME = 50;
export const FILED_ID = 'fhir_id';
export const PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');

// export const useSavedSet = () => useSelector(savedSetSelector);

export const useSavedSet = () => {
  console.log('IN useSavedSet');
  const toto = useSelector(savedSetSelector);
  console.log(toto, 'TOTOTO');
  return toto;
};
