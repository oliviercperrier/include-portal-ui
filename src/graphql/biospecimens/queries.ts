import { gql } from '@apollo/client';

export const SEARCH_BIOSPECIMEN_QUERY = gql`
  query searchBiospecimen($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    biospecimen {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            container_id
            status
            sample_id
            sample_type
            parent_sample_id
            parent_sample_type
            collection_sample_id
            collection_sample_type
            age_at_biospecimen_collection
            laboratory_procedure
            volume_ul
            volume_unit
            biospecimen_storage

            participant {
              participant_id
            }

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
