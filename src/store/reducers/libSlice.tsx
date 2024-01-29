import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/utils/constants';
import { RootState } from '../store';

interface ICommonLib {
	id: string;
	name: string;
}

export type TCommonLibState = {
	positions: ICommonLib[];
	iprStatus: ICommonLib[];
	iprGoals: ICommonLib[];
	taskStatus: ICommonLib[];
	isLoading: boolean;
	error: string;
};

let initialCommonLibState: TCommonLibState = {
	positions: [],
	iprStatus: [],
	iprGoals: [],
	taskStatus: [],
	isLoading: false,
	error: '',
};

export const fetchCommonLibs = createAsyncThunk<TCommonLibState>(
	'commonLibs/fetch',
	async () => {
		try {
			const positionsResponse = await fetch(`${BASE_URL}/api/v1/docs/position`);
			const iprStatusResponse = await fetch(
				`${BASE_URL}/api/v1/docs/ipr_status`
			);
			const iprGoalsResponse = await fetch(`${BASE_URL}/api/v1/docs/ipr_goal`);
			const taskStatusResponse = await fetch(
				`${BASE_URL}/api/v1/docs/task_status`
			);

			if (
				!positionsResponse.ok ||
				!iprStatusResponse.ok ||
				!iprGoalsResponse.ok ||
				!taskStatusResponse.ok
			) {
				throw new Error(`HTTP error!`);
			}

			const positions = await positionsResponse.json();
			const iprStatus = await iprStatusResponse.json();
			const iprGoals = await iprGoalsResponse.json();
			const taskStatus = await taskStatusResponse.json();

			return {
				positions,
				iprStatus,
				iprGoals,
				taskStatus,
				isLoading: false,
				error: '',
			};
		} catch (error) {
			console.error('Error during fetching common libs:', error);
			throw error;
		}
	}
);

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
			})
			.addCase(fetchCommonLibs.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? 'An error occurred.';
			});
	},
});

// Селекторы
export const selectCommonLibs = (state: RootState) => state.commonLibs;
export const selectCommonLibsPositions = (state: RootState) =>
	selectCommonLibs(state).positions;
export const selectCommonLibsIPRStatus = (state: RootState) =>
	selectCommonLibs(state).iprStatus;
export const selectCommonLibsIPRGoals = (state: RootState) =>
	selectCommonLibs(state).iprGoals;
export const selectCommonLibsTaskStatus = (state: RootState) =>
	selectCommonLibs(state).taskStatus;
export const selectCommonLibsLoading = (state: RootState) =>
	selectCommonLibs(state).isLoading;
export const selectCommonLibsError = (state: RootState) =>
	selectCommonLibs(state).error;

export default commonLibsSlice.reducer;
