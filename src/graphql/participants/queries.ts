import { gql } from "@apollo/client";

export const SEARCH_PARTICIPANT_QUERY = gql`
  query searchParticipant(
    $sqon: JSON
    $first: Int
    $offset: Int
    $sort: [Sort]
  ) {
    participant {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            age_at_data_collection
            down_syndrome_diagnosis
            participant_id
            study_id
            study_external_id
            karyotype
            sex
            family_type
            is_proband
            age_at_data_collection

            files {
              hits {
                total
              }
            }
          }
        }
      }
    }
  }
`;
