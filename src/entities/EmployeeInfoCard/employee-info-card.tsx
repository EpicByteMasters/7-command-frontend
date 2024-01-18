import styles from './employee-info-card.module.scss';

interface EmployeeInfoCardProps {
	name: string;
	position: string;
	avatar: string;
}

export const EmployeeInfoCard: React.FC<EmployeeInfoCardProps> = ({
	name,
	position,
	avatar,
}) => {
	return (
		<div className={styles.employee__card}>
			<img src={avatar} alt="аватар" className={styles.avatar} />
			<div className={styles.employee__data}>
				<span className={styles.employee__name}>{name}</span>
				<span className={styles.employee__position}>{position}</span>
			</div>
		</div>
	);
};
