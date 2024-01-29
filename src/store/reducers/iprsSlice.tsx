import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/utils/constants';

export interface IPRSData {
	id: number;
	iprStatus: string;
	supervisorId: number;
	goal: string;
	specialty: string;
	createDate: string;
	closeDate: string;
	mentorId: number;
	description: string;
	comment: string;
	supervisorComment: string;
}

export type IPRSState = {
	iprsData: IPRSData[];
	isLoading: boolean;
	error: string;
};

export interface IPRSCreatePayload {
	employeeId: number;
}

interface DeleteIprError {
	message: string;
}

const initialState: IPRSState = {
	iprsData: [],
	isLoading: false,
	error: '',
};

export const getIPRSData = createAsyncThunk<any>('iprs/getData', async () => {
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('Token is missing in localStorage');
		}

		const response = await fetch(
			`${BASE_URL}/api/v1/mentor/iprs/ipr/employees/my_iprs`,
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

export const createIPR = createAsyncThunk<any, IPRSCreatePayload>(
	'iprs/create',
	async (payload) => {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Token is missing in localStorage');
			}

			const response = await fetch(
				`${BASE_URL}/api/v1/mentor/iprs/ipr/create`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						employeeId: payload.employeeId,
					}),
				}
			);

			if (response.status === 200) {
				return response.json();
			} else {
				throw new Error('Failed to create IPR');
			}
		} catch (error) {
			console.error('Error during creating IPR:', error);
			throw error;
		}
	}
);

export const deleteIpr = createAsyncThunk<
	void,
	number,
	{ rejectValue: DeleteIprError }
>('iprs/deleteIpr', async (iprId, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('Token is missing in localStorage');
		}

		const response = await fetch(
			`${BASE_URL}/api/v1/mentor/iprs/ipr/${iprId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.status === 204) {
			// Deletion successful, no content in the response
			return;
		} else {
			throw new Error('Failed to delete IPR');
		}
	} catch (error: any) {
		console.error('Error during deleting IPR:', error);
		return rejectWithValue({ message: error.message } as DeleteIprError);
	}
});

export const iprsSlice = createSlice({
	name: 'iprs',
	initialState,
	reducers: {
		clearIPRSData: (state, action: PayloadAction<IPRSState>) => {
			return (state = action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getIPRSData.fulfilled, (state, action) => {
			state.iprsData = action.payload;
		});
		builder.addCase(createIPR.fulfilled, (state, action) => {
			state.iprsData.push(action.payload);
			state.isLoading = false;
			state.error = '';
		});
	},
});

export default iprsSlice.reducer;
