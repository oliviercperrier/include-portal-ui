export interface ICavaticaListPayload<T> {
  href: string;
  items: T[];
  links: any[];
}

export interface ICavaticaBillingGroup {
  id: string;
  href: string;
  name: string;
}

export interface ICavaticaCreateProjectBody {
  name: string;
  billing_group: string;
}

export interface ICavaticaProjectChild {
  href: string;
  id: string;
  name: string;
  //project: string;
  //parent: string;
  type: string;
}

export interface ICavaticaProject {
  href: string;
  id: string;
  name: string;
  category: string;
  created_by: string;
  created_on: string;
  modified_on: string;
}

export interface ICavaticaProjectMember {
  href: string;
  username: string;
  permissions: {
    write: true;
    read: true;
    copy: true;
    execute: true;
    admin: true;
  };
}
