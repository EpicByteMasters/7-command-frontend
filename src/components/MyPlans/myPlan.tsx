import styles from './myPlans.module.scss';
import Goal from '../goal/goal';
import Header from '../Header/header';
import BackButton from '../../entities/BackButton/backbutton';

function MyPlan() {
	return (
		<>
			<Header />
			<section className={styles.my_plans}>
				<div className={styles.container}>
					<BackButton />
				</div>
				<div className={styles.container}>
					<h1 className={styles.title}>Мой план развития</h1>
					<ul className={styles.items_list}>
						<li className={styles.parameters}>
							<p className={styles.param_name}>ЦЕЛЬ</p>
							<p className={styles.param_name}>НАЧАЛО</p>
							<p className={styles.param_name}>ЗАВЕРШЕНИЕ</p>
							<p className={styles.param_name}>ПРОГРЕСС</p>
							<p className={styles.param_name}>СТАТУС</p>
						</li>
						<Goal
							goal="Карьерный рост"
							dateStart="15.01.2024"
							dateEnd="25.12.2024"
							progress={0}
							stat="в работе"
						/>
					</ul>
				</div>
			</section>
		</>
	);
}

export default MyPlan;
