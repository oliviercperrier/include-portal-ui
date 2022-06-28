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
            external_id
            study_id
            study_external_id
            down_syndrome_status
            sex
            family_type
            is_proband
            age_at_data_collection
            ethnicity
            race
            nb_files
            nb_biospecimens

            files {
              hits {
                total
                edges {
                  node {
                    biospecimens {
                      hits {
                        total
                        edges {
                          node {
                            sample_id
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            diagnosis {
              hits {
                edges {
                  node {
                    mondo_id_diagnosis
                    source_text
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

export const GET_PARTICIPANT_COUNT = gql`
  query getParticipantCount($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

export const CHECK_PARTICIPANT_MATCH = gql`
  query fetchMatchParticipant($sqon: JSON, $first: Int, $offset: Int) {
    participant {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            fhir_id
            participant_id
            external_id
            study_id
          }
        }
      }
    }
  }
`;

export const PARTICIPANT_SEARCH_BY_ID_QUERY = gql`
  query searchParticipantById($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        edges {
          node {
            participant_id
          }
        }
      }
    }
  }
`;
