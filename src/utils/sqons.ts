import { getFiltersQuery, updateQueryParam } from '@ferlab/ui/core/data/filters/utils';
import { TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import {
  MERGE_OPERATOR_STRATEGIES,
  MERGE_VALUES_STRATEGIES,
} from '@ferlab/ui/core/data/sqon/types';
import { deepMergeSqonValue, getDefaultSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { isEmpty } from 'lodash';
import history from 'utils/history';

export const addFieldToActiveQuery = (
  fieldName: string,
  value: Array<string | number | boolean>,
  index: string,
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
