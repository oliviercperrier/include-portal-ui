import { gql } from "@apollo/client";

export const FETCH_STUDIES_QUERY = gql`
  query getStudy {
    study {
      hits {
        total
        edges {
          node {
            id
            study_id
            study_code
            study_name
            program
            external_id
            type_of_omics	
            participant_count
            family_count
            attribution
          }
        }
      }
    }
  }
`;
