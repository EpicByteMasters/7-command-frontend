import styles from './employee-plan.module.scss';
import Header from '../../shared/header-component/header';
import avatar from '../../images/avatar.png';
import { Plan } from '../../entities/plan-component/plan';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { NavBarMini } from '../../entities/navbar-mini/navbar-mini';
import { FooterMain } from '../../entities/footer-main/footer-main';

export const EmployeePlan: React.FC = () => {
	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<Header />
				<div className={styles.container}>
					{/* <NavBarMini isExecutive={true} /> */}
					<NavBarMini />

					<div className={styles.wrapper}>
						<h2 className={styles.title}>План развития сотрудника</h2>
						<div className={styles.employeeWrapper}>
							<EmployeeInfoCard
								name="Константинов Константин Игоревич"
								position="Фронтенд-разработчик"
								avatar={avatar}
							/>
						</div>
						<Plan />
					</div>
				</div>
			</div>
			<div className={styles.generalFooter}>
				<FooterMain></FooterMain>
			</div>
		</div>
	);
};
