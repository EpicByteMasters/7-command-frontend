import styles from './plan.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@alfalab/core-components/table';
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import {
	setActiveGoalId,
	selectActiveGoalId,
} from '../../store/reducers/goalSlice';
import { Link } from 'react-router-dom';
import { goalsData } from '../../shared/utils/constants';

interface PlanProps {
	isEmployee?: boolean;
}

export const Plan: React.FC<PlanProps> = ({ isEmployee = false }) => {
	const tasksData = [
		{
			id: 1,
			title: 'Менторинг новых сотрудников',
			deadline: 'До 30 января',
			statusText: 'не выполнена',
			statusColor: 'red',
			closeButton: false,
		},
		{
			id: 2,
			title: 'Разработка стратегии компании',
			deadline: 'До 20 марта',
			statusText: 'ожидает проверки',
			statusColor: 'purple',
			closeButton: true,
		},
		{
			id: 3,
			title: 'Найм сотрудников',
			deadline: 'До 10 апреля',
			statusText: 'выполнена',
			statusColor: 'green',
			closeButton: false,
		},
		{
			id: 4,
			title: 'Подготовка и выступление на конференции',
			deadline: 'До 1 июня',
			statusText: 'отменена',
			statusColor: 'orange',
			closeButton: true,
		},
	];

	const dispatch = useDispatch();
	const activeGoalId = useSelector(selectActiveGoalId);

	const handleClick = (goalId: number) => {
		dispatch(setActiveGoalId(goalId === activeGoalId ? null : goalId));
	};

	//кружочки прогресса
	const numberOfTasks = tasksData.length;
	const finishedTasks = tasksData.filter(
		(task) => task.statusText.toLowerCase() === 'выполнена'
	).length;
	const progress = (finishedTasks / numberOfTasks) * 100;
	const progressPercentage = `${finishedTasks}/${numberOfTasks}`;

	return (
		<>
			{!isEmployee && activeGoalId === null && (
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
							// progress,
						}) => {
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
										<Status
											view="soft"
											color={
												statusColor as
													| 'green'
													| 'orange'
													| 'red'
													| 'blue'
													| 'grey'
													| 'teal'
													| 'purple'
													| undefined
											}
										>
											{statusText}
										</Status>
									</Table.TCell>
									<Table.TCell>
										<Link to={`/service-iprs/ipr/${id}`}>
											<Button view="tertiary" size="s">
												Открыть
											</Button>
										</Link>
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
