import { UserOutlined } from '@ant-design/icons';
import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/GlobalSearch';
import { highlightSearchMatch } from 'components/uiKit/GlobalSearch/utils';
import SelectItem from 'components/uiKit/select/SelectItem';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { PARTICIPANT_SEARCH_BY_ID_QUERY } from 'graphql/participants/queries';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';

const ParticipantSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { sqon } = useParticipantResolvedSqon(queryBuilderId);

  return (
    <GlobalSearch<IParticipantEntity>
      queryBuilderId={queryBuilderId}
      field="participant_id"
      index={INDEXES.PARTICIPANT}
      placeholder={'e.g. PT_WFB3TQP4'}
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
