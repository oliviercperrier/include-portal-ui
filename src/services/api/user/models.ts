import { TColumnStates } from "@ferlab/ui/core/components/ProTable/types";

export type TUser = {
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

export type TUserConfig = {
  data_exploration?: {
    participants_table?: TColumnStates;
    biospecimens_table?: TColumnStates;
    datafiles_table?: TColumnStates;
  };
};

export type TUserInsert = TUser;
export type TUserUpdate = Partial<Omit<TUser, "id" | "keycloak_id">>;
