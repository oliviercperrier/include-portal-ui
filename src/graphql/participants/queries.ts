import { gql } from '@apollo/client';

export const SEARCH_PARTICIPANT_QUERY = gql`
  query searchParticipant($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    participant {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            down_syndrome_diagnosis
            participant_id
            study_id
            study_external_id
            down_syndrome_status
            sex
            family_type
            is_proband
            age_at_data_collection
            ethnicity
            race

            files {
              hits {
                total
              }
            }

            mondo {
              hits {
                edges {
                  node {
                    name
                    is_tagged
                  }
                }
              }
            }

            observed_phenotype {
              hits {
                edges {
                  node {
                    name
                    is_tagged
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
