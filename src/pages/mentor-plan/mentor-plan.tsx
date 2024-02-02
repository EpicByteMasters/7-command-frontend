import styles from './mentor-plan.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import Header from '../../shared/header-component/header';
import { MentorList } from '../../entities/mentor-list/mentor-list';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { EmployeeGoalPlan } from '../../shared/utils/test-users';
import { FooterMain } from '../../entities/footer-main/footer-main';
import {
	Mentor,
	getMentorIprsList,
	selectMentorList,
} from '../../store/reducers/mentorIprSlice';
import {
	getUserById,
	IUser,
	setSelectedUser,
} from '../../store/reducers/userSlice';

interface MentorProps {
	// data: Mentor[] | undefined;
}
export const MentorPlan: React.FC<MentorProps> = ({}) => {
	const dispatch = useAppDispatch();
	const mentorIprsList = useAppSelector(selectMentorList);

	useEffect(() => {
		dispatch(getMentorIprsList());
	}, [dispatch]);

	console.log('MENTOR_LIST_IPRS', mentorIprsList);

	// const { id } = useParams<{ id: string }>();

	// const selectedUser = useAppSelector((state) => state.user.selectedUser);

	// useEffect(() => {
	// 	dispatch(getUserById(Number(id)));
	// 	return () => {
	// 		dispatch(setSelectedUser(null));
	// 	};
	// }, [dispatch, id]);

	// const isLoading = useSelector((state: RootState) => state.user.isLoading);

	// // Если данные еще загружаются, показываем заглушку
	// if (isLoading) {
	// 	return <p>Loading...</p>;
	// }

	// // Если не удалось получить данные о пользователе, показываем сообщение об ошибке
	// if (!selectedUser) {
	// 	return <p>Невозможно получить данные о пользователе.</p>;
	// }

	// console.log('SELECTED__USER', selectedUser);

	// // Функция для объединения ФИО в одну строку
	// const getFullName = (user: IUser): string => {
	// 	return `${user.surname} ${user.firstName} ${user.patronymic}`;
	// };

	// const fullName = getFullName(selectedUser);

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
