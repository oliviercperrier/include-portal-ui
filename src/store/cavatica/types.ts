import { ICavaticaBillingGroup, ICavaticaProject } from 'services/api/cavatica/models';

export type initialState = {
  isAnalyseModalOpen: boolean;
  isCreateProjectModalOpen: boolean;
  isCreatingProject: boolean;
  isCopyingFiles: boolean;
  isFetchingBillingGroup: boolean;
  isLoading: boolean;
  filesToCopy: any[]; // TODO: add the right type
  projects: TCavaticaProjectWithMembers[];
  projectsTree: ICavaticaTreeNode[];
  billingGroups: ICavaticaBillingGroup[];
  error?: any;
  newlyCreatedProjectId?: string;
};

export type TCavaticaProjectWithMembers = ICavaticaProject & {
  memberCount: number;
};

export interface ICavaticaTreeNode {
  href: string;
  name: string;
  id: string;
  pId: any;
  value: string;
  title: string;
  type: string;
  isLeaf?: boolean;
};
