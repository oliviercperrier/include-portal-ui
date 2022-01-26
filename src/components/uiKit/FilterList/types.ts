import { DocumentNode } from "graphql";
import { ExtendedMappingResults } from "graphql/models";

export interface FilterGroup {
  title?: string;
  fields: string[];
}

export interface FilterInfo {
  groups: FilterGroup[];
  suggester?: {
    title: () => string;
    placeholder: () => string;
    suggestionType: string; // Add enum?
    tooltipTitle: () => string;
  };
}

export type TAggregationFunction = (
  index: string,
  aggList: string[],
  mappingResults: ExtendedMappingResults
) => DocumentNode;
