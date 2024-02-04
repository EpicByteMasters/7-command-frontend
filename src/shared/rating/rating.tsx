import { ChangeEvent, useState } from 'react';

import styles from './rating.module.scss';

import { Textarea } from '@alfalab/core-components/textarea';

interface IRatingProps {
  title: string;
  isDisabled?: boolean;
}

export const Raiting: React.FC<IRatingProps> = ({ title, isDisabled }) => {
  const [selectedRating, setSelectedRaiting] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleRatingClick = (rating: number) => {
    setSelectedRaiting(rating);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    setComment(inputText);
  };
  return (
    <>
      <h3 className={styles.subtitle}>{title}</h3>
      <div className={styles.formWrapper}>
        <div className={styles.ratingWrapper}>
          <div className={styles.rating}>
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={index + 1}
                onClick={() => handleRatingClick(index + 1)}
                className={`${styles.ratingBtn} ${selectedRating >= index + 1 ? styles.clicked : ''}`}
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
          disabled={isDisabled}
        />
      </div>
    </>
  );
};
