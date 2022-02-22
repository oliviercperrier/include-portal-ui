import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from 'store/cavatica/types';
import { createProjet, fetchAllBillingGroups, fetchAllProjects } from './thunks';

export const CavaticaState: initialState = {
  isAnalyseModalOpen: false,
  isCreateProjectModalOpen: false,
  isCreatingProject: false,
  isCopyingFiles: false,
  isFetchingBillingGroup: false,
  isLoading: false,
  filesToCopy: [],
  projects: [],
  projectsTree: [],
  billingGroups: [],
  newlyCreatedProjectId: undefined,
};

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
    beginAnalyse: (state, action: PayloadAction<any[]>) => ({
      ...state,
      filesToCopy: action.payload,
      isAnalyseModalOpen: true,
      newlyCreatedProjectId: undefined
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
      state.projectsTree = action.payload.map((project) => ({
        ...project,
        pId: 0,
        title: project.name,
        value: project.id,
        type: 'project',
      }));
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
    // CREATE PROJECT
    builder.addCase(createProjet.pending, (state, action) => {
      state.isCreatingProject = true;
    });
    builder.addCase(createProjet.fulfilled, (state, action) => {
      state.isCreatingProject = false;
      state.isCreateProjectModalOpen = false;
      state.isAnalyseModalOpen = action.payload.isAnalyseModalVisible;
      state.newlyCreatedProjectId = action.payload.newProject.id;
      state.projects = [
        ...state.projects,
        {
          ...action.payload.newProject,
          memberCount: 1,
        },
      ];
      state.projectsTree = [
        ...state.projectsTree,
        {
          ...action.payload.newProject,
          pId: 0,
          title: action.payload.newProject.name,
          value: action.payload.newProject.id,
          type: 'project',
        },
      ];
    });
    builder.addCase(createProjet.rejected, (state, action) => {
      state.isCreatingProject = false;
      state.error = action.payload;
    });
  },
});

export const cavaticaActions = cavaticaSlice.actions;
export default cavaticaSlice.reducer;
