import { DocumentNode } from "graphql";
import { ExtendedMappingResults } from "graphql/models";
import { SUGGESTION_TYPES } from "../Suggester";

export interface FilterGroup {
  title?: string;
  fields: string[];
}

export interface FilterInfo {
  groups: FilterGroup[];
  suggester?: {
    title: () => string;
    placeholder: () => string;
    suggestionType: SUGGESTION_TYPES;
    tooltipTitle: () => string;
  };
}

export type TAggregationFunction = (
  index: string,
  aggList: string[],
  mappingResults: ExtendedMappingResults
) => DocumentNode;
