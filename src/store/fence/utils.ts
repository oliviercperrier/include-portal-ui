import { keys } from "lodash";
import { FENCE_NAMES, TFenceConnections } from "common/fenceTypes";

export const concatAllFencesAcls = (fenceConnections: TFenceConnections) => {
  const fenceNames = keys(fenceConnections) as FENCE_NAMES[];
  return fenceNames
    .map((fence: FENCE_NAMES) => keys(fenceConnections[fence]?.projects || []))
    .flat();
};
