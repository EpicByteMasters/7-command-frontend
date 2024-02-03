import styles from './backbutton.module.scss';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';
import { Modal } from '../modal/modal';

interface ButtonProps {
	isExecutive?: boolean;
	isEmployee?: boolean;
	isMentor?: boolean;
	className?: string;
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
		// if (location.pathname === '/service-iprs/myteam') {
		// 	navigate('/main', { replace: true });
		// }
		// if (location.pathname === '/service-iprs/my') {
		// 	navigate('/main', { replace: true });
		// }
		// if (
		// 	(location.pathname === '/service-iprs/mentor' && isMentor) ||
		// 	isExecutive
		// ) {
		// 	navigate('/main', { replace: true });
		// }
		navigate(-1);
	};

	const goBack2 = () => {
		setModal(!modal);
	};
	return (
		<>
			<aside className={styles.aside}>
				<nav className={styles.navtab}>
					<div className={styles.list}>
						<li className={styles.item}>
							{location.pathname === '/service-iprs/ipr/2' ? (
								<button className={styles.link} onClick={goBack2}>
									<ArrowLeftMediumMIcon
										className={styles.iconBack}
										fill="currentColor"
									></ArrowLeftMediumMIcon>
									<span>Назад</span>
								</button>
							) : (
								<button className={styles.link} onClick={goBack}>
									<ArrowLeftMediumMIcon
										className={styles.iconBack}
										fill="currentColor"
									></ArrowLeftMediumMIcon>
									<span>Назад</span>
								</button>
							)}
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
