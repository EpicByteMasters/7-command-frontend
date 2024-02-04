import styles from './plan.module.scss';

import React, { useState } from 'react';
import { useAppSelector } from '../../shared/hooks/redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Table } from '@alfalab/core-components/table';
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { IIprData } from '../../store/reducers/iprSlice';
import { IIpr } from '../../store/reducers/iprsSlice';

export const Plan: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const userData = useAppSelector((state) => state.user.user);

	const iprsArrData = useAppSelector((state) => state.iprs.iprsData);
	console.log('iprData:', iprsArrData);

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
					{iprsArrData.map(
						({
							id,
							goal,
							closeDate,
							createDate,
							status,
							taskCompleted,
							taskCount,
						}: IIpr) => {
							console.log('taskCount:', taskCount);
							const progressTitle = `${taskCompleted}/${taskCount}`;
							const progressValue = (taskCompleted / taskCount) * 100;

							return (
								<Table.TRow
									className={`${styles.row} ${status.id === 'IN_PROGRESS' ? styles.active : ''}`}
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
