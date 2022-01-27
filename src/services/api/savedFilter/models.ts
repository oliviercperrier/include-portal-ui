import { ISavedFilter } from "@ferlab/ui/core/components/QueryBuilder/types";

export type TUserSavedFilter = ISavedFilter & {
  keycloak_id: string;
  tag: string;
  creation_date: Date;
  updated_date: Date;
};

export type TUserSavedFilterInsert = Omit<
  TUserSavedFilter,
  "id" | "keycloak_id" | "updated_date" | "creation_date"
>;
export type TUserSavedFilterUpdate = Partial<
  Omit<TUserSavedFilter, "keycloak_id" | "updated_date" | "creation_date">
>;
