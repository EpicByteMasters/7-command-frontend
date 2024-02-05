import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IIprsArrState } from 'src/store/type/iprs-arr-data';

import { fetchDataFromApi } from '../api';

const initialState: IIprsArrState = {
  iprsData: [],
  iprsHistoryData: [],
  isLoading: false,
  error: '',
};

export const getMyIprsData = createAsyncThunk<any>('iprs/getData', async () => {
  try {
    const response = await fetchDataFromApi(`/api/v1/mentor/iprs/ipr/employees/my-iprs`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error during fetching IPRS data:', error);
    throw error;
  }
});

export const getIprsEmployeeHistory = createAsyncThunk<any, number>('iprs/getIprsHistory', async (id: number) => {
  try {
    const response = await fetchDataFromApi(`/api/v1/mentor/iprs/ipr/${id}/list-iprs`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error during fetching IPRS data:', error);
    throw error;
  }
});

export const iprsSlice = createSlice({
  name: 'iprs',
  initialState,
  reducers: {
    clearIPRSData: (state, action: PayloadAction<IIprsArrState>) => {
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
      state.error = action.error.message ?? 'Failed to fetch IPRS employee history';
    });
  },
});

export default iprsSlice.reducer;
