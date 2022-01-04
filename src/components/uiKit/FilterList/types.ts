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