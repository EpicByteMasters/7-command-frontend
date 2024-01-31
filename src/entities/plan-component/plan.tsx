import styles from './plan.module.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@alfalab/core-components/table';
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Link } from 'react-router-dom';
import { goalsData } from '../../shared/utils/constants';
import { tasksData } from '../../shared/utils/constants';
import { useAppSelector } from '../../shared/hooks/redux';

interface PlanProps {
	isEmployee?: boolean;
	ipr_id?: number;
}

export const Plan: React.FC<PlanProps> = ({ isEmployee = true }) => {
	const [activeGoalId, setActiveGoalId] = useState<number | null>(null);

	const iprData = useAppSelector((state) => state.iprs.iprsData);
	console.log('iprData в tasks: ', iprData);

	const handleClick = (id: number) => {
		setActiveGoalId(id);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'черновик':
				return 'purple';
			case 'отменен':
				return 'orange';
			case 'в работе':
				return 'blue';
			case 'не выполнен':
				return 'red';
			case 'выполнен':
				return 'green';
			case 'отсутствует':
				return 'grey';
			default:
				return 'blue';
		}
	};

	//   // Color map based on status name
	//   const statusColorMap: Record<iiIPRData['status']['name'], 'purple' | 'green' | 'orange' | 'red' | 'blue' | 'grey' | 'teal' | undefined> = {
	//     'Черновик': 'purple',
	//     'В работе': 'green',
	//     'Выполнен': 'orange',
	//     'Не выполнен': 'orange',
	//     'Отменен': 'red',
	//   };

	// кружочки прогресса
	const numberOfTasks = tasksData.length;
	const finishedTasks = tasksData.filter(
		(task) => task.statusText.toLowerCase() === 'выполнен'
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
					{iprData.map(({ id, goal, closeDate, createDate, status }) => {
						console.log('status: ', status);
						console.log('goal: ', goal);

						console.log('iprData после мап: ', iprData);

						let iprLink;
						if (
							status.name === 'Выполнен' ||
							status.name === 'Не выполнен' ||
							status.name === 'Отменен'
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
								<Table.TCell>{goal?.name}</Table.TCell>
								<Table.TCell>{createDate}</Table.TCell>
								<Table.TCell>{closeDate}</Table.TCell>
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
										color={getStatusColor(status.name.toLowerCase())}
									>
										{status.name}
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
					})}
				</Table.TBody>
			</Table>
		</>
	);
};
