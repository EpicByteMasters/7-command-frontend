import styles from './mentor-plan.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';

import Header from '../../shared/header-component/header';
import { MentorList } from '../../entities/mentor-list/mentor-list';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';

import { FooterMain } from '../../entities/footer-main/footer-main';
import {
	getMentorIprsList,
	selectMentorList,
} from '../../store/reducers/mentorIprSlice';

export const MentorPlan: React.FC = () => {
	const dispatch = useAppDispatch();
	const mentorIprsList = useAppSelector(selectMentorList);

	useEffect(() => {
		dispatch(getMentorIprsList());
	}, [dispatch]);

	console.log('MENTOR_LIST_IPRS', mentorIprsList);

	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<Header />
				<section className={styles.myPlan}>
					<div className={styles.container}>
						<NavBarMini></NavBarMini>
						<div className={styles.wrapper}>
							<h1 className={styles.title}>Менторство сотрудников</h1>
							<div className={styles.container}>
								<MentorList data={mentorIprsList?.employees} />
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className={styles.generalFooter}>
				<FooterMain></FooterMain>
			</div>
		</div>
	);
};
