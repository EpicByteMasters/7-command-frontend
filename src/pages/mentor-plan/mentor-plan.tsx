import styles from './mentor-plan.module.scss';
import Header from '../../shared/header-component/header';
import { MentorList } from '../../entities/mentor-list/mentor-list';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { EmployeeGoalPlan } from '../../shared/utils/test-users';

interface MentorProps {
	data: EmployeeGoalPlan[];
	isMentor: boolean;
	isExecutive: boolean;
	ipr_id4: number;
	ipr_id: number;
}
export const MentorPlan: React.FC<MentorProps> = ({
	isMentor,
	isExecutive,
	ipr_id4,
	ipr_id,
	data,
}) => {
	return (
		<>
			<Header />
			<section className={styles.myPlan}>
				<div className={styles.container}>
					<NavBarMini
						isMentor={isMentor}
						isExecutive={isExecutive}
					></NavBarMini>
					<div className={styles.wrapper}>
						<h1 className={styles.title}>Менторство сотрудников</h1>
						<div className={styles.container}>
							<MentorList
								data={data}
								ipr_id={ipr_id}
								isMentor={isMentor}
								isExecutive={isExecutive}
								ipr_id4={ipr_id4}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
