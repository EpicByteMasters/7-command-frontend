import styles from './myPlans.module.scss';

function MyPlans() {
	return (
		<section className={styles.my_plans}>
			<h1 className={styles.title}>Мои планы развития</h1>
			<ul className={styles.items_list}>
				<li className={styles.parameters}>
					<p className={styles.param_name}>ЦЕЛЬ</p>
					<p className={styles.param_name}>НАЧАЛО</p>
					<p className={styles.param_name}>ЗАВЕРШЕНИЕ</p>
					<p className={styles.param_name}>ПРОГРЕСС</p>
					<p className={styles.param_name}>СТАТУС</p>
				</li>
			</ul>
		</section>
	);
}

export default MyPlans;
