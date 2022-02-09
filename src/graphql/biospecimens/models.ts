import { IFileEntity } from "graphql/files/models";
import { ArrangerResultsTree } from "graphql/models";
import { IParticipantEntity } from "graphql/participants/models";

export interface IBiospecimenResultTree {
  biospecimen: ArrangerResultsTree<IBiospecimenEntity>;
}

export interface IBiospecimenEntity {
  key?: string;
  id: string;
  score: number;
  age_at_biospecimen_collection: number;
  bio_repository: string;
  biospecimen_id: string;
  biospecimen_type: string;
  derived_sample_id: string;
  derived_sample_type: string;
  ncit_id_tissue_type: string;
  sample_id: string;
  sample_type: string;
  files: ArrangerResultsTree<IFileEntity>;
  participant: IParticipantEntity;
}
