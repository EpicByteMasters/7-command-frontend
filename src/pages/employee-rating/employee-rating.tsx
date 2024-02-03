import styles from './employee-rating.module.scss';
//--------------------------------------------------------------
import { ChangeEvent, useState } from 'react';
//--------------------------------------------------------------
import { Button } from '@alfalab/core-components/button';
import { PickerButton } from '@alfalab/core-components/picker-button';
//--------------------------------------------------------------
import { Raiting } from '../../shared/rating/rating';
//--------------------------------------------------------------
interface EmployeeRatingPickerProps {
	withBtn?: boolean;
}

export const EmployeeRatingPicker: React.FC<EmployeeRatingPickerProps> = ({
	withBtn,
}) => {
	const options = [{ key: 'Выполнен' }, { key: 'Не выполнен' }];

	const [selectedRating, setSelectedRaiting] = useState<number>(0);
	const [comment, setComment] = useState<string>('');

	const handleSubmit = () => {
		console.log('Выбранная оценка:', selectedRating);
		console.log('Комментарий:', comment);
	};

	const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const inputText = event.target.value;
		setComment(inputText);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.btnContainer}>
				{withBtn && (
					<>
						<PickerButton
							options={options}
							view="secondary"
							label="Выбрать статус"
						></PickerButton>
						<Button view="primary" size="m" onClick={handleSubmit}>
							Завершить
						</Button>
					</>
				)}
			</div>
			<Raiting title="Оценка выполнения" />
		</div>
	);
};
