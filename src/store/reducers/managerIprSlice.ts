import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchDataFromApi } from '../api';
import { RootState } from '../store';
import { IEmployee } from '../type/employees-list';

interface ManagerIPRSListResponse {
  employees: IEmployee[];
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

export const getManagerIprsList = createAsyncThunk<ManagerIPRSListResponse>('managerIprs/getList', async () => {
  try {
    const response = await fetchDataFromApi<ManagerIPRSListResponse>(`/api/v1/mentor/iprs/?take=100&skip=0`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error during fetching ManegerIPRSList data:', error);
    throw error;
  }
});

const managerIprsSlice = createSlice({
  name: 'managerIprs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getManagerIprsList.fulfilled, (state, action) => {
      state.managerIPRSList = action.payload;
    });
  },
});

export const selectManagerList = (state: RootState) => state.managerIprs.managerIPRSList;

export default managerIprsSlice.reducer;
