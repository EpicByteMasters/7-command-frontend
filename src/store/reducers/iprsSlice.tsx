import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IPRSdata {
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
	iprsData: IPRSdata[];
	isLoading: boolean;
	error: string;
};

let initialState: IPRSState;
initialState = {
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
			'http://213.171.6.128:81/api/v1/mentor/iprs/ipr/my_iprs',
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

export const iprsSlice = createSlice({
	name: 'iprs',
	initialState,
	reducers: {
		clearIPRSData: (state, action) => {
			return (state = action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getIPRSData.fulfilled, (state, action) => {
			state.iprsData = action.payload;
		});
	},
});

export default iprsSlice.reducer;
