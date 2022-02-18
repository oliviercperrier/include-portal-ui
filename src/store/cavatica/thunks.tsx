import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchProjects = createAsyncThunk<void, void, { rejectValue: string }>(
  'cavatica/fetch/projects',
  async (args, thunkAPI) => {},
);

export { fetchProjects };
