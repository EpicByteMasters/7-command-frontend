import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@alfalab/core-components/button';

import type { ICoursesOption } from '../entities/tasks/type';

import { isTestResultDummyUrl } from '../util';

import styles from '../entities/tasks/tasks.module.scss';

interface IProps {
  course: ICoursesOption;
}

export const TestResultButton: FC<IProps> = ({ course }) => {
  const navigate = useNavigate();

  return !isTestResultDummyUrl(course.value.urlLink) ? (
    <Button
      size="xxs"
      view="tertiary"
      style={{ marginLeft: '550px' }}
      className={styles.buttonResult}
      onClick={() => navigate(course.value.urlLink)}
    >
      Посмотреть результат
    </Button>
  ) : null;
};
