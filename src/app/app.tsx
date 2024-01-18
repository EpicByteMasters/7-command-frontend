import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/login';
import { EmployeeRatingPage } from '../pages/employee-rating/employee-rating';

function App() {
	return (
		<div className={styles.container__main}>
			<Routes>
				<Route path="/alfa-hackathon-7-frontend" element={<Login />} />
				<Route path="/alfa-hackathon-7-frontend/head" element={<></>} />
				<Route path="/alfa-hackathon-7-frontend/employee" element={<></>} />
				<Route
					path="/alfa-hackathon-7-frontend/mentor"
					element={<EmployeeRatingPage />}
				/>
				<Route path="/*" element={<></>} />
			</Routes>
		</div>
	);
}

export default App;
