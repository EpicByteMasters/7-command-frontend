import React, { useState, useRef } from 'react';
import styles from './mentor-list.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Status } from '@alfalab/core-components/status';
import { Typography } from '@alfalab/core-components/typography';
import { Table } from '@alfalab/core-components/table';
import { EmployeeGoalPlan } from '../../shared/utils/test-users';
import { Mentor } from '../../store/reducers/mentorIprSlice';
import { Space } from '@alfalab/core-components/space';
import { useAppSelector } from '../../shared/hooks/redux';
import {
	selectCommonLibsIPRGoals,
	selectCommonLibsIPRStatus,
	selectCommonLibsPositions,
} from '../../store/reducers/libSlice';

//import avatar from '../../images/avatars/avatar_mentor1.png';

import {
	formatDateString,
	getStatusColor,
	getValueById,
} from '../../shared/utils/constants';

export interface MentorListProps {
	data: Mentor[] | undefined;
}

export const MentorList: React.FC<MentorListProps> = ({ data }) => {
	//console.log('MENTOR - DATA', data);
	const navigate = useNavigate();
	const location = useLocation();

	const positionsLib = useAppSelector(selectCommonLibsPositions);
	const iprGoalsLib = useAppSelector(selectCommonLibsIPRGoals);
	const iprStatusLib = useAppSelector(selectCommonLibsIPRStatus);

	const handleOpenButtonClick = (id: number) => {
		try {
			navigate(`/test/${id}`, { state: { location } });
		} catch (error) {
			console.error('Error during navigating:', error);
		}
	};

	return (
		<>
			<Table className={styles.table} wrapper={false}>
				<Table.THead>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Сотрудник</span>
						</div>
					</Table.THeadCell>
					<Table.THeadCell>Цель</Table.THeadCell>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Дата</span>
						</div>
					</Table.THeadCell>
					<Table.THeadCell>Прогресс</Table.THeadCell>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Статус</span>
						</div>
					</Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
				</Table.THead>
				<Table.TBody>
					{data?.map(
						({
							dateOfEnd,
							firstName,
							goalId,
							id,
							imageUrl,
							lastName,
							middleName,
							position_id,
							progress,
							specialty_id,
							statusId,
							taskCompleted,
							taskCount,
						}) => {
							const color = getStatusColor(statusId);
							const persent = (taskCompleted / taskCount) * 100;
							const [day, month, year] = dateOfEnd.split('-');
							const formatedDate = `${day}.${month}.${year}`;

							return (
								<Table.TRow key={id}>
									<Table.TCell>
										<Space size={2} align={'start'}>
											<div
												className={styles.tCell}
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
												}}
											>
												<img
													src={imageUrl}
													style={{
														width: '40px',
														height: '40px',
													}}
													alt="аватар"
												></img>
												<div style={{ marginLeft: '8px', width: '250px' }}>
													<Typography.Text view="primary-small" tag="div">
														{`${lastName} ${firstName} ${middleName}`}
													</Typography.Text>
													<Typography.Text
														view="primary-small"
														color="secondary"
													>
														{getValueById(position_id, positionsLib)}
													</Typography.Text>
												</div>
											</div>
										</Space>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tCell}>
											{getValueById(goalId, iprGoalsLib)}
										</div>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tCell}>{formatedDate}</div>
									</Table.TCell>
									<Table.TCell>
										<CircularProgressBar
											value={persent}
											title={`${taskCompleted}/${taskCount}`}
											size="s"
											contentColor="primary"
											className={styles.progressBar}
										/>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tCell}>
											<Status view="soft" color={color}>
												{getValueById(statusId, iprStatusLib)}
											</Status>
										</div>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tBtn}>
											<Button
												view="tertiary"
												size="xxs"
												onClick={() => handleOpenButtonClick(id)}
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
