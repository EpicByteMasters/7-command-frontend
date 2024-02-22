import { useEffect, FC } from 'react';

import {
  getMentorIprsList,
  selectMentorList
} from '@shared/store/reducers/mentorIprSlice';

import { MentorList } from '@entities/mentor-list/mentor-list';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';

import NavBarMini from '@entities/navbar-mini/navbar-mini';

import styles from './mentor-plan.module.scss';

export const MentorPlan: FC = () => {
  const dispatch = useAppDispatch();
  const mentorIprsList = useAppSelector(selectMentorList);

  useEffect(() => {
    dispatch(getMentorIprsList());
  }, [dispatch]);

  return (
    <div className={styles.generalFooterWrapper}>
      <div className={styles.generalFooterContainer}>
        <section className={styles.myPlan}>
          <div className={styles.container}>
            <NavBarMini></NavBarMini>
            <div className={styles.wrapper}>
              <h1 className={styles.title}>Менторство сотрудников</h1>
              <div className={styles.containerList}>
                <MentorList data={mentorIprsList?.employees} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.generalFooter}></div>
    </div>
  );
};
