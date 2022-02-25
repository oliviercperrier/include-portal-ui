export type initialState = {
  isAnalyseModalOpen: boolean;
  isCreateProjectModalOpen: boolean;
  isCreatingProject: boolean;
  isCopyingFiles: boolean;
  isLoading: boolean;
  filesToCopy: any[]; // TODO: add the right type
  error?: any;
};