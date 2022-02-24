import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CAVATICA_TYPE, ICavaticaProject } from 'services/api/cavatica/models';
import { initialState } from 'store/cavatica/types';
import {
  beginAnalyse,
  createProjet,
  fetchAllBillingGroups,
  fetchAllProjects,
  startBulkImportJob,
} from './thunks';

export const CavaticaState: initialState = {
  isAnalyseModalOpen: false,
  isCreateProjectModalOpen: false,
  isCreatingProject: false,
  isCopyingFiles: false,
  isFetchingBillingGroup: false,
  isInitializingAnalyse: false,
  isBulkImportLoading: false,
  isLoading: false,
  filesToCopy: [],
  projects: [],
  projectsTree: [],
  billingGroups: [],
  newlyCreatedProject: undefined,
};

const convertProjectToTreeNode = (project: ICavaticaProject) => ({
  ...project,
  pId: 0,
  title: project.name,
  value: project.id,
  type: CAVATICA_TYPE.PROJECT,
});

const cavaticaSlice = createSlice({
  name: 'cavatica',
  initialState: CavaticaState,
  reducers: {
    toggleAnalyseModal: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isAnalyseModalOpen: action.payload,
    }),
    toggleCreateProjectModal: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isCreateModalOpen: action.payload,
    }),
    beginCreateProject: (state) => ({
      ...state,
      isAnalyseModalOpen: false,
      isCreateProjectModalOpen: true,
    }),
    cancelCreateProject: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isCreateProjectModalOpen: false,
      isAnalyseModalOpen: action.payload,
    }),
    cancelAnalyse: (state) => ({
      ...state,
      filesToCopy: [],
      isAnalyseModalOpen: false,
    }),
  },
  extraReducers: (builder) => {
    // FETCH PROJECTS
    builder.addCase(fetchAllProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action.payload;
      state.projectsTree = action.payload.map((project) => convertProjectToTreeNode(project));
    });
    builder.addCase(fetchAllProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // FETCH BILLING GROUPS
    builder.addCase(fetchAllBillingGroups.pending, (state, action) => {
      state.isFetchingBillingGroup = true;
    });
    builder.addCase(fetchAllBillingGroups.fulfilled, (state, action) => {
      state.isFetchingBillingGroup = false;
      state.billingGroups = action.payload;
    });
    builder.addCase(fetchAllBillingGroups.rejected, (state, action) => {
      state.isFetchingBillingGroup = false;
      state.error = action.payload;
    });
    // BEGIN ANALYSE
    builder.addCase(beginAnalyse.pending, (state, action) => {
      state.isInitializingAnalyse = true;
      state.isAnalyseModalOpen = true;
      state.newlyCreatedProject = undefined;
    });
    builder.addCase(beginAnalyse.fulfilled, (state, action) => {
      state.isInitializingAnalyse = false;
      state.filesToCopy = action.payload;
    });
    builder.addCase(beginAnalyse.rejected, (state, action) => {
      state.isInitializingAnalyse = false;
      state.error = action.payload;
    });
    // BULK IMPORT
    builder.addCase(startBulkImportJob.pending, (state, action) => {
      state.isBulkImportLoading = true;
    });
    builder.addCase(startBulkImportJob.fulfilled, (state, action) => {
      state.isBulkImportLoading = false;
      state.isAnalyseModalOpen = false;
    });
    builder.addCase(startBulkImportJob.rejected, (state, action) => {
      state.isBulkImportLoading = false;
      state.error = action.payload;
    });
    // CREATE PROJECT
    builder.addCase(createProjet.pending, (state, action) => {
      state.isCreatingProject = true;
    });
    builder.addCase(createProjet.fulfilled, (state, action) => {
      const newProjectTreeNode = convertProjectToTreeNode(action.payload.newProject);
      state.isCreatingProject = false;
      state.isCreateProjectModalOpen = false;
      state.isAnalyseModalOpen = action.payload.isAnalyseModalVisible;
      state.newlyCreatedProject = newProjectTreeNode;
      state.projects = [
        ...state.projects,
        {
          ...action.payload.newProject,
          memberCount: 1,
        },
      ];
      state.projectsTree = [...state.projectsTree, newProjectTreeNode];
    });
    builder.addCase(createProjet.rejected, (state, action) => {
      state.isCreatingProject = false;
      state.error = action.payload;
    });
  },
});

export const cavaticaActions = cavaticaSlice.actions;
export default cavaticaSlice.reducer;
