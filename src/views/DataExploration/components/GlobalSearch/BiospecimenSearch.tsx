import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { BIOSPECIMEN_SEARCH_BY_ID_QUERY } from 'graphql/biospecimens/queries';
import useBiospecimenResolvedSqon from 'graphql/biospecimens/useBiospecimenResolvedSqon';
import { INDEXES } from 'graphql/constants';
import GlobalSearch from '.';

const BiospecimenSearch = () => {
  const { sqon } = useBiospecimenResolvedSqon();

  return (
    <GlobalSearch<IBiospecimenEntity>
      field="sample_id"
      index={INDEXES.BIOSPECIMEN}
      placeholder={'e.g. BS_011DYZ2J, HTP0001B2_Plasma'}
      emptyDescription={'No biospecimens found'}
      query={BIOSPECIMEN_SEARCH_BY_ID_QUERY}
      sqon={sqon}
      optionsFormatter={(options) =>
        options.map((option) => ({
          label: option.sample_id,
          value: option.sample_id,
        }))
      }
      title={'Search by Biospecimen ID'}
    />
  );
};

export default BiospecimenSearch;
