import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { BASE_URL } from '../../shared/utils/constants';

export interface ITask {
  name: string;
  description: string;
  closeDate: string;
  id: number;
  education: number[];
  supervisorComment: string;
  taskStatusId: string;
}

export interface IFormState {
  goalId: string;
  specialtyId: string;
  competency: string[];
  mentorId: number;
  description: string;
  supervisorComment: string;
  tasks: ITask[];
}

const initialState: IFormState = {
  goalId: '',
  specialtyId: '',
  competency: [],
  mentorId: 0,
  description: '',
  supervisorComment: '',
  tasks: [],
};

interface IError {
  message: string;
}

export const saveFormAndHandleResult = createAsyncThunk(
  'form/saveDraft',
  async ({ iprId, data }: { iprId: string; data: IFormState }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/mentor/iprs/ipr/${iprId}/save-draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save FORM data');
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      return rejectWithValue({ message: error.message } as IError);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<IFormState>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFormAndHandleResult.fulfilled, (state, action) => {
        const newDataFromServer = action.payload;
        return { ...state, ...newDataFromServer };
      })
      .addCase(saveFormAndHandleResult.rejected, (state, action) => {
        console.error('Error saving form:', action.error.message);
      });
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export const selectForm = (state: { form: IFormState }) => state.form;

export default formSlice.reducer;
