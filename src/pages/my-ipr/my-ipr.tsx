import styles from './manager-ipr-draft.module.scss';
import styles2 from './manager-ipr-form-styles.module.scss';
import { useState } from 'react';
import { Footer } from '../../entities/footer/footer';
import Header from '../../shared/header-component/header';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { Button } from '@alfalab/core-components/button';
import { Status, StatusProps } from '@alfalab/core-components/status';
import avatar from '../../images/avatars/avatar_head-of-dept.png';
import { Tasks } from '../../entities/tasks/tasks';
import { Modal } from '../../entities/modal/modal';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
import NavBarMy from '../../entities/navbar-my/navbar-my';
import { PageTitle } from '../../shared/page-title/page-title';

interface ManagerIprDraftProps {
	statusText: string;
	statusColor: StatusProps['color'];
}
interface OptionShape {
	key: string;
}

export const MyIpr = ({ statusText, statusColor }: ManagerIprDraftProps) => {
	const [modalOpen, setModalOpen] = useState(false);

	const onModalOpen = () => {
		setModalOpen(!modalOpen);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBarMy />
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
						<PageTitle title="Мой план развития" />
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
					</div>
					<form className={styles2.form}>
						<TasksOverview isExecutive={false}></TasksOverview>
						<fieldset className={styles2.blockWrapper}>
							<legend className={styles2.blockTitle}>Задачи</legend>
							<Tasks isEmployee={true} />
						</fieldset>
					</form>
				</div>
			</div>
			<Footer></Footer>
		</>
	);
};
