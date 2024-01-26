import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export type UserState = {
	user: IUser;
	isLoading: boolean;
	error: string;
};

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
	isLoading: false,
	error: '',
};

type logInData = {
	email: string;
	password: string;
};

export const logInUser = createAsyncThunk<any, logInData>(
	'user/signin',
	async (data) => {
		try {
			const formData = new FormData();
			formData.append('username', data.email);
			formData.append('password', data.password);

			const response = await fetch(
				'http://213.171.6.128:80/api/v1/auth/jwt/login',
				{
					method: 'POST',
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const responseBody = await response.json();
			return responseBody;
		} catch (error) {
			console.error('Error during login:', error);
			throw error;
		}
	}
);

export const getUserData = createAsyncThunk<any>('user/getData', async () => {
	const res = await fetch('', {
		method: 'GET',
	});

	let response;
	if (res.status === 200) {
		response = res.json();
	} else {
		throw new Error('Не возможно получить данные о текущем пользователе');
	}
	return response;
});

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
			console.log('Login successful:', action.payload);
		});
		builder.addCase(getUserData.fulfilled, (state, action) => {
			state.user.email = action.payload.email;
			state.user.firstName = action.payload.firstName;
			state.user.surname = action.payload.surname;
			state.user.patronymic = action.payload.patronymic;
			state.user.imageUrl = action.payload.imageUrl;
			state.user.positionId = action.payload.positionId;
			state.user.specialtyId = action.payload.specialtyId;
			state.user.supervisorId = action.payload.supervisorId;
		});
	},
});

export default userSlice.reducer;
