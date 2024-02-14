import styles from './app.module.scss';

import { useAppDispatch, useAppSelector } from '../shared/hooks/redux';
import { useEffect, useRef } from 'react';

import { getUserData } from '../store/reducers/userSlice';

// --------------------------------------------------------------------
import Header from '../shared/header-component/header';
import { FooterMain } from '../shared/footer-main/footer-main';

import {
  fetchCommonLibs,
  selectCommonLibsPositions,
  selectCommonLibsIPRStatus,
  selectCommonLibsLoading,
  selectCommonLibsError,
  selectCommonLibsTaskStatus,
  selectCommonLibsSpecialty,
  selectCommonLibsIPRCompetency,
  selectCommonLibsEducation,
  selectCommonLibsIPRGoals,
} from '../store/reducers/libSlice';

import { Routing } from 'src/pages/routing';

function App() {
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectCommonLibsPositions);
  const iprStatus = useAppSelector(selectCommonLibsIPRStatus);
  const loading = useAppSelector(selectCommonLibsLoading);
  const error = useAppSelector(selectCommonLibsError);
  const iprGoals = useAppSelector(selectCommonLibsIPRGoals);
  const taskStatus = useAppSelector(selectCommonLibsTaskStatus);
  const specialty = useAppSelector(selectCommonLibsSpecialty);
  const iprCompetency = useAppSelector(selectCommonLibsIPRCompetency);
  const education = useAppSelector(selectCommonLibsEducation);

  useEffect(() => {
    if (
      !isFetching.current &&
      !loading &&
      !error &&
      ![
        positions,
        iprStatus,
        taskStatus,
        specialty,
        iprCompetency,
        education,
        iprGoals,
      ].some((lib) => lib.length !== 0)
    ) {
      isFetching.current = true;
      dispatch(fetchCommonLibs())
        .then(() => {
          isFetching.current = false;
        })
        .catch((error) => {
          isFetching.current = false;
          console.error('Error during fetching common libs:', error);
        });
    }
  }, [
    dispatch,
    loading,
    error,
    positions,
    iprStatus,
    taskStatus,
    specialty,
    iprCompetency,
    education,
    iprGoals,
  ]);
  const isFetching = useRef(false);

  useEffect(() => {
    //console.log('useEffect: ', useEffect);
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing in localStorage');
          return;
        }
        // Получаем данные пользователя
        const userDataResult = await dispatch(getUserData());

        if (getUserData.fulfilled.match(userDataResult)) {
          //console.log('Пришел юзер', userDataResult.payload);
        } else {
          //console.error('не пришел юзер:', userDataResult.error);
        }
      } catch (error) {
        // console.error('ошибка с токеном что-то:', error);
      }
    };
    getUser();
  }, [dispatch]);

  return (
    <>
      <div className={styles.container__main}>
        <Header />
        <Routing />
        <FooterMain></FooterMain>
      </div>
    </>
  );
}

export default App;
