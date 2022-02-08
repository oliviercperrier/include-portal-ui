export type TRiffEntity<T> = {
  id: string;
  alias: string;
  content: T;
  sharedPublicly: boolean;
  creationDate: string;
  updateDate: string;
};

export type TRiffEntityUpdate<T> = Omit<
  TRiffEntity<T>,
  "id" | "creationDate" | "updateDate"
>;

export type TRiffEntityCreate<T> = Omit<
  TRiffEntity<T>,
  "id" | "creationDate" | "updateDate"
>;
