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
import { IPREmployee } from '../pages/ipr-employee/ipr-employee';

function App() {
	return (
		<div className={styles.container__main}>
			<Routes>
				<Route path="/" element={<Login users={users} />} />
				<Route path="/main" element={<MainPage></MainPage>} />
				<Route
					path="/service-iprs/myteam"
					element={<LeaderEmployeesList data={testData} />}
				/>
				<Route
					path="/myteam/iprs/ipr/1"
					element={
						<ManagerIprDraft statusColor="purple" statusText="Черновик" />
					}
				/>
				<Route path="/service-iprs/my" element={<MyPlan />} />
				<Route path="/iprs/ipr/:id" element={<IPREmployee />} />
				<Route
					path="/service-iprs/ipr/:id"
					element={
						<ManagerIprDraft statusColor="purple" statusText="Черновик" />
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
