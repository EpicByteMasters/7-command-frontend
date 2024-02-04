import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BASE_URL } from '../../shared/utils/constants';

export interface ITask {
	id: number;
	name: string;
	taskStatus: {
		id: string;
		name: string;
	};
	description: string;
	supervisorComment: string;
	closeDate: string;
	education: {
		status: boolean;
		education: {
			id: number;
			name: string;
			urlLink: string;
		};
	}[];
	comment: string;
}

export interface IIprData {
	id: number;
	employeeId: number;
	supervisorId: number;
	mentor: {
		id: number;
		firstName: string;
		surname: string;
		patronymic: string;
		imageUrl: string;
	};
	status: {
		id: string;
		name: string;
	};
	goal: {
		id: string;
		name: string;
	};
	specialty: {
		id: string;
		name: string;
	};
	competency: {
		competencyRel: {
			id: string;
			name: string;
		};
	}[];
	description: string;
	supervisorComment: string;
	task: ITask[];
	comment: string;
	iprGrade: number;
}

export type TIprDataState = {
	ipr: IIprData | null;
	isLoading: boolean;
	error: string;
	taskValues: unknown | null;
};

export const initialIprData: IIprData = {
	id: 0,
	employeeId: 0,
	supervisorId: 0,
	mentor: {
		id: 0,
		firstName: '',
		surname: '',
		patronymic: '',
		imageUrl: '',
	},
	status: {
		id: '',
		name: '',
	},
	goal: {
		id: '',
		name: '',
	},
	specialty: {
		id: '',
		name: '',
	},
	competency: [],
	description: '',
	supervisorComment: '',
	task: [],
	comment: '',
	iprGrade: 0,
};

export const getIprByIdBySupervisor = createAsyncThunk<IIprData, number>(
	'iprs/getIprSupevisor',
	async (id) => {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Token is missing in localStorage');
			}

			const response = await fetch(
				`${BASE_URL}/api/v1/mentor/iprs/ipr/${id}/supervisor`,
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
				throw new Error('Failed to fetch IPR data');
			}
		} catch (error) {
			console.error('Error during fetching IPR data:', error);
			throw error;
		}
	}
);

export const getIprByIdByEmployee = createAsyncThunk<IIprData, number>(
	'iprs/getIprEmployee',
	async (id) => {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Token is missing in localStorage');
			}

			const response = await fetch(
				`${BASE_URL}/api/v1/mentor/iprs/ipr/${id}/employee`,
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
				throw new Error('Failed to fetch IPR data');
			}
		} catch (error) {
			console.error('Error during fetching IPR data:', error);
			throw error;
		}
	}
);

const initialState: TIprDataState = {
	ipr: null,
	isLoading: false,
	error: '',
	taskValues: null,
};

// Редьюсер
const iprSlice = createSlice({
	name: 'ipr',
	initialState,
	reducers: {
		setTaskValues: (state, { payload }: PayloadAction<unknown>) => {
			console.log({ payload });
			state.taskValues = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getIprByIdBySupervisor.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(getIprByIdBySupervisor.fulfilled, (state, action) => {
				state.ipr = action.payload;
				state.isLoading = false;
			})
			.addCase(getIprByIdBySupervisor.rejected, (state, action) => {
				state.isLoading = false;
				state.error = 'Failed to fetch supervisor IPR data';
			})
			.addCase(getIprByIdByEmployee.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(getIprByIdByEmployee.fulfilled, (state, action) => {
				state.ipr = action.payload;
				state.isLoading = false;
			})
			.addCase(getIprByIdByEmployee.rejected, (state, action) => {
				state.isLoading = false;
				state.error = 'Failed to fetch employee IPR data';
			});
	},
});

export const { setTaskValues } = iprSlice.actions;

export default iprSlice.reducer;
