import styles from './my-plan.module.scss';
import Header from '../../shared/header-component/header';
import BackButton from '../../entities/backbutton/backbutton';
import { Plan } from '../../entities/plan-component/plan';
import { Footer } from '../../entities/footer/footer';

export const MyPlan = () => {
	return (
		<>
			<Header />
			<section className={styles.myPlan}>
				<div className={styles.container}>
					<BackButton />
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
