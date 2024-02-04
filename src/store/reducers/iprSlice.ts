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
  taskValues: string[];
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

const initialState: TIprDataState = {
  ipr: null,
  isLoading: false,
  error: '',
  taskValues: [],
};

export const createIpr = createAsyncThunk<IIprData, number>('iprs/createIpr', async (userId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ employeeId: userId }),
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to create IPR data');
    }
  } catch (error) {
    console.error('Error during creating IPR data:', error);
    throw error;
  }
});

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

// Кнопка: Сохранить в черновик
export const saveIprDraft = createAsyncThunk<IIprData, number>('iprs/saveIprDraft', async (iprId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${iprId}/save-draft`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to save draft');
    }
  } catch (error) {
    console.error('Error during saving draft:', error);
    throw error;
  }
});

// кнопка: оправить в работу
export const startIpr = createAsyncThunk<IIprData, number>('iprs/startIpr', async (iprId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${iprId}/start-ipr`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to save draft');
    }
  } catch (error) {
    console.error('Error during saving draft:', error);
    throw error;
  }
});

// Кнопка: Сохранить в зависимости от роли (для сотрудника)
export const editIprForEmployee = createAsyncThunk<IIprData, { iprId: number; iprData: Partial<IIprData> }>(
  'iprs/editIprForEmployee',
  async ({ iprId, iprData }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token is missing in localStorage');
      }

      const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${iprId}/edit-ipr-employee`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(iprData),
      });

      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Failed to edit IPR for employee');
      }
    } catch (error) {
      console.error('Error during editing IPR for employee:', error);
      throw error;
    }
  }
);

// Кнопка: Сохранить в зависимости от роли (для руководителя)
export const editIprForSupervisor = createAsyncThunk<IIprData, { iprId: number; iprData: Partial<IIprData> }>(
  'iprs/editIprForSupervisor',
  async ({ iprId, iprData }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token is missing in localStorage');
      }

      const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${iprId}/edit-ipr`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(iprData),
      });

      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Failed to edit IPR');
      }
    } catch (error) {
      console.error('Error during editing IPR:', error);
      throw error;
    }
  }
);

// Кнопка: Отменить
export const cancelIpr = createAsyncThunk<IIprData, number>('iprs/cancelIpr', async (iprId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${iprId}/cancel`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to save draft');
    }
  } catch (error) {
    console.error('Error during saving draft:', error);
    throw error;
  }
});

// Кнопка: Подвести итоги
export const completeIpr = createAsyncThunk<IIprData, number>('iprs/completeIpr', async (iprId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/mentor/iprs/ipr/${iprId}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to save draft');
    }
  } catch (error) {
    console.error('Error during saving draft:', error);
    throw error;
  }
});

// задачи в ИПР Отправить на проверку.
// Если успех(200) - поменять на Ожидает проверки. (сиреневое)
export const completeTask = createAsyncThunk<IIprData, number>('iprs/completeTask', async (iprId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing in localStorage');
    }

    const response = await fetch(`${BASE_URL}/api/v1/task/${iprId}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to save draft');
    }
  } catch (error) {
    console.error('Error during saving draft:', error);
    throw error;
  }
});

// Редьюсер
const iprSlice = createSlice({
  name: 'ipr',
  initialState,
  reducers: {
    setTaskValues: (state, { payload }: PayloadAction<string[]>) => {
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
      //-------------------------Delete IPR-------------------------------------------------------
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
      })
      //----------------------Create IPR----------------------------------------------------------
      .addCase(createIpr.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(createIpr.fulfilled, (state, action) => {
        const { id, employeeId, supervisorId, status } = action.payload;
        if (state.ipr) {
          // Обновление состояния с учетом полученных полей
          state.ipr = {
            ...state.ipr,
            id: id || state.ipr.id,
            employeeId: employeeId || state.ipr.employeeId,
            supervisorId: supervisorId || state.ipr.supervisorId,
            status: status || state.ipr.status,
          };
        }
        state.isLoading = false;
      })
      .addCase(createIpr.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Failed to create IPR';
      })
      //-----------------------------Save Draft---------------------------------------------------
      .addCase(saveIprDraft.fulfilled, (state, action) => {
        state.ipr = action.payload;
        state.isLoading = false;
      })
      .addCase(saveIprDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Failed to save draft';
      })
      //------------------------------StartIpr--------------------------------------------------
      .addCase(startIpr.fulfilled, (state, action) => {
        state.ipr = action.payload;
        state.isLoading = false;
      })
      .addCase(startIpr.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Failed to start IPR';
      })
      //------------------------------Edit Ipr For Employee--------------------------------------------------
      .addCase(editIprForEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(editIprForEmployee.fulfilled, (state, action) => {
        state.ipr = action.payload;
        state.isLoading = false;
      })
      .addCase(editIprForEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to edit IPR for employee';
      })
      //------------------------------Edit Ipr For Supervisor--------------------------------------------------
      .addCase(editIprForSupervisor.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(editIprForSupervisor.fulfilled, (state, action) => {
        state.ipr = action.payload;
        state.isLoading = false;
      })
      .addCase(editIprForSupervisor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to edit IPR';
      })
      //------------------------------Сancel Ipr--------------------------------------------------
      .addCase(cancelIpr.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(cancelIpr.fulfilled, (state, action) => {
        state.ipr = action.payload;
        state.isLoading = false;
      })
      .addCase(cancelIpr.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to cancel IPR';
      })
      //------------------------------Сomplete Ipr--------------------------------------------------
      .addCase(completeIpr.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(completeIpr.fulfilled, (state, action) => {
        state.ipr = action.payload;
        state.isLoading = false;
      })
      .addCase(completeIpr.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to complete IPR';
      })
      //------------------------------Сomplete Task--------------------------------------------------
      .addCase(completeTask.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.ipr = action.payload;
        state.isLoading = false;
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to complete task';
      });
  },
});

export const { setTaskValues } = iprSlice.actions;

export default iprSlice.reducer;
