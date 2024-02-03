import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/utils/constants';
import { RootState } from '../store';

export interface Employee {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	imageUrl: string;
	positionId: string;
	goalId: string;
	statusIid: string;
	taskCount: number;
	taskCompleted: number;
	iprId: number;
	dateOfEnd: string;
}

interface ManagerIPRSListResponse {
	employees: Employee[];
	total_count_employee: number;
	total_count_iprs: number;
}

export type IPRSSliceState = {
	managerIPRSList: ManagerIPRSListResponse | null;
	isLoading: boolean;
	error: string;
};

const initialState: IPRSSliceState = {
	managerIPRSList: null,
	isLoading: false,
	error: '',
};

export const getManagerIprsList = createAsyncThunk<ManagerIPRSListResponse>(
	'managerIprs/getList',
	async () => {
		//console.log('Before fetching data'); // Добавьте эту строку
		try {
			// Получаем токен из localStorage
			const token = localStorage.getItem('token');
			//console.log('TOKEN in getManagerIPRSList', token);

			if (!token) {
				throw new Error('Токен отсутствует в localStorage');
			}

			const res = await fetch(
				`${BASE_URL}/api/v1/mentor/iprs/?take=100&skip=0`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (res.status === 200) {
				return res.json();
			} else {
				throw new Error('Не удалось получить данные о списке ИПР руководителя');
			}
		} catch (error) {
			console.error('Error during fetching ManegerIPRSList data:', error);
			throw error;
		}
	}
);

const managerIprsSlice = createSlice({
	name: 'managerIprs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getManagerIprsList.fulfilled, (state, action) => {
			// console.log('Reached getManegerIPRSList.fulfilled block');
			// console.log('Fulfilled Payload:', action.payload);
			// console.log('Payload type:', typeof action.payload);
			state.managerIPRSList = action.payload;
		});
	},
});

export const selectManagerList = (state: RootState) =>
	state.managerIprs.managerIPRSList;

export default managerIprsSlice.reducer;
