import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login/login';
import { EmployeeRatingPage } from '../pages/employee-rating/employee-rating';
import { MyPlan } from '../pages/my-plan/my-plan';
import { EmployeePlan } from '../pages/employee-plan/employee-plan';
import users from '../shared/utils/users';
import { LeaderEmployeesList } from '../pages/leader-employees-list/leader-employees-list';
import { testData } from '../shared/utils/test-users';
import { LeaderTasks } from '../pages/leader-tasks/leader-tasks';

function App() {
	return (
		<div className={styles.container__main}>
			<Routes>
				<Route path="/7-command-frontend" element={<Login users={users} />} />
				<Route
					path="/7-command-frontend/head"
					element={<LeaderTasks></LeaderTasks>}
				/>
				<Route path="/7-command-frontend/employee" element={<MyPlan />} />
				<Route
					path="/7-command-frontend/head-plans"
					element={<EmployeePlan />}
				/>
				<Route
					path="/7-command-frontend/mentor"
					element={<EmployeeRatingPage />}
				/>
				<Route
					path="/7-command-frontend/head-employees-list"
					element={<LeaderEmployeesList data={testData} />}
				/>
				<Route path="/*" element={<></>} />
			</Routes>
		</div>
	);
}

export default App;
