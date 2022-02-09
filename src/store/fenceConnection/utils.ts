import { keys } from 'lodash';
import { FENCE_NAMES, TFenceConnections, TConnection } from 'common/fenceTypes';

export const concatAllFencesAcls = (fenceConnections: TFenceConnections) => {
  const fenceNames = keys(fenceConnections) as FENCE_NAMES[];
  return fenceNames
    .map((fence: FENCE_NAMES) => keys(fenceConnections[fence]?.projects || []))
    .flat();
};

export const computeAclsForConnection = (connection: TConnection) =>
  keys(connection.projects || {});

export const computeAclsByFence = (fenceConnections: TFenceConnections) =>
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
