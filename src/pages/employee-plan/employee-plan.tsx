import styles from './employee-plan.module.scss';
import Header from '../../components/Header/header';
import NavBar from '../../entities/NavBar/navbar';
import avatar from '../../images/avatar.png';
import { Plan } from '../../entities/Plan/plan';

export const EmployeePlan = () => {
	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<div className={styles.wrapper}>
					<h2 className={styles.title}>План развития сотрудника</h2>
					<div className={styles.employee__wrapper}>
						<div className={styles.employee__card}>
							<img src={avatar} alt="аватар" className={styles.avatar} />
							<div className={styles.employee__data}>
								<span className={styles.employee__name}>
									Константинов Константин Игоревич
								</span>
								<span className={styles.employee__position}>
									Фронтенд-разработчик
								</span>
							</div>
						</div>
					</div>
					<Plan />
				</div>
			</div>
		</>
	);
};
