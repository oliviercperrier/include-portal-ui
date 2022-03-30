import { ExperimentOutlined } from '@ant-design/icons';
import SelectItem from 'components/uiKit/select/SelectItem';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { BIOSPECIMEN_SEARCH_BY_ID_QUERY } from 'graphql/biospecimens/queries';
import useBiospecimenResolvedSqon from 'graphql/biospecimens/useBiospecimenResolvedSqon';
import { INDEXES } from 'graphql/constants';
import { uniqBy } from 'lodash';
import GlobalSearch from '.';
import { highlightSearchMatch } from './utils';

const BiospecimenSearch = () => {
  const { sqon } = useBiospecimenResolvedSqon();

  return (
    <GlobalSearch<IBiospecimenEntity>
      field="sample_id"
      index={INDEXES.BIOSPECIMEN}
      placeholder={'e.g. BS_011DYZ2J, HTP0001B2_Plasma'}
      emptyDescription={'No samples found'}
      query={BIOSPECIMEN_SEARCH_BY_ID_QUERY}
      sqon={sqon}
      optionsFormatter={(options, matchRegex, search) =>
        uniqBy(options, (opt) => opt.sample_id).map((option) => ({
          label: (
            <SelectItem
              icon={<ExperimentOutlined />}
              title={highlightSearchMatch(option.sample_id, matchRegex, search)}
            />
          ),
          value: option.sample_id,
        }))
      }
      title={'Search by Sample ID'}
    />
  );
};

const BiospecimenCollectionSearch = () => {
  const { sqon } = useBiospecimenResolvedSqon();

  return (
    <GlobalSearch<IBiospecimenEntity>
      field="collection_sample_id"
      index={INDEXES.BIOSPECIMEN}
      placeholder={'e.g. HTP0001B2_Whole blood, BS_1YEZ2XR4_Saliva'}
      emptyDescription={'No collection ID found'}
      query={BIOSPECIMEN_SEARCH_BY_ID_QUERY}
      sqon={sqon}
      optionsFormatter={(options, matchRegex, search) =>
        uniqBy(options, (opt) => opt.collection_sample_id).map((option) => ({
          label: (
            <SelectItem
              icon={<ExperimentOutlined />}
              title={highlightSearchMatch(option.collection_sample_id, matchRegex, search)}
            />
          ),
          value: option.collection_sample_id,
        }))
      }
      title={'Search by Collection ID'}
    />
  );
};

export { BiospecimenSearch, BiospecimenCollectionSearch };
