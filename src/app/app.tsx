import { Routing } from '../pages/routing';
import Header from '../components/Header/header';
import styles from './app.module.scss';

function App() {
	return (
		<>
			<Header />
			<div className={styles.main}>Hello I'm App</div>
			<Routing />
		</>
	);
}

export default App;
