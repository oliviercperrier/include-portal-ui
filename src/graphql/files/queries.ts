import { gql } from '@apollo/client';

export const SEARCH_FILES_QUERY = gql`
  query searchFiles($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    file {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            file_id
            study_id
            type_of_omics
            experimental_strategy
            data_category
            data_type
            file_format
            size
            access
            access_urls
          }
        }
      }
    }
  }
`;
