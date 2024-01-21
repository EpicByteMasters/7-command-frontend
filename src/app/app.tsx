import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login/login';
import { EmployeeRatingPage } from '../pages/employee-rating/employee-rating';
import { MyPlan } from '../pages/my-plan/my-plan';
import { EmployeePlan } from '../pages/employee-plan/employee-plan';
import { MainPage } from '../pages/main-page/main-page';
import { ManagerIprDraft } from '../pages/manager-ipr-draft/manager-ipr-draft';
import { LeaderEmployeesList } from '../pages/leader-employees-list/leader-employees-list';
import users from '../shared/utils/users';
import { testData } from '../shared/utils/test-users';

function App() {
	return (
		<div className={styles.container__main}>
			<Routes>
				<Route path="/" element={<Login users={users} />} />
				<Route path="/head" element={<MainPage></MainPage>} />
				<Route path="/employee" element={<MyPlan />} />
				<Route path="/head-plans" element={<EmployeePlan />} />
				<Route
					path="/head-ipr-draft"
					element={
						<ManagerIprDraft statusColor="purple" statusText="Черновик" />
					}
				/>
				<Route path="/mentor" element={<EmployeeRatingPage />} />
				<Route
					path="/head-employees-list"
					element={<LeaderEmployeesList data={testData} />}
				/>
				<Route path="/*" element={<></>} />
			</Routes>
		</div>
	);
}

export default App;
