import { ArrangerResultsTree } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IFileResultTree {
  file: ArrangerResultsTree<IFileEntity>;
}

export interface IFileEntity {
  key?: string;
  id: string;
  score: number;
  acl: string[];
  access: string;
  access_urls: string;
  data_category: string;
  data_type: string;
  experimental_strategy: string;
  file_format: string;
  file_id: string;
  size: number;
  type_of_omics: string;
  repository: string;
  study: IStudyEntity;
  participant: ArrangerResultsTree<IParticipantEntity>;
}

export type ITableFileEntity = IFileEntity & {
  key: string;
};
