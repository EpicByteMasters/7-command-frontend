import styles from './leader-employees-list.module.scss';

import { Input } from '@alfalab/core-components/input';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { Select } from '@alfalab/core-components/select';

import Header from '../../shared/header-component/header';
import { LeadInfoBlock } from '../../entities/lead-info-block/lead-info-block';
import { PageTitle } from '../../shared/page-title/page-title';
import { Footer } from '../../entities/footer/footer';
import { EmployeesList } from '../../entities/employees-list/employees-list';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { EmployeeGoalPlan } from '../../shared/utils/test-users';

interface TableProps {
	data: EmployeeGoalPlan[];
	isExecutive: boolean;
	ipr_id: number;
	ipr_id2: number;
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

export const LeaderEmployeesList: React.FC<TableProps> = ({
	data,
	isExecutive,
	ipr_id,
	ipr_id2,
}) => {
	const contentLabel1 = <span>Цель</span>;
	const contentLabel2 = <span>Статус</span>;

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBarMini isExecutive={isExecutive} />
				<div className={styles.wrapper}>
					<PageTitle title="План развития"></PageTitle>
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
						<FilterTag view="filled">{contentLabel1}</FilterTag>
						<FilterTag view="filled">{contentLabel2}</FilterTag>
					</div>
					<EmployeesList data={data} ipr_id={ipr_id} ipr_id2={ipr_id2} />
				</div>
			</div>
			<Footer></Footer>
		</>
	);
};
