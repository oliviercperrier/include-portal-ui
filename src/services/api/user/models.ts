export type TUser = {
  keycloak_id: string;
  consent_date?: Date;
  understand_disclaimer: boolean;
  first_name: string;
  last_name: string;
};

export type TUserInsert = TUser;
export type TUserUpdate = Partial<Omit<TUser, "id" | "keycloak_id">>;
