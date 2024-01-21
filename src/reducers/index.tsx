import { combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice'; // импорт среза пользователя
// добавь другие срезы состояния

export interface RootState {
	user: UserState; // тип состояния пользователя
	// добавь другие типы состояния
}

const rootReducer = combineReducers({
	user: userReducer,
	// добавь другие срезы состояния
});

export default rootReducer;
