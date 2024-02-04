import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux';
import { useEffect, useRef } from 'react';
import { getUserData } from '../store/reducers/userSlice';

// components
import { Login } from '../pages/login/login';
import { EmployeePlan } from '../pages/employee-plan/employee-plan';
import { MainPage } from '../pages/main-page/main-page';
import { LeaderEmployeesList } from '../pages/leader-employees-list/leader-employees-list';
import { MentorPlan } from '../pages/mentor-plan/mentor-plan';
import { NotificationCard } from '../entities/notification-green/notification';
import { Page404 } from '../pages/page404/page404';
import Header from '../shared/header-component/header';
import { OpendIpr } from '../pages/opend-ipr/opend-ipr';
import { FooterMain } from '../shared/footer-main/footer-main';

// data
import users from '../shared/utils/users';
import { roleUrl, accessUrl } from '../shared/utils/urls';

import {
  fetchCommonLibs,
  selectCommonLibsPositions,
  selectCommonLibsIPRStatus,
  selectCommonLibsLoading,
  selectCommonLibsError,
  // selectCommonLibsIPRGoals,
  selectCommonLibsTaskStatus,
  selectCommonLibsSpecialty,
  selectCommonLibsIPRCompetency,
  selectCommonLibsEducation,
} from '../store/reducers/libSlice';
import { MyPlan } from '../pages/my-plan/my-plan';

function App() {
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectCommonLibsPositions);
  const iprStatus = useAppSelector(selectCommonLibsIPRStatus);
  const loading = useAppSelector(selectCommonLibsLoading);
  const error = useAppSelector(selectCommonLibsError);
  // const iprGoals = useAppSelector(selectCommonLibsIPRGoals);
  const taskStatus = useAppSelector(selectCommonLibsTaskStatus);
  const specialty = useAppSelector(selectCommonLibsSpecialty);
  const iprCompetency = useAppSelector(selectCommonLibsIPRCompetency);
  const education = useAppSelector(selectCommonLibsEducation);

  useEffect(() => {
    if (
      !isFetching.current &&
      !loading &&
      !error &&
      ![positions, iprStatus, taskStatus, specialty, iprCompetency, education].some((lib) => lib.length !== 0)
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
  }, [dispatch, loading, error, positions, iprStatus, taskStatus, specialty, iprCompetency, education]);
  const isFetching = useRef(false);

  useEffect(() => {
    console.log('useEffect: ', useEffect);
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
          console.log('Пришел юзер', userDataResult.payload);
        } else {
          console.error('не пришел юзер:', userDataResult.error);
        }
      } catch (error) {
        console.error('ошибка с токеном что-то:', error);
      }
    };
    getUser(); // Вызываем getUser при монтировании компонента
  }, [dispatch]);

  // const userData = useAppSelector((state) => state.user.user);

  //Загрузка библиотек useRef для отслеживания состояния выполнения запроса и предотвращения отправки дополнительных запросов, пока предыдущий еще не завершен

  //Вывод в консоль данных библиотек
  // console.log('Библиотека Positions:', positions);
  // console.log('Библиотека IPR Status:', iprStatus);
  // console.log('Библиотека IPR Goals:', iprGoals);
  console.log('Библиотека Task status:', taskStatus);
  // console.log('Библиотека specialty:', specialty);
  // console.log('Библиотека iprCompetency:', iprCompetency);
  // console.log('Библиотека Task education:', education);

  return (
    <>
      <div className={styles.container__main}>
        <Header />
        <Routes>
          <Route path={accessUrl[2].url} element={<Login users={users} />} />
          <Route path="/main" element={<MainPage></MainPage>} />
          <Route path={roleUrl[0].url} element={<LeaderEmployeesList />} />
          <Route path="/service-iprs/mentor" element={<MentorPlan />} />
          <Route path={roleUrl[1].url} element={<MyPlan />} />
          <Route path="/service-iprs/ipr/:id" element={<OpendIpr />} />
          <Route path="/service-iprs/myteam/history/:id" element={<EmployeePlan />} />
          <Route
            path="/404"
            element={
              <Page404
                error={'Ошибка'}
                title={'404'}
                paragraph={'Что-то пошло не так'}
                button={'Вернуться на главную'}
              ></Page404>
            }
          />

          <Route
            path="/505"
            element={
              <Page404
                error={'Ошибка2'}
                title={'505'}
                paragraph={'Сервер недоступен'}
                button={'Вернуться на главную'}
              ></Page404>
            }
          />
          <Route
            path="/207"
            element={
              <Page404
                error={'Ошибка2'}
                title={'207'}
                paragraph={'Вы не авторизованы'}
                button={'Авторизоваться'}
              ></Page404>
            }
          />
          <Route
            path="/*"
            element={
              <Page404
                error={'Ошибка'}
                title={'404'}
                paragraph={'Что-то пошло не так'}
                button={'Вернуться на главную'}
              ></Page404>
            }
          />
          <Route
            path={'/notification1'}
            element={
              <NotificationCard
                error={true}
                title={'Сохранено'}
                paragraph={'План развития добавлен в общий список как черновик'}
              />
              // <NotificationCard title={'Отправлено в работу'} paragraph={'План развития отправлен сотруднику для исполнения'} />
            }
          ></Route>
        </Routes>
      </div>
      <FooterMain></FooterMain>
    </>
  );
}

export default App;
