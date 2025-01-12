import { ArrangerResultsTree } from "graphql/models";

export interface IStudyResultTree {
  study: ArrangerResultsTree<IStudyEntity>;
}

export interface IStudyEntity {
  id: string;
  study_id: string;
  study_code: string;
  study_name: string;
  program: string;
  external_id: string;
  type_of_omics: string[];
  family_count: number;
  participant_count: number;
}
