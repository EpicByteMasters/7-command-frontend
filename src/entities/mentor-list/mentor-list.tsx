import { FC } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Status } from '@alfalab/core-components/status';
import { Typography } from '@alfalab/core-components/typography';
import { Table } from '@alfalab/core-components/table';
// import { EmployeeGoalPlan } from '../../shared/utils/test-users';
import { Space } from '@alfalab/core-components/space';

import { IEmployee } from 'src/shared/store/type/employees-list';

import { useAppSelector } from '@shared/hooks/redux';

import {
  selectCommonLibsIPRGoals,
  selectCommonLibsIPRStatus,
  selectCommonLibsPositions
} from '@shared/store/reducers/libSlice';

//import avatar from '../../images/avatars/avatar_mentor1.png';

import {
  // formatDateString,
  getStatusColor,
  getValueById
} from '@shared/utils/constants';

import styles from './mentor-list.module.scss';

export interface MentorListProps {
  data: IEmployee[] | undefined;
}

export const MentorList: FC<MentorListProps> = ({ data }) => {
  //console.log('MENTOR - DATA', data);
  const navigate = useNavigate();
  const location = useLocation();

  const positionsLib = useAppSelector(selectCommonLibsPositions);
  const iprGoalsLib = useAppSelector(selectCommonLibsIPRGoals);
  const iprStatusLib = useAppSelector(selectCommonLibsIPRStatus);

  const handleOpenButtonClick = (
    idIpr: number,
    selectedUserId: number
  ) => {
    //console.log('ID ИПР переданное из строчки таблицы', idIpr);
    //console.log('ID пользователя переданное из строчки таблицы', selectedUserId);
    try {
      navigate(`/service-iprs/ipr/${idIpr}`, {
        state: { location, selectedUserId }
      });
    } catch (error) {
      console.error('Error during navigating:', error);
    }
  };

  return (
    <>
      <Table className={styles.table} wrapper={false}>
        <Table.THead>
          <Table.THeadCell>
            <div className={styles.sortBtn}>
              <span>Сотрудник</span>
            </div>
          </Table.THeadCell>
          <Table.THeadCell>Цель</Table.THeadCell>
          <Table.THeadCell>
            <div className={styles.sortBtn}>
              <span>Дата</span>
            </div>
          </Table.THeadCell>
          <Table.THeadCell>Прогресс</Table.THeadCell>
          <Table.THeadCell>
            <div className={styles.sortBtn}>
              <span>Статус</span>
            </div>
          </Table.THeadCell>
          <Table.THeadCell title="Пустая"></Table.THeadCell>
          <Table.THeadCell title="Пустая"></Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {data?.map(
            ({
              id,
              firstName,
              lastName,
              middleName,
              positionId,
              imageUrl,
              iprId,
              goalId,
              dateOfEnd,
              taskCompleted,
              taskCount,
              statusId
            }) => {
              const color = getStatusColor(statusId);
              const persent = (taskCompleted / taskCount) * 100;
              let day, month, year;

              if (dateOfEnd) {
                [day, month, year] = dateOfEnd.split('-');
              }

              const formatedDate = `${day}.${month}.${year}`;

              return (
                <Table.TRow key={iprId}>
                  <Table.TCell>
                    <Space size={2} align={'start'}>
                      <div
                        className={styles.tCell}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                        <img
                          src={imageUrl}
                          style={{
                            width: '40px',
                            height: '40px'
                          }}
                          alt="аватар"></img>
                        <div style={{ marginLeft: '8px', width: '250px' }}>
                          <Typography.Text view="primary-small" tag="div">
                            {`${lastName} ${firstName} ${middleName}`}
                          </Typography.Text>
                          <Typography.Text
                            view="primary-small"
                            color="secondary">
                            {getValueById(positionId, positionsLib)}
                          </Typography.Text>
                        </div>
                      </div>
                    </Space>
                  </Table.TCell>
                  <Table.TCell>
                    <div className={styles.tCell}>
                      {getValueById(goalId, iprGoalsLib)}
                    </div>
                  </Table.TCell>
                  <Table.TCell>
                    {dateOfEnd === null ? (
                      '-'
                    ) : (
                      <div className={styles.tCell}>{formatedDate}</div>
                    )}
                  </Table.TCell>
                  <Table.TCell>
                    <CircularProgressBar
                      value={persent || 0}
                      title={`${taskCompleted}/${taskCount}` || ''}
                      size="s"
                      contentColor="primary"
                      className={styles.progressBar}
                    />
                  </Table.TCell>
                  <Table.TCell>
                    <div className={styles.tCell}>
                      <Status view="soft" color={color}>
                        {getValueById(statusId, iprStatusLib)}
                      </Status>
                    </div>
                  </Table.TCell>
                  <Table.TCell>
                    <div className={styles.tBtn}>
                      <Button
                        view="tertiary"
                        size="xxs"
                        onClick={() => handleOpenButtonClick(iprId, id)}>
                        Открыть
                      </Button>
                    </div>
                  </Table.TCell>
                </Table.TRow>
              );
            }
          )}
        </Table.TBody>
      </Table>
    </>
  );
};
