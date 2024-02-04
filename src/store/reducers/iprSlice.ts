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

interface ICompetencyRel {
  id: string;
  name: string;
}

export interface ICompetency {
  competencyRel: ICompetencyRel;
}

export interface IMentor {
  id: number;
  firstName: string;
  surname: string;
  patronymic: string;
  imageUrl: string;
}

export interface IIprData {
  id: number;
  employeeId: number;
  supervisorId: number;
  closeDate: string;
  createDate: string;
  mentor: IMentor;
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
  competency: ICompetency[];
  description: string;
  supervisorComment: string;
  task: ITask[];
  comment?: string;
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
  closeDate: '',
  createDate: '',
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

export const getIprByIdBySupervisor = createAsyncThunk<IIprData, number>('iprs/getIprSupevisor', async (id) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${id}/supervisor`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to fetch IPR data');
    }
  } catch (error) {
    console.error('Error during fetching IPR data:', error);
    throw error;
  }
});

export const getIprByIdByEmployee = createAsyncThunk<IIprData, number>('iprs/getIprEmployee', async (id) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${id}/employee`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to fetch IPR data');
    }
  } catch (error) {
    console.error('Error during fetching IPR data:', error);
    throw error;
  }
});

const initialState: TIprDataState = {
  ipr: null,
  isLoading: false,
  error: '',
  taskValues: null,
};
export const deleteIprById = createAsyncThunk<string, number>('ipr/deleteIpr', async (id) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${id}/delete`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // Успешное удаление и в ответе нет ничего
      return '';
    } else {
      throw new Error('Failed to delete IPR');
    }
  } catch (error) {
    console.error('Error during deleting IPR:', error);
    throw error;
  }
});

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
      })
      .addCase(deleteIprById.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(deleteIprById.fulfilled, (state) => {
        // Успешное удаление, обнуляем данные
        state.ipr = null;
        state.isLoading = false;
      })
      .addCase(deleteIprById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to delete IPR';
      });
  },
});

export const { setTaskValues } = iprSlice.actions;

export default iprSlice.reducer;

// export const createIPR = createAsyncThunk<any, IPRSCreatePayload>(
// 	'iprs/create',
// 	async (payload) => {
// 		try {
// 			const token = localStorage.getItem('token');

// 			if (!token) {
// 				throw new Error('Token is missing in localStorage');
// 			}

// 			const response = await fetch(
// 				`${BASE_URL}/api/v1/mentor/iprs/ipr/create`,
// 				{
// 					method: 'POST',
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 						'Content-Type': 'application/json',
// 					},
// 					body: JSON.stringify({
// 						employeeId: payload.employeeId,
// 					}),
// 				}
// 			);

// 			if (response.status === 200) {
// 				return response.json();
// 			} else {
// 				throw new Error('Failed to create IPR');
// 			}
// 		} catch (error) {
// 			console.error('Error during creating IPR:', error);
// 			throw error;
// 		}
// 	}
// );

// export const deleteIpr = createAsyncThunk<
// 	void,
// 	number,
// 	{ rejectValue: DeleteIprError }
// >('iprs/deleteIpr', async (iprId, { rejectWithValue }) => {
// 	try {
// 		const token = localStorage.getItem('token');

// 		if (!token) {
// 			throw new Error('Token is missing in localStorage');
// 		}

// 		const response = await fetch(
// 			`${BASE_URL}/api/v1/mentor/iprs/ipr/${iprId}`,
// 			{
// 				method: 'DELETE',
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			}
// 		);

// 		if (response.status === 204) {
// 			// успешное удаление и в ответе нет ничего
// 			return;
// 		} else {
// 			throw new Error('Failed to delete IPR');
// 		}
// 	} catch (error: any) {
// 		console.error('Error during deleting IPR:', error);
// 		return rejectWithValue({ message: error.message } as DeleteIprError);
// 	}
// });
