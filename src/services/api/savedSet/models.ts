import { ISavedSet } from 'store/savedSet/types';

export type TUserSavedSet = ISavedSet & {
  keycloak_id: string;
  creation_date: string;
  updated_date: string;
};

export type TUpdateSet = ISavedSet & {
  subAction: string;
  newTag?: string;
};

export type IUserSetOutput = {
  updated_date: Date;
  id: string;
  tag: string;
  size: string;
  setType: string;
};

export type TUserSavedSetInsert = Omit<
  TUserSavedSet,
  'keycloak_id' | 'updated_date' | 'creation_date'
>;

export type TUserSavedSetUpdate = Partial<ISavedSet> & { subAction: string; newTag?: string };

export enum SetType {
  PARTICIPANT = 'participant',
  FILE = 'file',
  BIOSPECIMEN = 'biospecimen',
}
