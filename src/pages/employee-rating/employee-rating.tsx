import styles from './employee-rating.module.scss';
//--------------------------------------------------------------
import { ChangeEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//--------------------------------------------------------------
import { Button } from '@alfalab/core-components/button';
import { SelectDesktop } from '@alfalab/core-components/select/desktop';
//--------------------------------------------------------------
import { Raiting } from '../../shared/rating/rating';
//--------------------------------------------------------------
import { useAppDispatch } from '../../shared/hooks/redux';
import { completeIpr } from '../../store/reducers/iprSlice';

interface EmployeeRatingPickerProps {
  withBtn?: boolean;
}

const options = [
  { key: 'COMPLETED', content: 'Выполнен' },
  { key: 'NOT_COMPLETED', content: 'Не выполнен' },
];

export const EmployeeRatingPicker: React.FC<EmployeeRatingPickerProps> = ({ withBtn }) => {
  const { id } = useParams<{ id: string }>();

  const [selectedRating, setSelectedRaiting] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [status, setStatus] = useState<any>('');

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    // console.log('Выбранная оценка:', selectedRating);
    // console.log('Комментарий:', comment);
    // console.log('Статус:', status);
    const response: any = await dispatch(
      completeIpr({
        iprId: Number(id),
        body: {
          iprStatusId: status.key,
          iprGrade: selectedRating,
          comment: comment,
        },
      })
    );

    if (!response?.error) {
    }
    // console.log(response);
    // response.then<any>(() => {});
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
            <div style={{ width: 200 }}>
              <SelectDesktop
                allowUnselect={true}
                size="m"
                selected={status}
                options={options}
                placeholder="Выбрать статус"
                block={true}
                onChange={({ selected }) => {
                  setStatus(selected as any);
                }}
              />
            </div>
            <Button view="primary" size="m" onClick={handleSubmit}>
              Завершить
            </Button>
          </>
        )}
      </div>
      <Raiting title="Оценка выполнения" onChangeRating={setSelectedRaiting} onChangeComment={setComment} />
    </div>
  );
};
