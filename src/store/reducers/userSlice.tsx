import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

// Определение типа данных пользователя
export interface IUser {
	id: string;
	email: string;
	isActive: boolean;
	isSuperuser: boolean;
	isVerified: boolean;
	firstName: string;
	surname: string;
	patronymic: string;
	imageUrl: string;
	positionId: string;
	specialtyId: string;
	supervisorId: number;
}

// Изменения в структуре UserState
export type UserState = {
	user: IUser;
	auth_token: string | null;
	isLoading: boolean;
	error: string;
};

// Изменения в начальном состоянии
let initialState: UserState;

initialState = {
	user: {
		id: '',
		email: '',
		isActive: true,
		isSuperuser: false,
		isVerified: false,
		firstName: '',
		surname: '',
		patronymic: '',
		imageUrl: '',
		positionId: '',
		specialtyId: '',
		supervisorId: 0,
	},
	auth_token: null,
	isLoading: false,
	error: '',
};

// const userSlice = createSlice({
// 	name: 'user',
// 	initialState,
// 	reducers: {
// 		setUser: (state, action: PayloadAction<{ user: UserData | null }>) => {
// 			state.user = action.payload.user;
// 		},
// 	},
// });

// export const { setUser } = userSlice.actions;

type logInData = {
	email: string;
	password: string;
};

export const logInUser = createAsyncThunk<any, logInData>(
	'user/signin',
	async (data) => {
		const formData = new FormData();
		formData.append('username', data.email);
		formData.append('password', data.password);

		const response = await fetch(
			'http://213.171.6.128:81/api/v1/auth/jwt/login',
			{
				method: 'POST',
				body: formData,
			}
		);
		let res;
		if (response.status === 200) {
			res = response.json();
		} else if (response.status === 400) {
			throw new Error('Invalid Data');
		} else if (response.status === 500) {
			throw new Error('Server Error');
		}
		return res;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUserData: (state, action) => {
			return (state = action.payload);
		},
		setUserData: (state, action) => {
			state.user.email = action.payload.email;
			state.user.firstName = action.payload.firstName;
			state.user.surname = action.payload.surname;
			state.user.patronymic = action.payload.patronymic;
			state.user.imageUrl = action.payload.imageUrl;
			state.user.positionId = action.payload.positionId;
			state.user.specialtyId = action.payload.specialtyId;
			state.user.supervisorId = action.payload.supervisorId;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(logInUser.fulfilled, (state, action) => {
			localStorage.setItem('token', action.payload.auth_token);
			state.auth_token = action.payload.auth_token;
			console.log('Login successful:', action.payload);
		});
	},
});

export default userSlice.reducer;
