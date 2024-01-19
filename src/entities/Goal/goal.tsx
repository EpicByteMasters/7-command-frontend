import styles from './goal.module.scss';
import { Status } from '@alfalab/core-components/status';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Button } from '@alfalab/core-components/button';

interface GoalProps {
	goal: string;
	dateStart: string;
	dateEnd: string;
	progress: number;
	statusText: string;
	statusColor:
		| 'green'
		| 'orange'
		| 'red'
		| 'blue'
		| 'grey'
		| 'teal'
		| 'purple'
		| undefined;
	disabledButton?: boolean;
	active?: boolean;
}

export const Goal = ({
	goal,
	dateStart,
	dateEnd,
	progress,
	statusText,
	statusColor,
	disabledButton,
	active,
}: GoalProps) => {
	const itemListClassName = `${styles.itemsList} ${active ? styles.active : ''}`;
	const progressProcentage = `${progress}%`;
	return (
		<ul className={itemListClassName}>
			<li className={styles.item}>{goal}</li>
			<li className={styles.item}>{dateStart}</li>
			<li className={styles.item}>{dateEnd}</li>
			<li className={styles.item}>
				<CircularProgressBar
					value={progress}
					title={progressProcentage}
					size="s"
					contentColor="primary"
					className={styles.progressBar}
				></CircularProgressBar>
			</li>
			<li className={styles.item}>
				<Status view="soft" color={statusColor}>
					{statusText}
				</Status>
			</li>
			<li className={styles.item}>
				<Button disabled={disabledButton} view="tertiary" size="s">
					Открыть
				</Button>
			</li>
		</ul>
	);
};
