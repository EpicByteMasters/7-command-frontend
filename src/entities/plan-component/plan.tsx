import styles from './plan.module.scss';
import React, { useState } from 'react';
import { Table } from '@alfalab/core-components/table';
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../shared/hooks/redux';
import { getIpr } from '../../store/reducers/iprsSlice';

interface PlanProps {
	isEmployee?: boolean;
}

export const Plan: React.FC<PlanProps> = ({ isEmployee = true }) => {
	const [activeGoalId, setActiveGoalId] = useState<number | null>(null);
	const iprData = useAppSelector((state) => state.iprs.iprsData);
	const dispatch = useAppDispatch();
	const navigate = useNavigate(); // Changed to useNavigate

	console.log('iprData в tasks: ', iprData);

	const handleRowClick = (id: number) => {
		setActiveGoalId(id);
	};

	const handleOpenButtonClick = async (id: number) => {
		try {
			const iprDataResult = await dispatch(getIpr(id));

			if (getIpr.fulfilled.match(iprDataResult)) {
				console.log('Получили Ипр по id:', iprDataResult.payload);
				navigate(`/service-iprs/${isEmployee ? 'my-ipr' : 'ipr'}/${id}`);
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
	const progressPercentage = `${finishedTasks}/${numberOfTasks}`;

	return (
		<>
			{!isEmployee && (
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
					{iprData.map(({ id, goal, closeDate, createDate, status }) => (
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
								<Status view="soft" color={getStatusColor(status.name)}>
									{status.name}
								</Status>
							</Table.TCell>
							<Table.TCell>
								<Button
									view="tertiary"
									size="s"
									onClick={() => handleOpenButtonClick(id)}
								>
									Открыть
								</Button>
							</Table.TCell>
						</Table.TRow>
					))}
				</Table.TBody>
			</Table>
		</>
	);
};
