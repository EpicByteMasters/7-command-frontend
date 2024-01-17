import NavBar from '../entities/NavBar/navbar';
import { Routing } from '../pages/routing';
import styles from './app.module.scss';

function App() {
	return (
		<>
			<div className={styles.main}>Hello I'm App</div>
			<Routing />
			<NavBar></NavBar>
		</>
	);
}

export default App;
