import { gql } from '@apollo/client';

export const SEARCH_VARIANT_QUERY = gql`
  query searchVariant($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    variant {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export const VARIANT_SEARCH_BY_ID_QUERY = gql`
  query searchVariantById($sqon: JSON) {
    variant {
      hits(filters: $sqon) {
        edges {
          node {
            variant_id
          }
        }
      }
    }
  }
`;
