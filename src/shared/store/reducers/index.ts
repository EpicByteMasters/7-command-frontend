import { Reducer, combineReducers } from '@reduxjs/toolkit';

import { IIprsArrState } from 'src/shared/store/type/iprs-arr-data';

import { TCommonLibState } from 'src/shared/store/type/libraries';

import { TIprDataState } from '../type/ipr-data';

import userReducer, { UserState } from './userSlice';
import commonLibsReducer from './libSlice';
import iprsReducer from './iprsSlice';
import iprReducer from './iprSlice';
import managerIprsReducer, { IPRSSliceState } from './managerIprSlice';
import mentorIprsReducer, { MentorSliceState } from './mentorIprSlice';

export interface RootState {
  user: Reducer<UserState>; // тип состояния пользователя
  commonLibs: Reducer<TCommonLibState>;
  iprs: Reducer<IIprsArrState>;
  managerIprs: Reducer<IPRSSliceState>;
  mentorIprs: Reducer<MentorSliceState>;
  ipr: Reducer<TIprDataState>;
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
  commonLibs: commonLibsReducer,
  iprs: iprsReducer,
  managerIprs: managerIprsReducer,
  mentorIprs: mentorIprsReducer,
  ipr: iprReducer
});

export default rootReducer;
