import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/utils/constants';
interface IprStatus {
	id: string;
	name: string;
}

interface Competency {
	competency_rel: {
		id: string;
		name: string;
	};
}

interface Goal {
	id: string;
	name: string;
}

interface Specialty {
	name: string;
}

interface Mentor {
	name: string;
	surname: string;
	patronymic: string;
}

interface File {
	name: string;
	url: string;
	id: number;
}

interface Education {
	status: boolean;
	education: {
		id: number;
		name: string;
		urlLink: string;
	};
}

export interface Task {
	name: string;
	description: string;
	closeDate: string;
	id: number;
	supervisorComment: string;
	comment: string;
	taskStatus: {
		id: string;
		name: string;
	};
	file: File[];
	education: Education[];
}

export interface IprData {
	id: number;
	status: IprStatus;
	competency: Competency[];
	supervisorId: number;
	goal: Goal;
	specialty: Specialty;
	createDate: string;
	closeDate: string;
	mentor: Mentor;
	description: string;
	comment: string;
	taskCompleted: number;
	taskCount: number;
	supervisorComment: string;
	task: Task[];
}

export interface IPRSState {
	iprsData: IprData[];
	openedIpr: {};
	isLoading: boolean;
	error: string | DeleteIprError; // Update the error type based on your requirements
}

interface IPRSData {
	id: number;
	goal?: {
		id: string;
		name: string;
	};
	closeDate: string;
	createDate: string;
	status: {
		id: string;
		name: 'Черновик' | 'В работе' | 'Выполнен' | 'Не выполнен' | 'Отменен';
	};
}

export interface IPRSCreatePayload {
	employeeId: number;
}

interface DeleteIprError {
	message: string;
}

const initialState: IPRSState = {
	iprsData: [],
	openedIpr: {},
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

export const getIprByIdBySupervisor = createAsyncThunk<IprData, number>(
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

export const getIprByIdByEmployee = createAsyncThunk<IprData, number>(
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
			// успешное удаление и в ответе нет ничего
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
		builder.addCase(getIprByIdBySupervisor.fulfilled, (state, action) => {
			const iprData = action.payload;
			const existingIndex = state.iprsData.findIndex(
				(ipr) => ipr.id === iprData.id
			);
			if (existingIndex !== -1) {
				state.iprsData[existingIndex] = iprData;
			} else {
				state.iprsData.push(iprData);
			}
			state.isLoading = false;
			state.error = '';
		});
		builder.addCase(getIprByIdByEmployee.fulfilled, (state, action) => {
			const iprData = action.payload;
			state.openedIpr = iprData;
			const existingIndex = state.iprsData.findIndex(
				(ipr) => ipr.id === iprData.id
			);
			if (existingIndex !== -1) {
				state.iprsData[existingIndex] = iprData;
			} else {
				state.iprsData.push(iprData);
			}
			state.isLoading = false;
			state.error = '';
		});
	},
});

export default iprsSlice.reducer;
