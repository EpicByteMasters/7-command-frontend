import styles from './backbutton.module.scss';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';
import { Modal } from '../modal/modal';

interface ButtonProps {
	isExecutive?: boolean;
	isEmployee?: boolean;
	isMentor?: boolean;
}
export const BackButton: React.FC<ButtonProps> = ({
	isExecutive,
	isEmployee,
	isMentor,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [modal, setModal] = useState(false);

	const goBack = () => {
		// navigate(-1);
		if (location.pathname === '/service-iprs/myteam') {
			navigate('/main', { replace: true });
		}
		if (location.pathname === '/service-iprs/my') {
			navigate('/main', { replace: true });
		}
		if (location.pathname === '/service-iprs/mentor') {
			navigate('/main', { replace: true });
		}

		if (location.pathname === '/service-iprs/ipr/1') {
			setModal(!modal);
		}

		if (location.pathname === '/service-iprs/my-ipr/1') {
			navigate('/service-iprs/my', { replace: true });
		}
		if (location.pathname === '/iprs/rating') {
			navigate('/service-iprs/ipr/1', { replace: true });
		}
		if (location.pathname === '/service-iprs/myteam/history') {
			navigate('/service-iprs/myteam', { replace: true });
		}
		if (
			location.pathname === '/service-iprs/my-ipr-rating/4' ||
			'/service-iprs/my-ipr-rating/5'
		) {
			navigate('/service-iprs/my', { replace: true });
		}
	};
	return (
		<>
			<aside className={styles.aside}>
				<nav className={styles.navtab}>
					<div className={styles.list}>
						<li className={styles.item}>
							<button className={styles.link} onClick={goBack}>
								<ArrowLeftMediumMIcon
									className={styles.iconBack}
									fill="currentColor"
								></ArrowLeftMediumMIcon>
								<span>Назад</span>
							</button>
						</li>
					</div>
				</nav>
			</aside>
			{modal ? (
				<Modal
					title={'Выйти без сохранения?'}
					paragraph={
						'Чтобы не потерять данные, вернитесь и сохраните изменения'
					}
					button1={'Выйти'}
					button2={'Отмена'}
				></Modal>
			) : (
				''
			)}
		</>
	);
};
