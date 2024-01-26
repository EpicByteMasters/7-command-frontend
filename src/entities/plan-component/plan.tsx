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
import { tasksData } from '../../shared/utils/constants';

interface PlanProps {
	isEmployee?: boolean;
	ipr_id3?: number;
}

export const Plan: React.FC<PlanProps> = ({ isEmployee = true, ipr_id3 }) => {
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

	const activeTask = tasksData.find(
		(task) => task.statusText === 'черновик' || task.statusText === 'в работе'
	);

	return (
		<>
			{!isEmployee && activeTask === undefined && (
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
						({ id, goal, dateStart, dateEnd, statusColor, statusText }) => {
							let iprLink;
							if (
								statusText === 'выполнен' ||
								statusText === 'не выполнен' ||
								statusText === 'отменен'
							) {
								iprLink = `/service-iprs/my-ipr-rating/${id}`;
							} else {
								iprLink = isEmployee
									? `/service-iprs/my-ipr/${id}`
									: `/service-iprs/ipr/${id}`;
							}
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
										<Link to={iprLink}>
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
