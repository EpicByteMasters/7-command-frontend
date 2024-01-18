import NavBar from '../entities/NavBar/navbar';
import { Routing } from '../pages/routing';
import Header from '../components/Header/header';
import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/login';

function App() {
	return (
		<div className={styles.container__main}>
			{/* <Header />
			<div className={styles.container}>
				<NavBar />
				<Routing />
			</div> */}

			<Routes>
				<Route path="/alfa-hackathon-7-frontend" element={<Login />} />
				<Route path="/alfa-hackathon-7-frontend/head" element={<></>} />
				<Route path="/alfa-hackathon-7-frontend/employee" element={<></>} />
				<Route path="/alfa-hackathon-7-frontend/mentor" element={<></>} />
				<Route path="/*" element={<></>} />
			</Routes>
		</div>
	);
}

export default App;
