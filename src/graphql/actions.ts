import { DocumentNode, TypedDocumentNode } from "@apollo/client";
import { GqlResults } from "graphql/models";
import { useLazyResultQuery } from "graphql/utils/query";

export const useGetAggregations = (
  variables: any,
  query: DocumentNode | TypedDocumentNode,
  index: string
): GqlResults<any> => {
  const { loading, result } = useLazyResultQuery<any>(query, {
    variables: variables,
  });

  return {
    loading,
    aggregations: (result && result[index].aggregations) || null,
    data: [],
    total: 0,
  };
};
