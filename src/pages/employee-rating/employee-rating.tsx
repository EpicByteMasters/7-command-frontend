import styles from './employee-rating.module.scss';
import { Button } from '@alfalab/core-components/button';
import { PickerButton } from '@alfalab/core-components/picker-button';
import { Textarea } from '@alfalab/core-components/textarea';
import { ChangeEvent, useState } from 'react';
import Header from '../../shared/header-component/header';
import NavBar from '../../entities/navbar/navbar';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import avatar from '../../images/avatar.png';
import { Footer } from '../../entities/footer/footer';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
interface RatingProps {
	isExecutive?: boolean;
}

export const EmployeeRatingPage: React.FC<RatingProps> = ({ isExecutive }) => {
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
				<NavBarMini isExecutive={isExecutive} />
				<div className={styles.wrapper}>
					<h2 className={styles.title}>План развития сотрудника</h2>
					<div className={styles.employeeWrapper}>
						<EmployeeInfoCard
							name="Константинов Константин Игоревич"
							position="Фронтенд-разработчик"
							avatar={avatar}
						/>
					</div>
					<div className={styles.btnContainer}>
						<PickerButton
							options={options}
							view="secondary"
							label="Выбрать статус"
						></PickerButton>
						<Button view="primary" onClick={handleSubmit}>
							Завершить
						</Button>
					</div>
					<h3 className={styles.subtitle}>Оценка выполнения</h3>
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
				</div>
			</div>
			<Footer></Footer>
		</>
	);
};
