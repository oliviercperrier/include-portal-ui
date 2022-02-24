import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFenceConnection } from 'store/fenceConnection';
import { computeAllFencesAuthStudies, fetchAllFenceStudies } from 'store/fenceStudies/thunks';
import { FENCE_NAMES } from 'common/fenceTypes';
import { useFenceStudies } from 'store/fenceStudies';
import { TFenceStudies, TFenceStudy } from 'store/fenceStudies/types';

type Output = {
  loadingStudiesForFences: FENCE_NAMES[];
  fenceStudies: TFenceStudies;
  fenceAuthStudies: TFenceStudy[];
  fencesError: FENCE_NAMES[];
};

const useFenceStudy = (): Output => {
  const dispatch = useDispatch();
  const { connections } = useFenceConnection();
  const { studies: fenceStudies, loadingStudiesForFences, fencesError } = useFenceStudies();

  useEffect(() => {
    dispatch(fetchAllFenceStudies());
    // eslint-disable-next-line
  }, [connections]);

  return {
    loadingStudiesForFences,
    fenceStudies,
    fenceAuthStudies: computeAllFencesAuthStudies(fenceStudies),
    fencesError,
  };
};
export default useFenceStudy;
