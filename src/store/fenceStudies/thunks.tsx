import flatMap from 'lodash/flatMap';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FENCE_CONNECTION_STATUSES, FENCE_NAMES } from 'common/fenceTypes';
import { isEmpty } from 'lodash';
import { addWildCardToAcls, computeAclsByFence } from 'store/fenceConnection/utils';
import { RootState } from 'store/types';
import { ARRANGER_API_PROJECT_URL } from 'provider/ApolloProvider';
import { sendRequest } from 'services/api';
import { TFenceStudies } from './types';

const fetchAllFenceStudies = createAsyncThunk<
  void,
  void,
  { rejectValue: string; state: RootState }
>('fenceStudies/fetch/all/studies', async (args, thunkAPI) => {
  const { fenceConnection } = thunkAPI.getState();

  const fenceNames = Object.keys(fenceConnection.connections) as FENCE_NAMES[];
  const aclsByFence = computeAclsByFence(fenceConnection.connections);

  console.log('NAMES: ', fenceNames);
  console.log('aclsByFence: ', aclsByFence);

  fenceNames.forEach(
    async (fenceName) =>
      await thunkAPI.dispatch(
        fetchFenceStudies({
          fenceName,
          userAcls: aclsByFence[fenceName],
        }),
      ),
  );
});

const fetchFenceStudies = createAsyncThunk<
  TFenceStudies,
  {
    fenceName: FENCE_NAMES;
    userAcls: string[];
  },
  { rejectValue: string; state: RootState }
>(
  'fenceStudies/fetch/studies',
  async (args, thunkAPI) => {
    const studies = await getAuthStudyIdsAndCounts(args.userAcls, args.fenceName);
    const authorizedStudies = isEmpty(studies)
      ? []
      : await getStudiesCountByNameAndAcl(studies, addWildCardToAcls(args.userAcls));

    return {
      [args.fenceName]: {
        authorizedStudies: [],
      },
    };
  },
  {
    condition: (args, { getState }) => {
      const { fenceStudies } = getState();

      const studies = fenceStudies.studies[args.fenceName];
      const hasNoAuthorizedStudies = isEmpty(studies) || isEmpty(studies.authorizedStudies);
      const hasNotBeenDisconnected = [
        FENCE_CONNECTION_STATUSES.unknown,
        FENCE_CONNECTION_STATUSES.connected,
      ].includes(fenceStudies.statuses[args.fenceName]);

      return hasNoAuthorizedStudies && hasNotBeenDisconnected;
    },
  },
);

const getStudiesCountByNameAndAcl = async (studies: TFenceStudies, userAcls: string[]) => {
  const studyIds = Object.keys(studies);

  const sqons = studyIds.reduce(
    (obj, studyId) => ({
      ...obj,
      [`${studyId}_sqon`]: {
        op: 'in',
        content: { field: 'participants.study.external_id', value: [studyId] },
      },
    }),
    {},
  );

  const { data, error } = await sendRequest<any>({
    url: ARRANGER_API_PROJECT_URL,
    method: 'POST',
    data: {
      query: `
      query StudyCountByNamesAndAcl(${studyIds.map(
        (studyId) => `$${studyId}_sqon: JSON`,
      )}) {          
        file {
          ${studyIds
            .map(
              (studyId) => `
            ${studyId}: aggregations(filters: $${studyId}_sqon, aggregations_filter_themselves: true) {
              acl {
                buckets {
                  key
                }
              }
              participants__study__study_name{
                buckets{
                  key
                  doc_count
                }
              } 
            }
          `,
            )
            .join('')}
        }
      }
      `,
      variables: sqons,
    },
  });

  const {
    data: { file },
  } = data;

  console.log(file);
};

const getAuthStudyIdsAndCounts = async (
  userAcls: string[],
  fenceName: FENCE_NAMES,
): Promise<TFenceStudies> => {
  const { data, error } = await sendRequest<any>({
    url: ARRANGER_API_PROJECT_URL,
    method: 'POST',
    data: {
      query: `
    query AuthorizedStudyIdsAndCount($sqon: JSON) {
      file {
        aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false){
          participants__study__external_id{
            buckets
            {
              key
              doc_count}
            }
          }
        }
      }
    `,
      variables: {
        sqon: {
          op: 'and',
          content: [
            { op: 'in', content: { field: 'acl', value: addWildCardToAcls(userAcls) } },
            { op: 'in', content: { field: 'repository', value: fenceName } },
          ],
        },
      },
    },
  });

  const {
    data: {
      file: {
        aggregations: {
          participants__study_external_id: { buckets },
        },
      },
    },
  } = data;

  return buckets.reduce(
    (obj: TFenceStudies, { key, doc_count }: { key: string; doc_count: number }) => ({
      ...obj,
      [key]: { authorizedFiles: doc_count },
    }),
    {},
  );
};

export const computeAllFencesAuthStudies = (fenceStudies: TFenceStudies) => {
  if (isEmpty(fenceStudies)) {
    return [];
  }
  return flatMap(Object.values(fenceStudies), (studies) => studies.authorizedStudies);
};

export { fetchFenceStudies, fetchAllFenceStudies };
