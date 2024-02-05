import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BASE_URL } from '../../shared/utils/constants';
import { fetchDataFromApi } from '../api';

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
  selectedUser: IUser | null; // Добавлено поле selectedUser
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
    position: { name: '' },
    specialty: { name: '' },
    supervisorId: 0,
    isSupervisor: false,
    isMentor: false,
  },
  selectedUser: null,
  access_token: null,
  isLoading: false,
  error: '',
};

type logInData = {
  email: string;
  password: string;
};

export const logInUser = createAsyncThunk<any, logInData>('user/signin', async (data) => {
  try {
    const formData = new FormData();
    formData.append('username', data.email);
    formData.append('password', data.password);

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
});

export const getUserData = createAsyncThunk<any>('user/getData', async () => {
  try {
    const res = await fetchDataFromApi(`/api/v1/user/me`, {
      method: 'GET',
    });
    return res;
  } catch (error) {
    console.error('Error during fetching user data:', error);
    throw error;
  }
});

export const getUserById = createAsyncThunk<any, number>('user/getById', async (id) => {
  try {
    const res = await fetchDataFromApi(`/api/v1/user/${id}`, {
      method: 'GET',
    });
    return res;
  } catch (error) {
    console.error('Error during fetching user data by id:', error);
    throw error;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      return initialState;
    },
    setUserData: (state, action: PayloadAction<IUser>) => {
      const {
        id,
        email,
        firstName,
        surname,
        patronymic,
        imageUrl,
        position,
        specialty,
        supervisorId,
        isSupervisor,
        isMentor,
      } = action.payload;

      state.user = {
        id,
        email,
        isActive: true,
        isSuperuser: false,
        isVerified: false,
        firstName,
        surname,
        patronymic,
        imageUrl,
        position: { name: position.name },
        specialty: { name: specialty.name },
        supervisorId,
        isSupervisor,
        isMentor,
      };
    },
    setSelectedUser: (state, action: PayloadAction<IUser | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
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
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
  },
});

export const { clearUserData, setUserData, setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
