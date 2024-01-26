import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определение типа данных пользователя
export interface UserData {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	role: 'MENTOR' | 'EMPLOYEE' | 'MANAGER';
	imageUrl: string;
}

// Изменения в структуре UserState
export interface UserState {
	user: UserData | null; // Изменение типа на UserData или null
}

// Изменения в начальном состоянии
const initialState: UserState = {
	user: null, // Изначально пользователь отсутствует
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ user: UserData | null }>) => {
			state.user = action.payload.user;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
