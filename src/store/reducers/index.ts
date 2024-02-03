import { Reducer, combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';
import commonLibsReducer, { TCommonLibState } from './libSlice';
import iprsReducer, { IPRSState } from './iprsSlice';
import iprReducer, { TIprDataState } from './iprSlice';
import managerIprsReducer, { IPRSSliceState } from './managerIprSlice';
import mentorIprsReducer, { MentorSliceState } from './mentorIprSlice';
import formReducer, { IFormState } from './formSlice';

export interface RootState {
	user: Reducer<UserState>; // тип состояния пользователя
	commonLibs: Reducer<TCommonLibState>;
	iprs: Reducer<IPRSState>;
	managerIprs: Reducer<IPRSSliceState>;
	mentorIprs: Reducer<MentorSliceState>;
	form: Reducer<IFormState>;
	ipr: Reducer<TIprDataState>;
}

const rootReducer = combineReducers<RootState>({
	user: userReducer,
	commonLibs: commonLibsReducer,
	iprs: iprsReducer,
	managerIprs: managerIprsReducer,
	mentorIprs: mentorIprsReducer,
	form: formReducer,
	ipr: iprReducer,
});

export default rootReducer;
