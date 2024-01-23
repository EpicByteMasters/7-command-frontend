import React, { useState } from 'react';

import styles from './employees-list.module.scss';

import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { Table } from '@alfalab/core-components/table';
import { ListDefaultSIcon } from '@alfalab/icons-glyph/ListDefaultSIcon';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Status } from '@alfalab/core-components/status';

export interface EmployeeGoalPlan {
	id: number;
	name: string;
	position: string;
	goal: string;
	date: string;
	progress: number;
	status: string;
}

export interface IEmployeesListProps {
	data: EmployeeGoalPlan[];
}

export const EmployeesList: React.FC<IEmployeesListProps> = ({ data }) => {
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const [page, setPage] = useState<number>(0);

	const handleSort = (column: string) => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortOrder('asc');
		}
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
				return 'blue'; // Цвет по умолчанию, если статус не соответствует ни одному из ожидаемых
		}
	};

	type TStatusType =
		| 'черновик'
		| 'в работе'
		| 'выполнен'
		| 'не выполнен'
		| 'отменен'
		| 'отсутствует';

	const getStatusSortOrder = (status: TStatusType): string => {
		const order = {
			черновик: '0',
			'в работе': '1',
			выполнен: '2',
			'не выполнен': '3',
			отменен: '4',
			отсутствует: '5',
		};

		return order[status] || '6';
	};

	const sortedData = [...data].sort((a, b) => {
		if (sortColumn === 'name') {
			return sortOrder === 'asc'
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name);
		} else if (sortColumn === 'date') {
			const getDateValue = (dateString: string) => {
				const [day, month, year] = dateString.split('.');
				return new Date(`${year}-${month}-${day}`).getTime();
			};

			const dateA = getDateValue(a.date);
			const dateB = getDateValue(b.date);

			if (dateA === dateB) {
				return 0;
			}

			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
		} else if (sortColumn === 'status') {
			const statusA = a.status as TStatusType;
			const statusB = b.status as TStatusType;

			const statusOrderA = getStatusSortOrder(statusA);
			const statusOrderB = getStatusSortOrder(statusB);

			return sortOrder === 'asc'
				? statusOrderA.localeCompare(statusOrderB)
				: statusOrderB.localeCompare(statusOrderA);
		}

		return 0;
	});

	//пагинация
	const perPage = 10; // Фиксированное количество строк на странице
	const handlePerPageChange = (value: number) => {
		// Ничего не делаем, так как мы не разрешаем пользователю выбирать количество строк
	};

	const handlePageChange = (pageIndex: number) => setPage(pageIndex);
	const pagesCount = Math.ceil(sortedData.length / perPage);
	const currentPageData = sortedData.slice(
		page * perPage,
		(page + 1) * perPage
	);

	return (
		<>
			<Table
				className={styles.table}
				wrapper={false}
				pagination={
					<Table.Pagination
						perPage={perPage}
						currentPageIndex={page}
						pagesCount={pagesCount}
						onPageChange={handlePageChange}
						hidePerPageSelect={true}
					/>
				}
			>
				<Table.THead>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Сотрудник</span>
							<ListDefaultSIcon
								className={styles.sortIcon}
								onClick={() => handleSort('name')}
							/>
						</div>
					</Table.THeadCell>
					<Table.THeadCell>Цель</Table.THeadCell>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Дата</span>
							<ListDefaultSIcon
								className={styles.sortIcon}
								onClick={() => handleSort('date')}
							/>
						</div>
					</Table.THeadCell>
					<Table.THeadCell>Прогресс</Table.THeadCell>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Статус</span>
							<ListDefaultSIcon
								className={styles.sortIcon}
								onClick={() => handleSort('status')}
							/>
						</div>
					</Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
				</Table.THead>
				<Table.TBody>
					{currentPageData.map(
						({ id, name, position, goal, date, progress, status }) => {
							const progressPercentage = `${progress}%`;
							const color = getStatusColor(status);

							return (
								<Table.TRow key={id}>
									<Table.TCell>
										<Space size={2} align={'start'}>
											<Typography.Text view="primary-small" tag="div">
												{name}
											</Typography.Text>
											<Typography.Text view="primary-small" color="secondary">
												{position}
											</Typography.Text>
										</Space>
									</Table.TCell>
									<Table.TCell>{goal}</Table.TCell>
									<Table.TCell>{date}</Table.TCell>
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
										<Status view="soft" color={color}>
											{status}
										</Status>
									</Table.TCell>
									<Table.TCell>
										<Button view="tertiary" size="s">
											Открыть
										</Button>
									</Table.TCell>
									<Table.TCell>
										<MoreMIcon />
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
