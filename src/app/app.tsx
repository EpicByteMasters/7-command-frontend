import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login/login';
import { EmployeeRatingPage } from '../pages/employee-rating/employee-rating';
import { MyPlan } from '../pages/my-plan/my-plan';
import { EmployeePlan } from '../pages/employee-plan/employee-plan';
import { LeaderEmployeesList } from '../pages/leader-employees-list/leader-employees-list';
import users from '../shared/utils/users';
import { testData } from '../shared/utils/test-users';
import { ManagerIprDraft } from '../pages/manager-ipr-draft/manager-ipr-draft';

function App() {
	return (
		<div className={styles.container__main}>
			<Routes>
				<Route path="/7-command-frontend" element={<Login users={users} />} />
				<Route
					path="/7-command-frontend/head"
					element={
						<ManagerIprDraft
							statusColor="purple"
							statusText="Черновик"
						></ManagerIprDraft>
					}
				/>
				<Route path="/7-command-frontend/employee" element={<MyPlan />} />
				<Route
					path="/7-command-frontend/head-plans"
					element={<EmployeePlan />}
				/>
				<Route path="/7-command-frontend/head-ipr-draft" element={<></>} />
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
