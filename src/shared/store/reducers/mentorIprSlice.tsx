import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchDataFromApi } from '../api';
import { RootState } from '../store';
import { IEmployee } from '../type/employees-list';

interface MentorIPRSListResponse {
  employees: IEmployee[];
}

export type MentorSliceState = {
  mentorIPRSList: MentorIPRSListResponse | null;
  isLoading: boolean;
  error: string;
};

const initialState: MentorSliceState = {
  mentorIPRSList: null,
  isLoading: false,
  error: '',
};

export const getMentorIprsList = createAsyncThunk<MentorIPRSListResponse>('mentorIprs/getList', async () => {
  try {
    const response = await fetchDataFromApi<MentorIPRSListResponse>(`/api/v1/menti/iprs/?take=-1&skip=0`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error during fetching ManegerIPRSList data:', error);
    throw error;
  }
});

const mentorIprsSlice = createSlice({
  name: 'mentorIprs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMentorIprsList.fulfilled, (state, action) => {
      state.mentorIPRSList = action.payload;
    });
  },
});

export const selectMentorList = (state: RootState) => state.mentorIprs.mentorIPRSList;

export default mentorIprsSlice.reducer;
