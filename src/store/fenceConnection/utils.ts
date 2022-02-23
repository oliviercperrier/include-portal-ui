import { keys } from 'lodash';
import { FENCE_NAMES, TFenceConnections, TConnection } from 'common/fenceTypes';
import { TAclsByFenceName } from 'store/fenceStudies/types';

export const concatAllFencesAcls = (fenceConnections: TFenceConnections) => {
  const fenceNames = keys(fenceConnections) as FENCE_NAMES[];
  return fenceNames
    .map((fence: FENCE_NAMES) => keys(fenceConnections[fence]?.projects || []))
    .flat();
};

export const addWildCardToAcls = (acls: string[]) => [...(acls || []), '*'];

export const computeAclsForConnection = (connection: TConnection) =>
  keys(connection.projects || {});

export const computeAclsByFence = (fenceConnections: TFenceConnections): TAclsByFenceName =>
  Object.entries(fenceConnections).reduce(
    (acc, [fenceName, connection]) =>
      connection
        ? {
            ...acc,
            [fenceName]: computeAclsForConnection(connection),
          }
        : acc,
    {},
  );
