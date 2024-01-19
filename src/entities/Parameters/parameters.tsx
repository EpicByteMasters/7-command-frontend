import styles from './parameters.module.scss';

export const Parameters = () => {
	return (
		<div className={styles.parameters}>
			<p className={styles.paramName}>ЦЕЛЬ</p>
			<p className={styles.paramName}>НАЧАЛО</p>
			<p className={styles.paramName}>ЗАВЕРШЕНИЕ</p>
			<p className={styles.paramName}>ПРОГРЕСС</p>
			<p className={styles.paramName}>СТАТУС</p>
		</div>
	);
};
