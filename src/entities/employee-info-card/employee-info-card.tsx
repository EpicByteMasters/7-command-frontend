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
		<div className={styles.employeeCard}>
			<img src={avatar} alt="аватар" className={styles.avatar} />
			<div className={styles.employeeData}>
				<span className={styles.employeeName}>{name}</span>
				<span className={styles.employeePosition}>{position}</span>
			</div>
		</div>
	);
};
