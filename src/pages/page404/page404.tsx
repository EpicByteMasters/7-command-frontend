import styles from './page404.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@alfalab/core-components/button';
import Header from '../../shared/header-component/header';

interface PageProps {
	error: string;
	title: string;
	paragraph: string;
	button: string;
}
export const Page404: React.FC<PageProps> = ({
	error,
	title,
	paragraph,
	button,
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = () => {
		if (location.pathname === '/207') {
			navigate('/', { replace: true });
		}
		if (location.pathname === ('/404' || '/505')) {
			navigate('/main', { replace: true });
		}
	};
	return (
		<section className={styles.container}>
			<Header></Header>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.paragraph}>{paragraph}</p>
				<Button
					view="primary"
					size="m"
					className={styles.button}
					onClick={handleClick}
				>
					{button}
				</Button>
			</div>
		</section>
	);
};