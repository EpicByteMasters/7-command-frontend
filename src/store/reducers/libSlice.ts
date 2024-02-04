import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/utils/constants';
import { RootState } from '../store';

interface ICommonLib {
  id: string;
  name: string;
}

export interface ICommonLibWithSkillType extends ICommonLib {
  skillType: string;
}

export interface ICommonLibWithEducationType extends IEducation {
  id: string;

  /** По этому ищем */
  name: string;

  /** Отдаём на бек */
  specialty: string;

  urlLink: string;
}

interface IEducation {
  id: string;
  name: string;
  specialty: string;
  urlLink: string;
}

export type TCommonLibState = {
  positions: ICommonLib[];
  iprStatus: ICommonLib[];
  iprGoals: ICommonLib[];
  taskStatus: ICommonLib[];
  specialty: ICommonLib[];
  iprCompetency: ICommonLibWithSkillType[];
  education: IEducation[];
  isLoading: boolean;
  error: string;
};

let initialCommonLibState: TCommonLibState = {
  positions: [],
  iprStatus: [],
  iprGoals: [],
  taskStatus: [],
  specialty: [],
  iprCompetency: [],
  education: [],
  isLoading: false,
  error: '',
};

export const fetchCommonLibs = createAsyncThunk<TCommonLibState>('commonLibs/fetch', async () => {
  try {
    const [
      positionsResponse,
      iprStatusResponse,
      iprGoalsResponse,
      taskStatusResponse,
      specialtyResponse,
      iprCompetencyResponse,
      educationResponse,
    ] = await Promise.all([
      fetch(`${BASE_URL}/api/v1/docs/position`),
      fetch(`${BASE_URL}/api/v1/docs/ipr_status`),
      fetch(`${BASE_URL}/api/v1/docs/ipr_goal`),
      fetch(`${BASE_URL}/api/v1/docs/task_status`),
      fetch(`${BASE_URL}/api/v1/docs/specialty`),
      fetch(`${BASE_URL}/api/v1/docs/ipr_competency`),
      fetch(`${BASE_URL}/api/v1/docs/education`),
    ]);

    if (
      !positionsResponse.ok ||
      !iprStatusResponse.ok ||
      !iprGoalsResponse.ok ||
      !taskStatusResponse.ok ||
      !specialtyResponse.ok ||
      !iprCompetencyResponse.ok ||
      !educationResponse.ok
    ) {
      throw new Error(`HTTP error!`);
    }

    const [positions, iprStatus, iprGoals, taskStatus, specialty, iprCompetency, education] = await Promise.all([
      positionsResponse.json(),
      iprStatusResponse.json(),
      iprGoalsResponse.json(),
      taskStatusResponse.json(),
      specialtyResponse.json(),
      iprCompetencyResponse.json(),
      educationResponse.json(),
    ]);

    return {
      positions,
      iprStatus,
      iprGoals,
      taskStatus,
      specialty,
      iprCompetency,
      education,
      isLoading: false,
      error: '',
    };
  } catch (error) {
    console.error('Error during fetching common libs:', error);
    throw error;
  }
});

const commonLibsSlice = createSlice({
  name: 'commonLibs',
  initialState: initialCommonLibState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommonLibs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommonLibs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = action.payload.positions;
        state.iprStatus = action.payload.iprStatus;
        state.iprGoals = action.payload.iprGoals;
        state.taskStatus = action.payload.taskStatus;
        state.specialty = action.payload.specialty;
        state.iprCompetency = action.payload.iprCompetency;
        state.education = action.payload.education;
      })
      .addCase(fetchCommonLibs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred.';
      });
  },
});

// Селекторы
export const selectCommonLibs = (state: RootState) => state.commonLibs;
export const selectCommonLibsPositions = (state: RootState) => selectCommonLibs(state).positions;
export const selectCommonLibsIPRStatus = (state: RootState) => selectCommonLibs(state).iprStatus;
export const selectCommonLibsIPRGoals = (state: RootState) => selectCommonLibs(state).iprGoals;
export const selectCommonLibsTaskStatus = (state: RootState) => selectCommonLibs(state).taskStatus;
export const selectCommonLibsLoading = (state: RootState) => selectCommonLibs(state).isLoading;
export const selectCommonLibsError = (state: RootState) => selectCommonLibs(state).error;
export const selectCommonLibsSpecialty = (state: RootState) => selectCommonLibs(state).specialty;

export const selectCommonLibsIPRCompetency = (state: RootState) => selectCommonLibs(state).iprCompetency;

export const selectCommonLibsEducation = (state: RootState) => selectCommonLibs(state).education;

export default commonLibsSlice.reducer;
