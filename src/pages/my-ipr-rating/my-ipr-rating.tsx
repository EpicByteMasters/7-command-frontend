import styles from './my-ipr-rating.module.scss';
import { ChangeEvent, useState } from 'react';

import { Textarea } from '@alfalab/core-components/textarea';

import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { PageTitle } from '../../shared/page-title/page-title';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
import { FooterMain } from '../../entities/footer-main/footer-main';

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

	const generateRandomTextAndRating = () => {
		const ratings = [5, 6, 7, 8, 9];
		const positiveComments = [
			'Отличная работа! Продолжай в том же духе!',
			'Супер! Ты превзошел ожидания!',
			'Молодец! Продвигайся дальше в развитии!',
			'Очень хорошо! Твои усилия заметны.',
			'Прекрасно! Так держать!',
		];

		const randomRating = ratings[Math.floor(Math.random() * ratings.length)];
		const randomComment =
			positiveComments[Math.floor(Math.random() * positiveComments.length)];

		return {
			rating: randomRating,
			textAreaValue: randomComment,
		};
	};

	// Пример использования в вашем компоненте:
	const { rating, textAreaValue } = generateRandomTextAndRating();
	//TODO прокинуть пропсом

	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<div className={styles.container}>
					<NavBarMini />
					{/* <NavBarMini isExecutive={false} /> */}
					<div className={styles.wrapper}>
						<PageTitle title="Мой план развития" />
						<h3 className={styles.subtitle}>Оценка от руководителя</h3>
						<div className={styles.formWrapper}>
							<div className={styles.ratingWrapper}>
								<div className={styles.rating}>
									{Array.from({ length: 10 }, (_, index) => (
										<div
											key={index + 1}
											className={`${styles.ratingBtn} ${
												index + 1 <= rating ? styles.clicked : ''
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
								//label="Оцените достижение цели"
								block={true}
								minRows={3}
								maxLength={96}
								showCounter={true}
								onChange={handleCommentChange}
								allowOverflow={false}
								disabled={true}
								value={textAreaValue}
							/>
						</div>
						<TasksOverview isExecutive={false} iprStatus="" />
					</div>
				</div>
			</div>
			<div className={styles.generalFooter}>
				<FooterMain></FooterMain>
			</div>
		</div>
	);
};
