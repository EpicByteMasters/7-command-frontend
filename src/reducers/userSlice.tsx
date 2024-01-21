import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определи тип состояния
export interface UserState {
	user: string; // или какой там тип данных для пользователя
}

// Начальное состояние
const initialState: UserState = {
	user: '',
};

// Создание среза
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
