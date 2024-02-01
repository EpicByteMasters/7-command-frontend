import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../../shared/utils/constants';

export interface IUser {
	id: number;
	email: string;
	isActive: boolean;
	isSuperuser: boolean;
	isVerified: boolean;
	firstName: string;
	surname: string;
	patronymic: string;
	imageUrl: string;
	position: {
		name: string;
	};
	specialty: {
		name: string;
	};
	supervisorId: number;
	isSupervisor: boolean;
	isMentor: boolean;
}

export type UserState = {
	user: IUser;
	access_token: string | null;
	isLoading: boolean;
	error: string;
};

let initialState: UserState;
initialState = {
	user: {
		id: 0,
		email: '',
		isActive: true,
		isSuperuser: false,
		isVerified: false,
		firstName: '',
		surname: '',
		patronymic: '',
		imageUrl: '',
		position: { name: '' }, // Обновлено для соответствия интерфейсу IUser
		specialty: { name: '' }, // Обновлено для соответствия интерфейсу IUser
		supervisorId: 0,
		isSupervisor: false,
		isMentor: false,
	},
	access_token: null,
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

			console.log('Request data:', {
				email: data.email,
				password: data.password,
			});

			const response = await fetch(`${BASE_URL}/api/v1/auth/jwt/login`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const responseBody = await response.json();

			// Возвращаем объект, содержащий access_token
			return { access_token: responseBody.access_token, ...responseBody };
		} catch (error) {
			console.error('Error during login:', error);
			throw error;
		}
	}
);

export const getUserData = createAsyncThunk<any>('user/getData', async () => {
	try {
		// Получаем токен из localStorage
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('Токен отсутствует в localStorage');
		}

		const res = await fetch(`${BASE_URL}/api/v1/user/me`, {
			method: 'GET',
			headers: {
				// Передаем токен в заголовках
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.status === 200) {
			return res.json();
		} else {
			throw new Error('Не удалось получить данные о текущем пользователе');
		}
	} catch (error) {
		console.error('Error during fetching user data:', error);
		throw error;
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUserData: (state, action) => {
			return (state = action.payload);
		},
		setUserData: (state, action) => {
			state.user.id = action.payload.id;
			state.user.email = action.payload.email;
			state.user.firstName = action.payload.firstName;
			state.user.surname = action.payload.surname;
			state.user.patronymic = action.payload.patronymic;
			state.user.imageUrl = action.payload.imageUrl;
			state.user.position = { name: action.payload.position.name };
			state.user.specialty = { name: action.payload.specialty.name };
			state.user.supervisorId = action.payload.supervisorId;
			state.user.isSupervisor = action.payload.isSupervisor;
			state.user.isMentor = action.payload.isMentor;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logInUser.fulfilled, (state, action) => {
			console.log('Login successful:', action.payload);
			localStorage.setItem('token', action.payload.access_token);
			state.access_token = action.payload.access_token;
		});
		builder.addCase(getUserData.fulfilled, (state, action) => {
			state.user.id = action.payload.id;
			state.user.email = action.payload.email;
			state.user.firstName = action.payload.firstName;
			state.user.surname = action.payload.surname;
			state.user.patronymic = action.payload.patronymic;
			state.user.imageUrl = action.payload.imageUrl;
			state.user.position = { name: action.payload.position.name };
			state.user.specialty = { name: action.payload.specialty.name };
			state.user.supervisorId = action.payload.supervisorId;
			state.user.isSupervisor = action.payload.isSupervisor;
			state.user.isMentor = action.payload.isMentor;
		});
	},
});

export default userSlice.reducer;