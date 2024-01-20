import React from 'react';
import styles from './manager-ipr-draft.module.scss';
import Header from '../../components/Header/header';
import NavBar from '../../entities/navbar/navbar';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import avatar from '../../images/avatar.png';
import { Button } from '@alfalab/core-components/button';
import { Status, StatusProps } from '@alfalab/core-components/status';
import { TrashCanMIcon } from '@alfalab/icons-glyph/TrashCanMIcon';

interface ManagerIprDraftProps {
	statusText: string;
	statusColor: StatusProps['color'];
}

export const ManagerIprDraft = ({
	statusText,
	statusColor,
}: ManagerIprDraftProps) => {
	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<div className={styles.iprDraft}>
					<div className={styles.titleWrapper}>
						<h1 className={styles.title}>План развития сотрудника</h1>
						<Status view="soft" color={statusColor}>
							{statusText}
						</Status>
					</div>
					<div className={styles.employeeWrapper}>
						<EmployeeInfoCard
							name="Константинов Константин Игоревич"
							position="Фронтенд-разработчик"
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
						<TrashCanMIcon color="#EC2E13" />
					</div>
					<h2 className={styles.subtitle}>Общее описание</h2>
				</div>
			</div>
		</>
	);
};
