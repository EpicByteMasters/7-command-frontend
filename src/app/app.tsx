import NavBar from '../entities/NavBar/navbar';
import { Routing } from '../pages/routing';
import Header from '../components/Header/header';
import styles from './app.module.scss';

function App() {
	return (
		<div className={styles.container__main}>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<Routing />
			</div>
		</div>
	);
}

export default App;
