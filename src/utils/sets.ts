import { SET_ID_PREFIX } from '@ferlab/ui/core/data/sqon/types';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';

export const getValueNameMapByType = (saveSets: IUserSetOutput[], type: SetType) => {
  let nameMapping: Record<string, string> = {};

  saveSets.forEach((set) => {
    nameMapping[`${SET_ID_PREFIX}${set.id}`] = set.tag;
  });

  return nameMapping;
};
