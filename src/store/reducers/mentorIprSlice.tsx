import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/utils/constants';
import { RootState } from '../store';

export interface Mentor {
	dateOfEnd: string;
	firstName: string;
	goalId: string;
	id: number;
	imageUrl: string;
	lastName: string;
	middleName: string;
	position_id: string;
	progress: string;
	specialty_id: string;
	statusId: string;
	taskCompleted: number;
	taskCount: number;
}

interface MentorIPRSListResponse {
	employees: Mentor[];
}

export type MentorSliceState = {
	mentorIPRSList: MentorIPRSListResponse | null;
	isLoading: boolean;
	error: string;
};

const initialState: MentorSliceState = {
	mentorIPRSList: null,
	isLoading: false,
	error: '',
};

export const getMentorIprsList = createAsyncThunk<MentorIPRSListResponse>(
	'mentorIprs/getList',
	async () => {
		//console.log('Before fetching data'); // Добавьте эту строку
		try {
			// Получаем токен из localStorage
			const token = localStorage.getItem('token');
			//console.log('TOKEN in getManagerIPRSList', token);

			if (!token) {
				throw new Error('Токен отсутствует в localStorage');
			}

			const res = await fetch(`${BASE_URL}/api/v1/mentι/iprs/?take=-1&skip=0`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

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

const mentorIprsSlice = createSlice({
	name: 'mentorIprs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getMentorIprsList.fulfilled, (state, action) => {
			// console.log('Reached getManegerIPRSList.fulfilled block');
			// console.log('Fulfilled Payload:', action.payload);
			// console.log('Payload type:', typeof action.payload);
			state.mentorIPRSList = action.payload;
		});
	},
});

export const selectMentorList = (state: RootState) =>
	state.mentorIprs.mentorIPRSList;

export default mentorIprsSlice.reducer;
