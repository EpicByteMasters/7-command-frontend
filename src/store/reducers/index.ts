import { combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';
import commonLibsReducer, { TCommonLibState } from './libSlice';
import iprsReducer, { IPRSState } from './iprsSlice';
import iprReducer, { TIprDataState } from './iprSlice';
import managerIprsReducer, { IPRSSliceState } from './managerIprSlice';
import mentorIprsReducer, { MentorSliceState } from './mentorIprSlice';
import formReducer, { IFormState } from './formSlice';

export interface RootState {
	user: UserState; // тип состояния пользователя
	commonLibs: TCommonLibState;
	iprs: IPRSState;
	managerIprs: IPRSSliceState;
	mentorIprs: MentorSliceState;
	ipr: TIprDataState;
}

const rootReducer = combineReducers({
	user: userReducer,
	commonLibs: commonLibsReducer,
	iprs: iprsReducer,
	managerIprs: managerIprsReducer,
	mentorIprs: mentorIprsReducer,
	form: formReducer,
	ipr: iprReducer,
	// добавь другие срезы состояния
});

export default rootReducer;
