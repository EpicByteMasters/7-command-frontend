import styles from './manager-ipr-draft.module.scss';
import styles2 from './manager-ipr-form-styles.module.scss';
import React, { FC, ChangeEvent, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../shared/header-component/header';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { Button } from '@alfalab/core-components/button';
import { Status, StatusProps } from '@alfalab/core-components/status';
import { TrashCanMIcon } from '@alfalab/icons-glyph/TrashCanMIcon';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import avatar from '../../images/avatars/avatar_head-of-dept.png';
import { Tasks } from '../../entities/tasks/tasks';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { Modal } from '../../entities/modal/modal';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
interface ManagerIprDraftProps {
	statusText: string;
	statusColor: StatusProps['color'];
	isExecutive: boolean;
	ipr_id: number;
}
interface OptionShape {
	key: string;
}
interface UserShapeProps {
	name: string;
	position: string;
	avatar: string;
}

export const ManagerIprDraft = ({
	statusText,
	statusColor,
	isExecutive,
	ipr_id,
}: ManagerIprDraftProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const user = [
		{
			name: 'Сошнева Инна Павловна',
			position: 'Менеджер направления',
			avatar: avatar,
		},
	];

	const [modalOpen, setModalOpen] = useState(false);
	const [modalDisacrd, setDiscardOpen] = useState(false);
	const [modalSave, setSaveOpen] = useState(false);

	const onModalOpen = () => {
		setModalOpen(!modalOpen);
	};
	const onClick = () => {
		// navigate(`/service-iprs/ipr/${ipr_id}`, { replace: true });
		navigate('/iprs/rating', { replace: true });
	};

	const onModalDiscardOpen = () => {
		setDiscardOpen(!modalDisacrd);
	};
	const onModalSaveOpen = () => {
		setSaveOpen(!modalSave);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBarMini isExecutive={isExecutive} />
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
						{statusText && (
							<Status view="soft" color={statusColor}>
								{statusText}
							</Status>
						)}
					</div>
					<div className={styles.employeeWrapper}>
						<EmployeeInfoCard
							name="Сошнева Инна Павловна"
							position="Руководитель направления"
							avatar={avatar}
						/>
					</div>
					<div className={styles.buttonsWrapper}>
						<Button
							onClick={onModalSaveOpen}
							view="secondary"
							size="m"
							className={styles.buttonSave}
						>
							Сохранить
						</Button>
						{statusText === 'в работе' ? (
							<Button
								onClick={onClick}
								view="primary"
								size="m"
								className={styles.buttonSend}
							>
								Подвести итоги
							</Button>
						) : (
							<Button view="primary" size="m" className={styles.buttonSend}>
								Отправить в работу
							</Button>
						)}

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
						{statusText === 'в работе' ? (
							<div className={styles.btnSaveWrapper}>
								<Button
									onClick={onModalDiscardOpen}
									view="tertiary"
									size="m"
									className={styles.buttonDiscard}
								>
									Отменить
								</Button>
							</div>
						) : (
							''
						)}
					</div>

					<form className={styles2.form}>
						<TasksOverview
							isExecutive={isExecutive}
							iprStatus="черновик"
						></TasksOverview>
						<fieldset className={styles2.blockWrapper}>
							<legend className={styles2.blockTitle}>Задачи</legend>
							<Tasks isEmployee={true} />
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
			{modalDisacrd ? (
				<Modal
					title={'Отмена плана развития сотрудника'}
					paragraph={
						'Вы дейстивтельно хотите отменить индивидуальный план развития?'
					}
					button1={'Да'}
					button2={'Нет'}
				></Modal>
			) : (
				''
			)}
			{modalSave ? (
				<Modal
					title={'Изменения сохранены'}
					// paragraph={
					// 	'Вы дейстивтельно хотите отменить индивидуальный план развития?'
					// }
					// button1={'Да'}
					// button2={'Нет'}
				></Modal>
			) : (
				''
			)}
		</>
	);
};
