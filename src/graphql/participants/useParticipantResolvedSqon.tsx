import { getQueryBuilderCache, useFilters } from '@ferlab/ui/core/data/filters/utils';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { useParams } from 'react-router-dom';
import { DATA_EXPLORATION_REPO_CACHE_KEY } from 'views/DataExploration/utils/constant';
import { mapFilterForParticipant } from 'views/DataExploration/utils/mapper';

const useParticipantResolvedSqon = () => {
  useParams(); // sync with query builder
  const { filters }: { filters: ISyntheticSqon } = useFilters();
  const allSqons = getQueryBuilderCache(DATA_EXPLORATION_REPO_CACHE_KEY).state;

  return {
    sqon: mapFilterForParticipant(resolveSyntheticSqon(allSqons, filters)),
  };
};

export default useParticipantResolvedSqon;
