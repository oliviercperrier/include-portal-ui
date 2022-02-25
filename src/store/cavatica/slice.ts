import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from 'store/cavatica/types';

export const CavaticaState: initialState = {
  isAnalyseModalOpen: false,
  isCreateProjectModalOpen: false,
  isCreatingProject: false,
  isCopyingFiles: false,
  isLoading: false,
  filesToCopy: [],
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
    }),
    cancelAnalyse: (state) => ({
      ...state,
      filesToCopy: [],
      isAnalyseModalOpen: false,
    }),
  },
  extraReducers: (builder) => {},
});

export const cavaticaActions = cavaticaSlice.actions;
export default cavaticaSlice.reducer;
