import styles from './employee-plan.module.scss';
import Header from '../../components/Header/header';
import NavBar from '../../entities/navbar/navbar';
import avatar from '../../images/avatar.png';
import { Plan } from '../../entities/plan-component/plan';
import { Button } from '@alfalab/core-components/button';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';

export const EmployeePlan = () => {
	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<div className={styles.wrapper}>
					<h2 className={styles.title}>План развития сотрудника</h2>
					<div className={styles.employeeWrapper}>
						<EmployeeInfoCard
							name="Константинов Константин Игоревич"
							position="Фронтенд-разработчик"
							avatar={avatar}
						/>
					</div>
					<Button view="primary" size="m" className={styles.button}>
						Создать новый план развития
					</Button>
					<Plan />
				</div>
			</div>
		</>
	);
};
