import styles from './my-plan.module.scss';

import Header from '../../shared/header-component/header';
import { Plan } from '../../entities/plan-component/plan';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { FooterMain } from '../../entities/footer-main/footer-main';

interface EmployeeProps {
	isEmployee?: boolean;
	ipr_id3: number;
}

//TODO пропсы не нужны? убрать прокидывание

export const MyPlan: React.FC<EmployeeProps> = ({ isEmployee, ipr_id3 }) => {
	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<Header />
				<section className={styles.myPlan}>
					<div className={styles.container}>
						<NavBarMini></NavBarMini>
					</div>
					<div className={styles.wrapper}>
						<h1 className={styles.title}>Мой план развития</h1>
						<div className={styles.container}>
							<Plan />
						</div>
					</div>
				</section>
			</div>
			<div className={styles.generalFooter}>
				<FooterMain></FooterMain>
			</div>
		</div>
	);
};
