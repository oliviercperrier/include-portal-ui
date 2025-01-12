import { ArrangerResultsTree } from "graphql/models";
import { IParticipantEntity } from "graphql/participants/models";

export interface IFileResultTree {
  file: ArrangerResultsTree<IFileEntity>;
}

export interface IFileEntity {
  id: string;
  score: number;
  access: string;
  data_category: string;
  data_type: string;
  experimental_strategy: string;
  file_format: string;
  file_id: string;
  size: number;
  study_id: string;
  type_of_omics: string;
  participant: ArrangerResultsTree<IParticipantEntity>;
}
