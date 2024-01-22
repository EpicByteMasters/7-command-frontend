// goalsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoalsState {
	activeGoalId: number | null;
}

const initialState: GoalsState = {
	activeGoalId: null,
};

export const goalSlice = createSlice({
	name: 'goal',
	initialState,
	reducers: {
		setActiveGoalId: (state, action: PayloadAction<number | null>) => {
			state.activeGoalId = action.payload;
		},
	},
});

export const { setActiveGoalId } = goalSlice.actions;

export const selectActiveGoalId = (state: { goal: GoalsState }) =>
	state.goal.activeGoalId;

export default goalSlice.reducer;
