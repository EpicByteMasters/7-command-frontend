import styles from './goal.module.scss';

interface GoalProps {
	goal: string;
	dateStart: string;
	dateEnd: string;
	progress: number;
	stat: string;
}

function Goal({ goal, dateStart, dateEnd, progress, stat }: GoalProps) {
	return (
		<div className={styles.goal}>
			<ul className={styles.items_list}>
				<li className={styles.goal_name}>{goal}</li>
				<li className={styles.date_start}>{dateStart}</li>
				<li className={styles.date_end}>{dateEnd}</li>
				<li className={styles.progress}>{progress}</li>
				<li className={styles.status}>{stat}</li>
			</ul>
		</div>
	);
}

export default Goal;
