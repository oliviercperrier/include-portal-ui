import { BooleanOperators, TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { Key } from 'react';
import { TAB_IDS } from 'views/DataExploration/utils/constant';

export const generateSelectionSqon = (type: Omit<TAB_IDS, TAB_IDS.SUMMARY>, ids: Key[]) => {
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
    op: BooleanOperators.and,
    content: [
      {
        op: TermOperators.in,
        content: {
          field,
          value: ids,
        },
      },
    ],
  };
};
