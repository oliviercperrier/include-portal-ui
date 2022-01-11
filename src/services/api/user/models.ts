export type TUser = {
  keycloak_id: string;
  consent_date?: Date;
  accepted_terms: boolean;
  understand_disclaimer: boolean;
  first_name: string;
  last_name: string;
  era_commons_id?: string;
  nih_ned_id?: string;
  occupation?: string[];
  affiliation?: string;
  research_area?: string;
  portal_usages?: string[];
  creation_date: Date;
  updated_date: Date;
};

export type TUserInsert = TUser;
export type TUserUpdate = Partial<Omit<TUser, "id" | "keycloak_id">>;
