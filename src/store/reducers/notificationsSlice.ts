import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../../shared/utils/constants';

export const getNotificationList = createAsyncThunk<NotificationListListResponse>('notifications', async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Токен отсутствует в localStorage');
    }

    const res = await fetch(`${BASE_URL}/api/v1/notifications`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Не удалось получить нотификации пользователя');
    }
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
