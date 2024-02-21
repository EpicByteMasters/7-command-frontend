import { useEffect, useRef } from 'react';

import { Routing } from '../pages/routing';

import {
  fetchCommonLibs,
  selectCommonLibsPositions,
  selectCommonLibsIPRStatus,
  selectCommonLibsLoading,
  selectCommonLibsError,
  selectCommonLibsTaskStatus,
  selectCommonLibsSpecialty,
  selectCommonLibsIPRCompetency,
  selectCommonLibsEducation
} from '../shared/store/reducers/libSlice';

import { useAppDispatch, useAppSelector } from '../shared/hooks/redux';

import { getUserData } from '../shared/store/reducers/userSlice';

// --------------------------------------------------------------------
import Header from '../shared/header-component/header';
import { FooterMain } from '../shared/footer-main/footer-main';

import styles from './app.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectCommonLibsPositions);
  const iprStatus = useAppSelector(selectCommonLibsIPRStatus);
  const loading = useAppSelector(selectCommonLibsLoading);
  const error = useAppSelector(selectCommonLibsError);
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
        education
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
    education
  ]);
  const isFetching = useRef(false);

  useEffect(() => {
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
        } else {
        }
      } catch (error) {}
    };
    getUser();
  }, [dispatch]);

  //-------------------------------------------------------------------------

  return (
    <div className={styles.container__main}>
      <Header />
      <Routing />
      <FooterMain></FooterMain>
    </div>
  );
}

export default App;
