import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/utils/constants';

interface IGoal {
	id: string;
	name: string;
}

interface IStatus {
	id: string;
	name: string;
}

export interface IIpr {
	id: number;
	goal: IGoal;
	status: IStatus;
	createDate: string;
	closeDate: string;
	taskCount: number;
	taskCompleted: number;
}

export interface IprsArrState {
	iprsData: IIpr[];
	iprsHistoryData: IIpr[];
	isLoading: boolean;
	error: string;
}

const initialState: IprsArrState = {
	iprsData: [],
	iprsHistoryData: [],
	isLoading: false,
	error: '',
};

export const getMyIprsData = createAsyncThunk<any>('iprs/getData', async () => {
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('Token is missing in localStorage');
		}

		const response = await fetch(
			`${BASE_URL}/api/v1/mentor/iprs/ipr/employees/my-iprs`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error('Failed to fetch IPRS data');
		}
	} catch (error) {
		console.error('Error during fetching IPRS data:', error);
		throw error;
	}
});

export const getIprsEmployeeHistory = createAsyncThunk<any, number>(
	'iprs/getIprsHistory',
	async (id: number) => {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Token is missing in localStorage');
			}

			const response = await fetch(
				`${BASE_URL}/api/v1/mentor/iprs/ipr/${id}/list-iprs`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				return response.json();
			} else {
				throw new Error('Failed to fetch IPRS data');
			}
		} catch (error) {
			console.error('Error during fetching IPRS data:', error);
			throw error;
		}
	}
);

export const iprsSlice = createSlice({
	name: 'iprs',
	initialState,
	reducers: {
		clearIPRSData: (state, action: PayloadAction<IprsArrState>) => {
			return (state = action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMyIprsData.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});

		builder.addCase(getMyIprsData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.iprsData = action.payload;
		});

		builder.addCase(getMyIprsData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message ?? 'Failed to fetch IPRS data';
		});

		// История ИПР сотрудника
		builder.addCase(getIprsEmployeeHistory.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});

		builder.addCase(getIprsEmployeeHistory.fulfilled, (state, action) => {
			state.isLoading = false;
			// Обновляем данные в соответствии с вторым асинхронным действием
			state.iprsData = action.payload;
		});

		builder.addCase(getIprsEmployeeHistory.rejected, (state, action) => {
			state.isLoading = false;
			state.error =
				action.error.message ?? 'Failed to fetch IPRS employee history';
		});
	},
});

export default iprsSlice.reducer;
