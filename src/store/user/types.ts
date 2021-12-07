export enum UserActionsEnum {
  LOGOUT = "state/user/action/logout",
  FETCH_USER = "state/user/action/fetch",
  UPDATE_USER = "state/user/action/update",
}

export type RawUser = {
  _id: string;
  roles: Array<string>;
  egoId: string;
  acceptedDatasetSubscriptionKfOptIn: boolean;
  acceptedKfOptIn: boolean;
  acceptedNihOptIn: boolean;
  acceptedTerms: boolean;
  hashedEmail?: string;
  email: string;
  firstName: string;
  lastName: string;
  isPublic: boolean;
  [index: string]: any;
};

export type Groups = string[];

export type User = RawUser & {
  groups: Groups;
  isAdmin: boolean;
};

export type UserInfo = {
  userID: string;
  isSelf: boolean;
};

export type Profile = {
  _id: string;
  roles: Array<string>;
  egoId: string;
  acceptedDatasetSubscriptionKfOptIn: boolean;
  acceptedKfOptIn: boolean;
  acceptedNihOptIn: boolean;
  acceptedTerms: boolean;
  addressLine1?: string;
  addressLine2?: string;
  bio?: string;
  city?: string;
  country?: string;
  department?: string;
  eraCommonsID?: string;
  facebook?: string;
  firstName?: string;
  github?: string;
  googleScholarId?: string;
  hashedEmail?: string;
  institution?: string;
  institutionalEmail?: string;
  interests?: Array<string>;
  isActive?: boolean;
  isPublic?: boolean;
  jobTitle?: string;
  lastName?: string;
  linkedin?: string;
  orchid?: string;
  phone?: string;
  sets?: Array<string>;
  state?: string;
  story?: string;
  title?: string;
  twitter?: string;
  website?: string;
  zip?: string;
};

export type initialState = {
  user: User | null;
  isLoading: boolean;
  error?: string;
};
