import { combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';
import goalReducer from './goalSlice';

export interface RootState {
	user: UserState; // тип состояния пользователя
	goal: ReturnType<typeof goalReducer>;
}

const rootReducer = combineReducers({
	user: userReducer,
	goal: goalReducer,
	// добавь другие срезы состояния
});

export default rootReducer;
