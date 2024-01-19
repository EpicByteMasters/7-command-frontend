import styles from './myPlan.module.scss';
import Header from '../../components/Header/header';
import BackButton from '../../entities/backbutton/backbutton';
import { Goal } from '../../entities/Goal/goal';
import { Parameters } from '../../entities/Parameters/parameters';

export const MyPlan = () => {
	return (
		<>
			<Header />
			<section className={styles.myPlan}>
				<div className={styles.container}>
					<BackButton />
				</div>
				<div className={styles.wrapper}>
					<h1 className={styles.title}>Мой план развития</h1>
					<div className={styles.container}>
						<Parameters />
						<Goal
							goal="Карьерный рост"
							dateStart="15.01.2024"
							dateEnd="25.12.2024"
							progress={0}
							statusText="в работе"
							statusColor="blue"
							active={true}
						/>
						<Goal
							goal="Повышение грейда"
							dateStart="20.01.2023"
							dateEnd="20.01.2023"
							progress={40}
							statusText="отменен"
							statusColor="orange"
						/>
						<Goal
							goal="Получение нового опыта"
							dateStart="16.01.2022"
							dateEnd="25.12.2022"
							progress={40}
							statusText="не выполнен"
							statusColor="red"
						/>
						<Goal
							goal="Смена команды"
							dateStart="12.01.2021"
							dateEnd="25.12.2021"
							progress={90}
							statusText="выполнен"
							statusColor="green"
						/>
						<Goal
							goal="Соответствие занимаемой должности"
							dateStart="23.01.2020"
							dateEnd="25.12.2020"
							progress={100}
							statusText="выполнен"
							statusColor="green"
						/>
					</div>
				</div>
			</section>
		</>
	);
};
