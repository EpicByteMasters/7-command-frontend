import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	user: string;
}

const initialState: UserState = {
	user: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ user: string }>) => {
			state.user = action.payload.user;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
