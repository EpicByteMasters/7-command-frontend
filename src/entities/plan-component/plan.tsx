import styles from './plan.module.scss';

import React, { useState } from 'react';
import { useAppSelector } from '../../shared/hooks/redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Table } from '@alfalab/core-components/table';
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { IprData } from '../../store/reducers/iprsSlice';

export const Plan: React.FC = () => {
	const userData = useAppSelector((state) => state.user.user);
	const location = useLocation();

	const [activeGoalId, setActiveGoalId] = useState<number | null>(null);
	const iprData = useAppSelector((state) => state.iprs.iprsData);
	console.log('iprData:', iprData);
	const navigate = useNavigate(); // Changed to useNavigate

	console.log('iprData в tasks: ', iprData);

	const handleRowClick = (id: number) => {
		setActiveGoalId(id);
	};

	const handleOpenButtonClick = (idIpr: number, selectedUserId: number) => {
		console.log('ID ИПР переданное из строчки таблицы', idIpr);
		console.log(
			'ID пользователя переданное из строчки таблицы',
			selectedUserId
		);
		try {
			navigate(`/test/${idIpr}`, { state: { location, selectedUserId } });
		} catch (error) {
			console.error('Error during navigating:', error);
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

	const formatDateRevert = (inputDate: string): string => {
		const [year, month, day] = inputDate.split('-');
		const formattedDate = `${day}.${month}.${year}`;
		return formattedDate;
	};

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
							console.log('taskCount:', taskCount);
							const progressTitle = `${taskCompleted}/${taskCount}`;
							const progressValue = (taskCompleted / taskCount) * 100;

							return (
								<Table.TRow
									className={`${styles.row} ${id === activeGoalId ? styles.active : ''}`}
									onClick={() => handleRowClick(id)}
									key={id}
								>
									<Table.TCell>{goal?.name}</Table.TCell>
									<Table.TCell>{formatDateRevert(createDate)}</Table.TCell>
									<Table.TCell>{formatDateRevert(closeDate)}</Table.TCell>
									<Table.TCell>
										<CircularProgressBar
											value={progressValue || 0}
											title={progressTitle || ''}
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
												onClick={() => handleOpenButtonClick(id, userData.id)}
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
