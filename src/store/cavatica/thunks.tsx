import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { isEmpty } from 'lodash';
import { CavaticaApi } from 'services/api/cavatica';
import {
  ICavaticaBillingGroup,
  ICavaticaCreateProjectBody,
  ICavaticaProject,
} from 'services/api/cavatica/models';
import { RootState } from 'store/types';
import { TCavaticaProjectWithMembers } from './types';
import intl from 'react-intl-universal';

const fetchAllProjects = createAsyncThunk<
  TCavaticaProjectWithMembers[],
  void,
  { rejectValue: string; state: RootState }
>(
  'cavatica/fetch/projects',
  async (_, thunkAPI) => {
    const { data, error } = await CavaticaApi.fetchProjects();
    const projects = data?.items || [];

    if (error) {
      notification.error({
        message: intl.get('cavatica.error.title'),
        description: intl.get('cavatica.error.projects.fetch'),
      });
      return thunkAPI.rejectWithValue(error.message);
    }

    const projectList = await Promise.all(
      (projects || []).map(async (project) => {
        const [memberResponse] = await Promise.all([CavaticaApi.fetchProjetMembers(project.id)]);

        return { ...project, memberCount: memberResponse.data?.items.length || 0 };
      }),
    );

    return projectList;
  },
  {
    condition: (_, { getState }) => {
      const { cavatica } = getState();

      return isEmpty(cavatica.projects);
    },
  },
);

const fetchAllBillingGroups = createAsyncThunk<
  ICavaticaBillingGroup[],
  void,
  { rejectValue: string; state: RootState }
>(
  'cavatica/fetch/billingGroups',
  async (_, thunkAPI) => {
    const { data, error } = await CavaticaApi.fetchBillingGroups();

    if (error) {
      notification.error({
        message: intl.get('cavatica.error.title'),
        description: intl.get('cavatica.error.billingGroups.fetch'),
      });
      return thunkAPI.rejectWithValue(error.message);
    }

    return data?.items || [];
  },
  {
    condition: (_, { getState }) => {
      const { cavatica } = getState();

      return isEmpty(cavatica.billingGroups);
    },
  },
);

const createProjet = createAsyncThunk<
  {
    isAnalyseModalVisible: boolean;
    newProject: ICavaticaProject;
  },
  {
    openAnalyseModalOnDone?: boolean;
    body: ICavaticaCreateProjectBody;
  },
  { rejectValue: string; state: RootState }
>('cavatica/create/project', async (args, thunkAPI) => {
  const { data, error } = await CavaticaApi.createProject(args.body);

  if (error) {
    notification.error({
      message: intl.get('cavatica.error.title'),
      description: intl.get('cavatica.error.projects.create'),
    });
    return thunkAPI.rejectWithValue(error.message);
  }

  return {
    isAnalyseModalVisible: args.openAnalyseModalOnDone || false,
    newProject: data!,
  };
});

export { fetchAllProjects, fetchAllBillingGroups, createProjet };
