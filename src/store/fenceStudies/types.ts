import { FENCE_CONNECTION_STATUSES } from 'common/fenceTypes';

export enum STUDIES_FENCE_NAMES {
  gen3 = 'gen3',
}

export type initialState = {
  studies: TFenceStudies;
  loadingStudiesForFences: STUDIES_FENCE_NAMES[];
  fencesError: STUDIES_FENCE_NAMES[];
};

export type TAclsByFenceName = {
  [fenceName: string]: string[];
};

export type TFenceStudy = {
  acl: string[];
  studyShortName: string;
  totalFiles: number;
  id: string;
  authorizedFiles: number;
};

export type TFenceStudies = {
  [fenceName: string]: {
    authorizedStudies: TFenceStudy[];
  };
};

export type TFenceStudiesIdsAndCount = {
  [fenceName: string]: {
    authorizedFiles: number;
  };
};
