import styles from './plan.module.scss';
import { Parameters } from '../parameters-component/parameters';
import { Goal } from '../goal-component/goal';

export const Plan = () => {
	return (
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
	);
};
