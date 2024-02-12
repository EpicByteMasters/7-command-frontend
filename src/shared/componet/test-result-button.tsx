import { FC } from 'react';

import { Button } from '@alfalab/core-components/button';

import type { ICoursesOption } from '../../entities/tasks/type';

import { isTestResultDummyUrl } from '../../util';

import styles from '../../entities/tasks/tasks.module.scss';

interface IProps {
  course: ICoursesOption;
}

export const TestResultButton: FC<IProps> = ({ course }) => {
  return !isTestResultDummyUrl(course.value.urlLink) ? (
    <Button size="xxs" view="tertiary" className={styles.buttonResult} href={course.value.urlLink} target={'_blank'}>
      Посмотреть результат
    </Button>
  ) : null;
};
