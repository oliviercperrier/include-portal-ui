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
            type_of_omics
            data_category
            data_type
            file_format
            size
            controlled_access
            access_urls
            acl
            repository
            study {
              study_id
              study_name
            }
          }
        }
      }
    }
  }
`;
