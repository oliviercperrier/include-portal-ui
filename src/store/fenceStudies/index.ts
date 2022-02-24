import { useSelector } from 'react-redux';
import { fenceStudiesSelector } from './selector';

export type { initialState as fenceStudiesInitialState } from './types';
export { default, FenceStudiesState } from './slice';
export const useFenceStudies = () => useSelector(fenceStudiesSelector);
