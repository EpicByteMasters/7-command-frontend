import styles from './my-ipr-rating.module.scss';
import { Textarea } from '@alfalab/core-components/textarea';
import { ChangeEvent, useState } from 'react';
import Header from '../../shared/header-component/header';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { PageTitle } from '../../shared/page-title/page-title';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
interface RatingProps {
	isExecutive?: boolean;
}

export const MyIprRating: React.FC<RatingProps> = ({ isExecutive }) => {
	const options = [{ key: 'Выполнен' }, { key: 'Не выполнен' }];

	const [selectedRating, setSelectedRaiting] = useState<number>(0);
	const [comment, setComment] = useState<string>('');

	const handleRatingClick = (rating: number) => {
		setSelectedRaiting(rating);
	};

	const handleSubmit = () => {
		console.log('Выбранная оценка:', selectedRating);
		console.log('Комментарий:', comment);
	};

	const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const inputText = event.target.value;
		setComment(inputText);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBarMini isExecutive={false} />
				<div className={styles.wrapper}>
					<PageTitle title="Мой план развития" />
					<h3 className={styles.subtitle}>Оценка от руководителя</h3>
					<div className={styles.formWrapper}>
						<div className={styles.ratingWrapper}>
							<div className={styles.rating}>
								{Array.from({ length: 10 }, (_, index) => (
									<div
										key={index + 1}
										onClick={() => handleRatingClick(index + 1)}
										className={`${styles.ratingBtn} ${
											selectedRating >= index + 1 ? styles.clicked : ''
										}`}
									>
										{index + 1}
									</div>
								))}
							</div>
							<div className={styles.ratingSpan}>
								<span>Есть над чем работать</span>
								<span>Молодец!</span>
							</div>
						</div>
						<Textarea
							label="Оцените достижение цели"
							block={true}
							minRows={3}
							maxLength={96}
							showCounter={true}
							onChange={handleCommentChange}
							allowOverflow={false}
						/>
					</div>
					<TasksOverview isExecutive={false} iprStatus="" />
				</div>
			</div>
		</>
	);
};
