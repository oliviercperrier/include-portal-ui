import { ArrangerResultsTree } from "graphql/models";

export interface StudyResultTree {
  study: ArrangerResultsTree<StudyEntity>;
}

export interface StudyEntity {
  id: string;
  study_id: string;
  study_code: string;
  study_name: string;
  program: string;
  external_id: string;
  type_of_omics: string;
}
