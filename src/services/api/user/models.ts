import { TColumnStates } from "@ferlab/ui/core/components/ProTable/types";

export type TUser = {
  id: string;
  keycloak_id: string;
  first_name: string;
  last_name: string;
  era_commons_id?: string;
  nih_ned_id?: string;
  external_individual_fullname?: string;
  external_individual_email?: string;
  roles?: string[];
  affiliation?: string;
  research_area?: string;
  portal_usages?: string[];
  creation_date: Date;
  updated_date: Date;
  consent_date?: Date;
  accepted_terms: boolean;
  understand_disclaimer: boolean;
  completed_registration: boolean;
  config: TUserConfig;
};

export type TUserTableConfig = {
  columns: TColumnStates;
};

export type TUserConfig = {
  data_exploration?: {
    tables?: {
      participants?: TUserTableConfig;
      biospecimens?: TUserTableConfig;
      datafiles?: TUserTableConfig;
    };
  };
};

export type TUserInsert = Omit<
  TUser,
  "id" | "keycloak_id" | "creation_date" | "update_date"
>;
export type TUserUpdate = Partial<TUserInsert>;
