import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux';
import { useEffect, useRef } from 'react';

// components
import { Login } from '../pages/login/login';
import { EmployeeRatingPage } from '../pages/employee-rating/employee-rating';
import { EmployeePlan } from '../pages/employee-plan/employee-plan';
import { MainPage } from '../pages/main-page/main-page';
import { LeaderEmployeesList } from '../pages/leader-employees-list/leader-employees-list';
import { IPREmployee } from '../pages/ipr-employee/ipr-employee';
import { MyIpr } from '../pages/my-ipr/my-ipr';
import { MyIprRating } from '../pages/my-ipr-rating/my-ipr-rating';
import { MentorPlan } from '../pages/mentor-plan/mentor-plan';
import { NotificationCard } from '../entities/notification-green/notification';
import { Page404 } from '../pages/page404/page404';
import Header from '../shared/header-component/header';
import { OpendIpr } from '../pages/opend-ipr/opend-ipr';

// data
import users from '../shared/utils/users';
import { roleUrl, accessUrl } from '../shared/utils/urls';

import {
	fetchCommonLibs,
	selectCommonLibsPositions,
	selectCommonLibsIPRStatus,
	selectCommonLibsLoading,
	selectCommonLibsError,
	selectCommonLibsIPRGoals,
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
	const iprGoals = useAppSelector(selectCommonLibsIPRGoals);
	const taskStatus = useAppSelector(selectCommonLibsTaskStatus);
	const specialty = useAppSelector(selectCommonLibsSpecialty);
	const iprCompetency = useAppSelector(selectCommonLibsIPRCompetency);
	const education = useAppSelector(selectCommonLibsEducation);

	// const ipr_id: number = 1; // сценарий руководителя с ИПР в работе
	// const ipr_id2: number = 2; // сценарий руководителя с ИПР черновик
	const ipr_id3: number = 3; // сценарий сотрудника с ИПР
	// const ipr_id4: number = 4; // сценарий сотрудника с ИПР

	const userData = useAppSelector((state) => state.user.user);

	const isFetching = useRef(false);

	//Загрузка библиотек useRef для отслеживания состояния выполнения запроса и предотвращения отправки дополнительных запросов, пока предыдущий еще не завершен
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
	]);

	// Вывод в консоль данных библиотек
	// console.log('Библиотека Positions:', positions);
	// console.log('Библиотека IPR Status:', iprStatus);
	// console.log('Библиотека IPR Goals:', iprGoals);
	// console.log('Библиотека Task status:', taskStatus);
	// console.log('Библиотека specialty:', specialty);
	// console.log('Библиотека iprCompetency:', iprCompetency);
	// console.log('Библиотека Task education:', education);

	return (
		<div className={styles.container__main}>
			<Header />
			<Routes>
				<Route path={accessUrl[2].url} element={<Login users={users} />} />
				<Route path="/main" element={<MainPage></MainPage>} />
				<Route path={roleUrl[1].url} element={<MyPlan />} />
				<Route path={roleUrl[0].url} element={<LeaderEmployeesList />} />
				<Route path="/service-iprs/mentor" element={<MentorPlan />} />
				<Route path="/test/:id" element={<OpendIpr />} />

				{/* Роуты сценариев */}

				{/* Сценарий 1 план развития сотрудника - в работе */}

				{/* <Route
					path="/service-iprs/ipr/0"
					element={
						<ManagerIprDraft
							ipr_id={0}
							isExecutive={true}
							statusColor="blue"
							statusText="в работе"
						/>
					}
				/>
				{/* Сценарий 2 Создать черновик - заполненная форма*/}
				{/* <Route
					path="/service-iprs/ipr/2"
					element={
						<ManagerIprDraft
							ipr_id={2}
							isExecutive={true}
							statusColor="purple"
							statusText="черновик"
						/>
					}
				/> */}

				{/* Сценарий 3 - Сотрудник - ИПР в работе */}

				{/* <Route
					path="/service-iprs/ipr/3"
					element={
						<ManagerIprDraft
							ipr_id={1}
							isExecutive={false}
							statusColor="blue"
							statusText="в работе"
						/>
					}
				/> */}

				<Route
					path="/service-iprs/my-ipr-rating/:id"
					element={<MyIprRating />}
				/>
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

				{/* Футер - старые роуты */}

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
				<Route path="/service-iprs/my-ipr/:id" element={<MyIpr />} />
				<Route path="/service-iprs/ipr/:id" element={<IPREmployee />} />

				<Route
					path="/service-iprs/myteam/history/:id"
					element={<EmployeePlan />}
				/>
				<Route
					path="/iprs/rating"
					element={<EmployeeRatingPage isExecutive={true} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
