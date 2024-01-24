import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<footer
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				margin: '40px auto',
				justifyContent: 'center',
				paddingBottom: '50px',
				width: '800px',
			}}
		>
			<Link className={styles.paragraph} to="/service-iprs/myteam">
				Список сотрудников для руководителя
			</Link>
			<Link className={styles.paragraph} to="/service-iprs/ipr/:id">
				Создание черновика
			</Link>
			<Link className={styles.paragraph} to="/service-iprs/myteam/history">
				История ИПР от лица руководителя
			</Link>
			<Link className={styles.paragraph} to="/iprs">
				История ИПРов от лица сотрудника
			</Link>
			<Link className={styles.paragraph} to="/iprs/rating">
				Страница оценки рейтинга (План развития сотрудника)
			</Link>
		</footer>
	);
};
