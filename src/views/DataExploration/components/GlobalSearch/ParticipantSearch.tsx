import { UserOutlined } from '@ant-design/icons';
import SelectItem from 'components/uiKit/select/SelectItem';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { PARTICIPANT_SEARCH_BY_ID_QUERY } from 'graphql/participants/queries';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import GlobalSearch from '.';
import { highlightSearchMatch } from './utils';

const ParticipantSearch = () => {
  const { sqon } = useParticipantResolvedSqon();

  return (
    <GlobalSearch<IParticipantEntity>
      field="participant_id"
      index={INDEXES.PARTICIPANT}
      placeholder={'Search'}
      emptyDescription={'No participants found'}
      query={PARTICIPANT_SEARCH_BY_ID_QUERY}
      sqon={sqon}
      optionsFormatter={(options, matchRegex, search) => {
        return options.map((option) => ({
          label: (
            <SelectItem
              icon={<UserOutlined />}
              title={highlightSearchMatch(option.participant_id, matchRegex, search)}
            />
          ),
          value: option.participant_id,
        }));
      }}
      title={'Search by Participant ID'}
    />
  );
};

export default ParticipantSearch;
