import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchDataFromApi } from '../api';

export const getNotificationList = createAsyncThunk<NotificationListListResponse>('notifications', async () => {
  try {
    const res = await fetchDataFromApi<NotificationListListResponse>(`/api/v1/notifications`, {
      method: 'GET',
    });
    return res;
  } catch (error) {
    console.error('Ошибка запроса notifications:', error);
    throw error;
  }
});

interface NotificationListListResponse {
  title: string;
  briefText: string;
  date: string;
  url: string;
}

export type NotificationsSliceState = {
  notificationList: NotificationListListResponse | null;
  isLoading: boolean;
  error: string;
};

const initialState: NotificationsSliceState = {
  notificationList: null,
  isLoading: false,
  error: '',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotificationList.fulfilled, (state, action) => {
      state.notificationList = action.payload;
    });
  },
});

export default notificationsSlice.reducer;
