import styles from './app.module.scss';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as api from '../shared/utils/api';
import { setUser } from '../store/reducers/userSlice'; // Укажите путь соответственно
import { Login } from '../pages/login/login';
import { EmployeeRatingPage } from '../pages/employee-rating/employee-rating';
import { MyPlan } from '../pages/my-plan/my-plan';
import { EmployeePlan } from '../pages/employee-plan/employee-plan';
import { MainPage } from '../pages/main-page/main-page';
import { ManagerIprDraft } from '../pages/manager-ipr-draft/manager-ipr-draft';
import { LeaderEmployeesList } from '../pages/leader-employees-list/leader-employees-list';

import users from '../shared/utils/users';
import { testData } from '../shared/utils/test-users';
import { IPREmployee } from '../pages/ipr-employee/ipr-employee';

import { roleUrl } from '../shared/utils/urls';

function App() {
	const dispatch = useDispatch();
	const ipr_id: number = 1;

	useEffect(() => {
		// Получение данных о пользователе с сервера
		const userId = 1; // Замените на фактический идентификатор пользователя или получите его динамически
		api
			.getUserData(userId)
			.then((userDataArray) => {
				if (userDataArray.length > 0) {
					const userData = userDataArray[0];
					// Диспатч экшена setUser с полученными данными о пользователе
					dispatch(setUser({ user: userData }));
				} else {
					console.error('Пустой массив данных о пользователе');
				}
			})
			.catch((error) => {
				console.error('Ошибка при получении данных о пользователе:', error);
			});
	}, [dispatch]); // Эффект запустится только при монтировании компонента

	return (
		<div className={styles.container__main}>
			<Routes>
				<Route path="/" element={<Login users={users} />} />
				<Route
					path="/main"
					element={<MainPage isExecutive={true} isEmployee={false}></MainPage>}
				/>
				<Route
					path="/service-iprs/myteam"
					element={
						<LeaderEmployeesList
							isExecutive={true}
							data={testData}
							ipr_id={ipr_id}
						/>
					}
				/>
				{/* <Route
					path="/service-iprs/myteam"
					element={<LeaderEmployeesList data={testData} />}
				/> */}
				{/* <Route
					path="/service-iprs/my"
					element={<MyIpr statusText="Черновик" statusColor="purple"></MyIpr>}
				/> */}
				<Route path={roleUrl[1].url} element={<MyPlan isEmployee={true} />} />

				<Route path="/service-iprs/mentor" element={<></>} />

				{/* Футер - старые роуты */}

				<Route path={roleUrl[1].url} element={<MyPlan isEmployee={true} />} />
				<Route path="/iprs/ipr/:id" element={<IPREmployee />} />
				<Route
					path="/service-iprs/ipr/:id"
					element={
						<ManagerIprDraft
							ipr_id={1}
							isExecutive={true}
							statusColor="green"
							statusText="в работе"
						/>
					}
				/>
				<Route path="/service-iprs/myteam/history" element={<EmployeePlan />} />
				<Route path="/iprs/rating" element={<EmployeeRatingPage />} />
				<Route path="/*" element={<></>} />
			</Routes>
		</div>
	);
}

export default App;
