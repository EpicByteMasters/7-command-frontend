import styles from './plan.module.scss';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../shared/hooks/redux';
import { useNavigate } from 'react-router-dom';

import { Table } from '@alfalab/core-components/table';
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { IprData } from '../../store/reducers/iprsSlice';

import { getIprByIdByEmployee } from '../../store/reducers/iprsSlice';

interface PlanProps {
	// isEmployee?: boolean;
}

export const Plan: React.FC<PlanProps> = ({}) => {
	const userData = useAppSelector((state) => state.user.user);

	const isEmployee = userData.isSupervisor === false;
	const isExecutive = userData.isSupervisor === true;

	const [activeGoalId, setActiveGoalId] = useState<number | null>(null);
	const iprData = useAppSelector((state) => state.iprs.iprsData);
	const dispatch = useAppDispatch();
	const navigate = useNavigate(); // Changed to useNavigate

	console.log('iprData в tasks: ', iprData);

	const handleRowClick = (id: number) => {
		setActiveGoalId(id);
	};

	const handleOpenButtonClick = async (id: number, status: any) => {
		try {
			const iprDataResult = await dispatch(getIprByIdByEmployee(id));

			if (getIprByIdByEmployee.fulfilled.match(iprDataResult)) {
				console.log('Получили Ипр по id:', iprDataResult.payload);

				navigate(
					`/service-iprs/${isEmployee && status.name.toLowerCase() === 'в работе' ? 'my-ipr' : 'my-ipr-rating'}/${id}`
				);
			} else {
				console.error('Error during fetching IPRS data:', iprDataResult.error);
			}
		} catch (error) {
			console.error('Error during fetching user data:', error);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
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

	const numberOfTasks = 10; // Replace with your dynamic data
	const finishedTasks = 5; // Replace with your dynamic data
	const progress = (finishedTasks / numberOfTasks) * 100;

	return (
		<>
			{/* {isExecutive && (
				<Button view="primary" size="s" className={styles.button}>
					Создать новый план развития
				</Button>
			)} */}
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
					{iprData.map(
						({
							id,
							goal,
							closeDate,
							createDate,
							status,
							taskCompleted,
							taskCount,
						}: IprData) => {
							const progressPercentage = `${taskCount}/${taskCompleted}`;
							const progress = (taskCompleted / taskCount) * 100;

							return (
								<Table.TRow
									className={`${styles.row} ${id === activeGoalId ? styles.active : ''}`}
									onClick={() => handleRowClick(id)}
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
										<div className={styles.tCell}>
											<Status view="soft" color={getStatusColor(status.name)}>
												{status.name}
											</Status>
										</div>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tBtn}>
											<Button
												view="tertiary"
												size="xxs"
												onClick={() => handleOpenButtonClick(id, status)}
											>
												Открыть
											</Button>
										</div>
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
