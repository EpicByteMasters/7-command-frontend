import styles from './employee-plan.module.scss';
import Header from '../../components/Header/header';
import NavBar from '../../entities/NavBar/navbar';
import avatar from '../../images/avatar.png';
import { Plan } from '../../entities/Plan/plan';
import { Button } from '@alfalab/core-components/button';

export const EmployeePlan = () => {
	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<div className={styles.wrapper}>
					<h2 className={styles.title}>План развития сотрудника</h2>
					<div className={styles.employeeWrapper}>
						<div className={styles.employeeCard}>
							<img src={avatar} alt="аватар" className={styles.avatar} />
							<div className={styles.employeeData}>
								<span className={styles.employeeName}>
									Константинов Константин Игоревич
								</span>
								<span className={styles.employeePosition}>
									Фронтенд-разработчик
								</span>
							</div>
						</div>
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
