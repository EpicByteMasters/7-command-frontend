import styles from './employee-info-card.module.scss';

interface IEmployeeInfoCardProps {
	name: string;
	position: string;
	avatar: string;
}

export const EmployeeInfoCard: React.FC<IEmployeeInfoCardProps> = ({
	name,
	position,
	avatar,
}) => {
	return (
		<div className={styles.employeeCard}>
			<img src={avatar} alt="ava" className={styles.avatar} />
			<div className={styles.employeeData}>
				<span className={styles.employeeName}>{name}</span>
				<span className={styles.employeePosition}>{position}</span>
			</div>
		</div>
	);
};
