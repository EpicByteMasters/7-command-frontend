import { combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';
import commonLibsReducer, { TCommonLibState } from './libSlice';
import iprsReducer, { IPRSState } from './iprsSlice';

export interface RootState {
	user: UserState; // тип состояния пользователя
	commonLibs: TCommonLibState;
	iprs: IPRSState;
}

const rootReducer = combineReducers({
	user: userReducer,
	commonLibs: commonLibsReducer,
	iprs: iprsReducer,
	// добавь другие срезы состояния
});

export default rootReducer;
