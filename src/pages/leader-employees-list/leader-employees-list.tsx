import Header from '../../components/Header/header';
import NavBar from '../../entities/navbar/navbar';

import styles from './leader-employees-list.module.scss';

import { InputDesktop } from '@alfalab/core-components/input/desktop';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';

import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';
import { ListDefaultSIcon } from '@alfalab/icons-glyph/ListDefaultSIcon';
import { LeadInfoBlock } from '../../entities/lead-info-block/lead-info-block';
import { PageTitle } from '../../shared/page-title/page-title';
import { useState } from 'react';

interface EmployeeGoalPlan {
	name: string;
	goal: string;
	date: string;
	progress: number;
	status: string;
}

interface TableColumn {
	label: string;
	key: keyof EmployeeGoalPlan;
}

interface TableProps {
	data: EmployeeGoalPlan[];
}

const structureData = {
	title: 'Вся структура',
	items: [
		{ subtitle: 'Штатная численность', number: 30 },
		{ subtitle: 'Сотрудники', number: 25 },
		{ subtitle: 'Вакансии', number: 5 },
	],
};

const successData = {
	title: 'Успешность планов развития',
	items: [
		{ subtitle: 'Создано', number: 30 },
		{ subtitle: 'Закрыто', number: 25 },
		{ subtitle: 'В работе', number: 5 },
	],
};

const sortData = (
	data: EmployeeGoalPlan[],
	sortBy: keyof EmployeeGoalPlan,
	sortOrder: 'asc' | 'desc'
) => {
	return [...data].sort((a, b) => {
		if (sortBy === 'date') {
			const dateA = new Date(a[sortBy]).getTime();
			const dateB = new Date(b[sortBy]).getTime();
			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
		} else {
			return sortOrder === 'asc'
				? a[sortBy] > b[sortBy]
					? 1
					: -1
				: a[sortBy] < b[sortBy]
					? 1
					: -1;
		}
	});
};

export const LeaderEmployeesList: React.FC<TableProps> = ({ data }) => {
	const contentLabel1 = <span>Цель</span>;
	const contentLabel2 = <span>Статус</span>;

	const [sortedData, setSortedData] = useState(data);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const columns: TableColumn[] = [
		{ label: 'Сотрудник', key: 'name' },
		{ label: 'Цель', key: 'goal' },
		{ label: 'Дата', key: 'date' },
		{ label: 'Прогресс', key: 'progress' },
		{ label: 'Статус', key: 'status' },
	];

	const getStatusColorClass = (status: string): string => {
		switch (status) {
			case 'черновик':
				return styles.cellStatusDraft;
			case 'отменен':
				return styles.cellStatusCanceled;
			case 'в работе':
				return styles.cellStatusInProgress;
			case 'не выполнен':
				return styles.cellStatusNotDone;
			case 'выполнен':
				return styles.cellStatusDone;
			default:
				return '';
		}
	};

	const handleSort = (sortBy: keyof EmployeeGoalPlan) => {
		console.log('sorting');

		const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		setSortOrder(newSortOrder);

		const sorted = sortData(sortedData, sortBy, newSortOrder);
		setSortedData(sorted);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<div className={styles.wrapper}>
					<PageTitle title="План развития"></PageTitle>
					<div className={styles.dataWrapper}>
						<LeadInfoBlock data={structureData} />
						<LeadInfoBlock data={successData} />
					</div>
					<div className={styles.searchInputWrapper}>
						<InputDesktop />
					</div>
					<div className={styles.filterTagsWrapper}>
						<FilterTag view="filled">{contentLabel1}</FilterTag>
						<FilterTag view="filled">{contentLabel2}</FilterTag>
					</div>
					<div className={styles.tableWrapper}>
						<div className={styles.tableHeader}>
							{columns.map((column) => (
								<div key={column.key} className={styles.tableHeaderCell}>
									<span
										onClick={() => handleSort(column.key)}
										className={styles.sortBtn}
									>
										{column.label}
										{column.key === 'name' ||
										column.key === 'date' ||
										column.key === 'status' ? (
											<ListDefaultSIcon
												className={styles.sortIcon}
												direction={sortOrder === 'asc' ? 'up' : 'down'}
											/>
										) : null}
									</span>
								</div>
							))}
						</div>
						<ul className={styles.tableRaws}>
							{sortedData.map((row, index) => (
								<li key={index} className={styles.tableRaw}>
									{columns.map((column) => (
										<div key={column.key} className={styles.tableCell}>
											{column.key === 'status' ? (
												<div
													className={`${styles.cellStatus} ${getStatusColorClass(row[column.key])}`}
												>
													{row[column.key]}
												</div>
											) : column.key === 'progress' ? (
												row[column.key] !== 0 ? (
													<CircularProgressBar
														value={row[column.key]}
														size="s"
														contentColor="primary"
														title={`${row[column.key]}%`}
													/>
												) : (
													<p className={styles.cellNoData}>-</p>
												)
											) : row[column.key] !== '' ? (
												row[column.key]
											) : (
												<p className={styles.cellNoData}>-</p>
											)}
										</div>
									))}
									<Button view="tertiary" size="xxs">
										Открыть
									</Button>
									<button className={styles.dotsActionBtn}>
										<MoreMIcon />
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
