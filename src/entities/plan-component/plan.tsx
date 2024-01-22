import styles from './plan.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@alfalab/core-components/table';
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { setActiveGoalId, selectActiveGoalId } from '../../reducers/goalSlice';

interface PlanProps {
	id: number;
	goal: string;
	dateStart: string;
	dateEnd: string;
	progress: number;
	statusText: string;
	statusColor: 'green' | 'orange' | 'red' | 'blue';
	activeGoalId?: number;
	setActiveGoalId?: (goalId: number) => void;
}

export const Plan: React.FC = () => {
	const goalsData: PlanProps[] = [
		{
			id: 1,
			goal: 'Карьерный рост',
			dateStart: '15.01.2024',
			dateEnd: '25.12.2024',
			progress: 0,
			statusText: 'в работе',
			statusColor: 'blue',
		},
		{
			id: 2,
			goal: 'Повышение грейда',
			dateStart: '20.01.2023',
			dateEnd: '20.01.2023',
			progress: 40,
			statusText: 'отменен',
			statusColor: 'orange',
		},
		{
			id: 3,
			goal: 'Получение нового опыта',
			dateStart: '16.01.2022',
			dateEnd: '25.12.2022',
			progress: 40,
			statusText: 'не выполнен',
			statusColor: 'red',
		},
		{
			id: 4,
			goal: 'Смена команды',
			dateStart: '12.01.2021',
			dateEnd: '25.12.2021',
			progress: 90,
			statusText: 'выполнен',
			statusColor: 'green',
		},
		{
			id: 5,
			goal: 'Соответствие занимаемой должности',
			dateStart: '23.01.2020',
			dateEnd: '25.12.2020',
			progress: 100,
			statusText: 'выполнен',
			statusColor: 'green',
		},
	];
	const dispatch = useDispatch();
	const activeGoalId = useSelector(selectActiveGoalId);

	const handleClick = (goalId: number) => {
		dispatch(setActiveGoalId(goalId === activeGoalId ? null : goalId));
	};

	return (
		<>
			{activeGoalId === null && (
				<Button view="primary" size="m" className={styles.button}>
					Создать новый план развития
				</Button>
			)}
			<Table className={styles.table} wrapper={false}>
				<Table.THead>
					<Table.THeadCell title="Цель">Цель</Table.THeadCell>
					<Table.THeadCell title="Начало">Начало</Table.THeadCell>
					<Table.THeadCell title="Завершение">Завершение</Table.THeadCell>
					<Table.THeadCell title="Прогресс">Прогресс</Table.THeadCell>
					<Table.THeadCell title="Статус">Статус</Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
				</Table.THead>
				<Table.TBody>
					{goalsData.map(
						({
							id,
							goal,
							dateStart,
							dateEnd,
							statusColor,
							statusText,
							progress,
						}) => {
							const progressPercentage = `${progress}%`;

							return (
								<Table.TRow
									className={`${styles.row} ${id === activeGoalId ? styles.active : ''}`}
									onClick={() => handleClick(id)}
									key={id}
								>
									<Table.TCell>{goal}</Table.TCell>
									<Table.TCell>{dateStart}</Table.TCell>
									<Table.TCell>{dateEnd}</Table.TCell>
									<Table.TCell>
										<CircularProgressBar
											value={progress}
											title={progressPercentage}
											size="s"
											contentColor="primary"
											className={styles.progressBar}
										/>
									</Table.TCell>
									<Table.TCell>
										<Status view="soft" color={statusColor}>
											{statusText}
										</Status>
									</Table.TCell>
									<Table.TCell>
										<Button view="tertiary" size="s">
											Открыть
										</Button>
									</Table.TCell>
								</Table.TRow>
							);
						}
					)}
				</Table.TBody>
			</Table>
		</>
	);
};
