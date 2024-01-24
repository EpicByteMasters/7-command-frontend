import styles from './manager-ipr-draft.module.scss';
import styles2 from './manager-ipr-form-styles.module.scss';
import React, { FC, ChangeEvent, useState } from 'react';
import { Footer } from '../../entities/footer/footer';

import Header from '../../shared/header-component/header';

import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { Button } from '@alfalab/core-components/button';
import { Status, StatusProps } from '@alfalab/core-components/status';
import { TrashCanMIcon } from '@alfalab/icons-glyph/TrashCanMIcon';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Textarea } from '@alfalab/core-components/textarea';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import avatar from '../../images/avatars/avatar_head-of-dept.png';
import { Tasks } from '../../entities/tasks/tasks';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { Modal } from '../../entities/modal/modal';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
interface ManagerIprDraftProps {
	statusText: string;
	statusColor: StatusProps['color'];
}
interface OptionShape {
	key: string;
}
// interface UserShapeProps {
// 	name: string;
// 	position: string;
// 	avatar: string;
// }

export const ManagerIprDraft = ({
	statusText,
	statusColor,
}: ManagerIprDraftProps) => {
	// const user = [
	// 	{
	// 		name: 'Сошнева Инна Павловна',
	// 		position: 'Менеджер направления',
	// 		avatar: avatar,
	// 	},
	// ];

	const [modalOpen, setModalOpen] = useState(false);

	const onModalOpen = () => {
		setModalOpen(!modalOpen);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBarMini />
				{modalOpen && (
					<Modal
						title="Выйти без сохранения?"
						paragraph="Чтобы не потерять данные, вернитесь и сохраните изменения"
						button1="Выйти"
						button2="Отмена"
					></Modal>
				)}
				<div className={styles.iprDraft}>
					<div className={styles.titleWrapper}>
						<h1 className={styles.title}>План развития сотрудника</h1>
						<Status view="soft" color={statusColor}>
							{statusText}
						</Status>
					</div>
					<div className={styles.employeeWrapper}>
						<EmployeeInfoCard
							name="Сошнева Инна Павловна"
							position="Руководитель направления"
							avatar={avatar}
						/>
					</div>
					<div className={styles.buttonsWrapper}>
						<Button view="secondary" size="m" className={styles.buttonSave}>
							Сохранить
						</Button>
						<Button view="primary" size="m" className={styles.buttonSend}>
							Отправить в работу
						</Button>
						<button
							onClick={onModalOpen}
							style={{
								border: 'none',
								backgroundColor: 'transparent',
								cursor: 'pointer',
							}}
						>
							<TrashCanMIcon color="#EC2E13"></TrashCanMIcon>
						</button>
					</div>
					<form className={styles2.form}>
						<TasksOverview isExecutive={false}></TasksOverview>
						<fieldset className={styles2.blockWrapper}>
							<legend className={styles2.blockTitle}>Задачи</legend>
							<Tasks isEmployee={false} />
						</fieldset>

						<ButtonDesktop
							view="tertiary"
							shape="rectangular"
							size="s"
							className="button__component"
							nowrap={false}
							colors="default"
						>
							Добавить новую
						</ButtonDesktop>
					</form>
				</div>
			</div>
			<Footer></Footer>
		</>
	);
};
