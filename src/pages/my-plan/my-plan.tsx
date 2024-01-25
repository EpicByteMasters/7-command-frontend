import styles from './my-plan.module.scss';
import Header from '../../shared/header-component/header';
import { Plan } from '../../entities/plan-component/plan';
import { Footer } from '../../entities/footer/footer';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
interface EmployeeProps {
	isEmployee?: boolean;
}
export const MyPlan: React.FC<EmployeeProps> = ({ isEmployee }) => {
	return (
		<>
			<Header />
			<section className={styles.myPlan}>
				<div className={styles.container}>
					<NavBarMini isEmployee={isEmployee}></NavBarMini>
				</div>
				<div className={styles.wrapper}>
					<h1 className={styles.title}>Мой план развития</h1>
					<div className={styles.container}>
						<Plan isEmployee={true} />
					</div>
				</div>
			</section>
			<Footer></Footer>
		</>
	);
};
