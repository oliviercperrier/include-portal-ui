export const DEMOGRAPHIC_QUERY = `
  query AggregationDemographicInfo($sqon: JSON) {
    participant {
      aggregations(filters: $sqon, aggregations_filter_themselves: true) {
        sex {
          buckets {
            key
            doc_count
          }
        }
        ethnicity {
          buckets {
            key
            doc_count
          }
        }
        race {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const DATATYPE_QUERY = `
  query($sqon: JSON) {
    participant {
      aggregations(filters: $sqon, aggregations_filter_themselves: true) {
        files__data_type {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const TYPE_OF_OMICS_QUERY = `
  query($sqon: JSON) {
    participant {
      aggregations(filters: $sqon, aggregations_filter_themselves: true) {
        files__type_of_omics {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;
