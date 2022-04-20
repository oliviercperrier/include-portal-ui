import { ICustomSearchProps } from 'components/uiKit/GlobalSearch';
import useBiospecimenResolvedSqon from 'graphql/biospecimens/useBiospecimenResolvedSqon';
import { INDEXES } from 'graphql/constants';
import { SetType } from 'services/api/savedSet/models';
import { DATA_EXPLORATION_QB_ID } from '../utils/constant';
import SetSearch from './SetSearch';

const BiospecimenSetSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { sqon } = useBiospecimenResolvedSqon(queryBuilderId);

  return (
    <SetSearch
      index={INDEXES.BIOSPECIMEN}
      title="Saved Sample Sets"
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      type={SetType.BIOSPECIMEN}
      sqon={sqon}
      emptyDescription={'No sample sets found'}
    />
  );
};

export default BiospecimenSetSearch;
