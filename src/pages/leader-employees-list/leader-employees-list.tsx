import styles from './leader-employees-list.module.scss';
import { FC, useMemo, useState } from 'react';
import { Input } from '@alfalab/core-components/input';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { Select } from '@alfalab/core-components/select';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import Header from '../../shared/header-component/header';
import { LeadInfoBlock } from '../../entities/lead-info-block/lead-info-block';
import { PageTitle } from '../../shared/page-title/page-title';
import { EmployeesList } from '../../entities/employees-list/employees-list';
import { EmployeeGoalPlan } from '../../shared/utils/test-users';
import { ChevronDownSIcon } from '@alfalab/icons-glyph/ChevronDownSIcon';
import { ChevronUpSIcon } from '@alfalab/icons-glyph/ChevronUpSIcon';
import { ExclamationCircleSIcon } from '@alfalab/icons-glyph/ExclamationCircleSIcon';

interface TableProps {
	data: EmployeeGoalPlan[];
	isExecutive: boolean;
	ipr_id: number;
	ipr_id2: number;
}

const structureData = {
	title: 'Вовлеченность команды',
	items: [
		{ subtitle: 'Размеры команды', number: 348 },
		{ subtitle: 'Всего в работе', number: 60 },
		{ subtitle: 'Соотношение', number: 15 },
	],
};

const successData = {
	title: 'Успешность планов развития',
	items: [
		{ subtitle: 'Выполненных', number: 85 },
		{ subtitle: 'Не выполненных', number: 15 },
		{ subtitle: 'Соотношение', number: 5 },
	],
};

export const LeaderEmployeesList: React.FC<TableProps> = ({
	data,
	isExecutive,
	ipr_id,
	ipr_id2,
}) => {
	const contentLabel1 = <span>Цель</span>;
	const contentLabel2 = <span>Статус</span>;

	// ------------------------------
	const OPTIONS_GOAL: { key: string; content: string }[] = [
		{ key: '1', content: 'Карьерный рост' },
		{ key: '2', content: 'Повышение грейда' },
		{ key: '3', content: 'Соответствие занимаемой должности' },
		{ key: '4', content: 'Развитие софт-скиллов' },
		{ key: '5', content: 'Развитие хард-скиллов' },
		{ key: '6', content: 'Смена специализации' },
		{ key: '7', content: 'Смена команды' },
		{ key: '8', content: 'Получение нового опыта' },
	];

	const OPTIONS_STATUS: { key: string; content: string }[] = [
		{ key: '1', content: 'Не выполен' },
		{ key: '2', content: 'В работе' },
		{ key: '3', content: 'Выполнен' },
		{ key: '4', content: 'Отменен' },
		{ key: '5', content: 'Черновик' },
		{ key: '6', content: 'Отсутствует' },
	];
	const [chevron, setChevron] = useState(false);
	const [chevron2, setChevron2] = useState(false);
	const [statusValue, setStatusValue] = useState<string>('');
	const [statusGoal, setGoalValue] = useState<string>('');

	const onClick = () => {
		setChevron(!chevron);
		setGoalValue('');
	};
	const onClick2 = () => {
		setChevron2(!chevron2);
		setStatusValue('');
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBarMini isExecutive={isExecutive} />
				<div className={styles.wrapper}>
					<div className={styles.titleWrapper}>
						<PageTitle title="План развития сотрудников" />
						<ExclamationCircleSIcon fill={'#898889'} />
					</div>
					<div className={styles.dataWrapper}>
						<LeadInfoBlock data={structureData} />
						<LeadInfoBlock data={successData} />
					</div>
					<div className={styles.searchInputWrapper}>
						<Input
							size="s"
							colors="default"
							placeholder="Поиск по сотрудникам"
							className={styles.input}
							leftAddons={<MagnifierMIcon color="#898889" />}
							type="text"
							block={true}
						/>
					</div>

					<div className={styles.filterTagsWrapper}>
						<div className={styles.dropdown1}>
							<button
								onClick={onClick}
								name="btnGoal"
								className={styles.dropbtn1}
							>
								Цель
								<div>
									{chevron ? (
										<ChevronDownSIcon></ChevronDownSIcon>
									) : (
										<ChevronUpSIcon></ChevronUpSIcon>
									)}
								</div>
							</button>
							{chevron ? (
								<div className={styles.dropdownContent1}>
									{chevron &&
										OPTIONS_GOAL.map((goal, key) => {
											return (
												<p
													key={goal.key}
													onClick={() => {
														setGoalValue(goal.content);
														setChevron(!chevron);
													}}
												>
													{goal.content}
												</p>
											);
										})}
								</div>
							) : (
								''
							)}
						</div>

						<div className={styles.dropdown2}>
							<button
								name="btnStatus"
								onClick={onClick2}
								className={styles.dropbtn2}
							>
								Статус
								<div>
									{chevron2 ? (
										<ChevronDownSIcon></ChevronDownSIcon>
									) : (
										<ChevronUpSIcon></ChevronUpSIcon>
									)}
								</div>
							</button>
							{chevron2 ? (
								<div className={styles.dropdownContent2}>
									{chevron2 &&
										OPTIONS_STATUS.map((status, key) => {
											return (
												<p
													key={status.key}
													onClick={() => {
														setStatusValue(status.content.toLocaleLowerCase());
														setChevron2(!chevron2);
													}}
												>
													{status.content}
												</p>
											);
										})}
								</div>
							) : (
								''
							)}
						</div>
					</div>

					<EmployeesList
						data={data}
						ipr_id={ipr_id}
						ipr_id2={ipr_id2}
						goal={statusGoal}
						status={statusValue}
					/>
				</div>
			</div>
		</>
	);
};
