//--------------------------------------------------------------
import { ChangeEvent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//--------------------------------------------------------------
import { Button } from '@alfalab/core-components/button';
import { SelectDesktop } from '@alfalab/core-components/select/desktop';

//--------------------------------------------------------------
import { Raiting } from '../../shared/rating/rating';
//--------------------------------------------------------------
import { useAppDispatch } from '../../shared/hooks/redux';
import { completeIpr } from '../../shared/store/reducers/iprSlice';

import styles from './employee-rating.module.scss';

interface EmployeeRatingPickerProps {
  withBtn?: boolean;
}

const options = [
  { key: 'COMPLETED', content: 'Выполнен' },
  { key: 'NOT_COMPLETED', content: 'Не выполнен' }
];

export const EmployeeRatingPicker: React.FC<EmployeeRatingPickerProps> = ({
  withBtn
}) => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [selectedRating, setSelectedRaiting] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [status, setStatus] = useState<any>('');

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    const response: any = await dispatch(
      completeIpr({
        iprId: Number(id),
        body: {
          iprStatusId: status.key,
          iprGrade: selectedRating,
          comment: comment
        }
      })
    );

    if (!response?.error) {
      navigate('/service-iprs/myteam');
    }
  };

  const handleCommentChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      <Raiting
        title="Оценка выполнения"
        onChangeRating={setSelectedRaiting}
        onChangeComment={setComment}
      />
    </div>
  );
};
