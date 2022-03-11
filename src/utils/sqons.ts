import { getFiltersQuery, updateQueryParam } from '@ferlab/ui/core/data/filters/utils';
import { BooleanOperators, TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import {
  ISqonGroupFilter,
  ISyntheticSqon,
  IValueFilter,
  MERGE_OPERATOR_STRATEGIES,
  MERGE_VALUES_STRATEGIES,
} from '@ferlab/ui/core/data/sqon/types';
import {
  deepMergeSqonValue,
  getDefaultSyntheticSqon,
  isBooleanOperator,
} from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { isEmpty } from 'lodash';
import { v4 } from 'uuid';

export const addFieldToActiveQuery = (
  fieldName: string,
  value: Array<string | number | boolean>,
  index: string,
  history: any,
  merge_stategy: MERGE_VALUES_STRATEGIES = MERGE_VALUES_STRATEGIES.APPEND_VALUES,
) => {
  let newSqon;
  const filter = getFiltersQuery();
  const newSqonContent = {
    content: {
      field: fieldName,
      index,
      value,
    },
    op: TermOperators.in,
  };

  if (!isEmpty(filter)) {
    newSqon = deepMergeSqonValue(filter, newSqonContent, {
      values: merge_stategy,
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

export const findSqonValueByField = (
  field: string,
  sqon: ISqonGroupFilter,
  prevValue: any = undefined,
) => {
  let value: any = prevValue;
  sqon.content.forEach((content) => {
    if (isBooleanOperator(content)) {
      value = value || findSqonValueByField(field, content as ISqonGroupFilter, prevValue);
    } else {
      const valueContent = content as IValueFilter;

      if (valueContent.content.field === field) {
        value = value || valueContent.content.value;
      }
    }
  });
  return value;
};
