import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Link className={styles.paragraph} to="/service-iprs/myteam">
				Список сотрудников для руководителя
			</Link>
			<Link className={styles.paragraph} to="/service-iprs/ipr/:id">
				Создание черновика
			</Link>
			<Link className={styles.paragraph} to="/service-iprs/myteam/history">
				История ИПР от лица руководителя
			</Link>
			<Link className={styles.paragraph} to="/service-iprs/my">
				История ИПРов от лица сотрудника
			</Link>
			<Link className={styles.paragraph} to="/iprs/rating">
				Страница оценки рейтинга (План развития сотрудника)
			</Link>
		</footer>
	);
};
