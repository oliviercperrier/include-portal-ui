import { DocumentNode } from 'graphql';
import { ExtendedMappingResults } from 'graphql/models';
import React from 'react';
import { SUGGESTION_TYPES } from '../Suggester';

export interface FilterGroup {
  title?: string;
  facets: string[] | React.ReactNode[];
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
  mappingResults: ExtendedMappingResults,
) => DocumentNode;
