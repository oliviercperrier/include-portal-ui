import { gql } from "@apollo/client";

export const SEARCH_BIOSPECIMEN_QUERY = gql`
  query searchBiospecimen(
    $sqon: JSON
    $first: Int
    $offset: Int
    $sort: [Sort]
  ) {
    biospecimen {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            derived_sample_id
            sample_id
            biospecimen_id
            biospecimen_type
            sample_type
            derived_sample_type
            age_at_biospecimen_collection
            ncit_id_tissue_type
            bio_repository

            participant {
              participant_id
            }
          }
        }
      }
    }
  }
`;
