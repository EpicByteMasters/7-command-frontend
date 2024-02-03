import styles from './my-plan.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Plan } from '../../entities/plan-component/plan';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { FooterMain } from '../../entities/footer-main/footer-main';

import { getIPRSData } from '../../store/reducers/iprsSlice';
import { useAppDispatch } from '../../shared/hooks/redux';

export const MyPlan: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		// добываем ИПРы
		const iprsDataResult = async () => {
			return await dispatch(getIPRSData());
		};

		iprsDataResult().catch(() => navigate('/404', { replace: true }));
	}, []);

	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<section className={styles.myPlan}>
					<div className={styles.container}>
						<NavBarMini></NavBarMini>
					</div>
					<div className={styles.wrapper}>
						<h1 className={styles.title}>Мой план развития</h1>
						<div className={styles.container}>
							<Plan />
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
