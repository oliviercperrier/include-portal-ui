import { TFilterData, VisualType } from '@ferlab/ui/core/components/filters/types';
import { updateFilters } from '@ferlab/ui/core/data/filters/utils';
import history from 'utils/history';
import { Key } from 'react';
import { TAB_IDS } from 'views/DataExploration/utils/constant';

export const addFieldToActiveQuery = (fieldName: string, value: TFilterData, type: VisualType) => {
  updateFilters(
    history,
    {
      field: fieldName,
      title: '',
      type,
    },
    [
      {
        data: value,
        name: '',
        id: fieldName,
      },
    ],
  );
};

export const generateSelectionSqon = (type: string, ids: Key[]) => {
  let field;

  switch (type) {
    case TAB_IDS.BIOSPECIMENS:
      field = 'files.biospecimens.biospecimen_id';
      break;
    case TAB_IDS.DATA_FILES:
      field = 'files.file_id';
      break;
    default:
      field = 'participant_id';
      break;
  }

  return {
    op: 'and',
    content: [
      {
        op: 'in',
        content: {
          field,
          value: ids,
        },
      },
    ],
  };
};
