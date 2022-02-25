import { getFiltersQuery, updateQueryParam } from '@ferlab/ui/core/data/filters/utils';
import { BooleanOperators, TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import {
  ISyntheticSqon,
  MERGE_OPERATOR_STRATEGIES,
  MERGE_VALUES_STRATEGIES,
} from '@ferlab/ui/core/data/sqon/types';
import { deepMergeSqonValue, getDefaultSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { isEmpty } from 'lodash';
import { v4 } from 'uuid';

export const addFieldToActiveQuery = (
  fieldName: string,
  value: Array<string | number | boolean>,
  index: string,
  history: any
) => {
  let newSqon;
  const filter = getFiltersQuery();
  const newSqonContent = {
    content: {
      field: fieldName,
      value,
      index: index,
    },
    op: TermOperators.in,
  };

  if (!isEmpty(filter)) {
    newSqon = deepMergeSqonValue(filter, newSqonContent, {
      values: MERGE_VALUES_STRATEGIES.APPEND_VALUES,
      operator: MERGE_OPERATOR_STRATEGIES.KEEP_OPERATOR,
    });
  } else {
    newSqon = getDefaultSyntheticSqon();
    newSqon.content = [newSqonContent];
  }

  updateQueryParam(history, 'filters', newSqon);
};

export const addFilter = (
  filters: ISyntheticSqon | null,
  field: string,
  index: INDEXES,
  value: string[],
  operator: BooleanOperators = BooleanOperators.and,
): ISyntheticSqon => {
  const newFilter = { content: { field, value, index }, op: TermOperators.in };

  if (isEmpty(filters)) {
    return {
      id: v4(),
      content: [newFilter],
      op: operator,
    };
  }

  return {
    id: v4(),
    ...filters!,
    content: [...filters!.content, newFilter],
  };
};