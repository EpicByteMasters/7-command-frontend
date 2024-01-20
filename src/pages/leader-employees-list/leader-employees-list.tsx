import Header from '../../components/Header/header';
import NavBar from '../../entities/navbar/navbar';

import styles from './leader-employees-list.module.scss';

import { InputDesktop } from '@alfalab/core-components/input/desktop';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';

import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';

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

export const LeaderEmployeesList: React.FC<TableProps> = ({ data }) => {
	const contentLabel1 = <span>Цель</span>;
	const contentLabel2 = <span>Статус</span>;

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

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<div className={styles.wrapper}>
					<h2 className={styles.title}>План развития</h2>
					<div className={styles.dataWrapper}>
						<div className={styles.dataItem}>
							<h3 className={styles.dataTitle}>Вся структура</h3>
							<div className={styles.dataList}>
								<div className={styles.dataElement}>
									<span className={styles.dataText}>Штатная численность</span>
									<span className={styles.dataNumber}>30</span>
								</div>
								<div className={styles.dataElement}>
									<span className={styles.dataText}>Сотрудники</span>
									<span className={styles.dataNumber}>25</span>
								</div>
								<div className={styles.dataElement}>
									<span className={styles.dataText}>Вакансии</span>
									<span className={styles.dataNumber}>5</span>
								</div>
							</div>
						</div>
						<div className={styles.dataItem}>
							<h3 className={styles.dataTitle}>Успешность планов развития</h3>
							<div className={styles.dataList}>
								<div className={styles.dataElement}>
									<span className={styles.dataText}>Создано</span>
									<span className={styles.dataNumber}>30</span>
								</div>
								<div className={styles.dataElement}>
									<span className={styles.dataText}>Закрыто</span>
									<span className={styles.dataNumber}>25</span>
								</div>
								<div className={styles.dataElement}>
									<span className={styles.dataText}>В работе</span>
									<span className={styles.dataNumber}>5</span>
								</div>
							</div>
						</div>
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
									{column.label}
								</div>
							))}
						</div>
						<ul className={styles.tableRaws}>
							{data.map((row, index) => (
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
