import { ChangeEvent, useState, useEffect } from 'react';

import styles from './rating.module.scss';

import { Textarea } from '@alfalab/core-components/textarea';

interface IRatingProps {
  title: string;
  isDisabled?: boolean;
  onChangeComment?: any;
  onChangeRating?: any;
  ratingData?: any;
}

export const Raiting: React.FC<IRatingProps> = ({ title, isDisabled, onChangeComment, onChangeRating, ratingData }) => {
  const [selectedRating, setSelectedRaiting] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const setRatingData = () => {
    setSelectedRaiting(ratingData.rating);
    setComment(ratingData.comment);
  };

  useEffect(() => {
    if (ratingData) {
      setRatingData();
    }
  }, []);

  const handleRatingClick = (rating: number) => {
    if (!isDisabled) {
      setSelectedRaiting(rating);

      if (onChangeRating) {
        onChangeRating(rating);
      }
    }
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    setComment(inputText);

    if (onChangeComment) {
      onChangeComment(inputText);
    }
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
                className={`${styles.ratingBtn} ${ratingData ? styles.ratingDisable : ''} ${selectedRating >= index + 1 ? styles.clicked : ''}`}
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
          value={comment}
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
