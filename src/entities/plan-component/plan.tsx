import styles from './plan.module.scss';

import React, { useState } from 'react';
import { useAppSelector } from '../../shared/hooks/redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Table } from '@alfalab/core-components/table';
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';

import IprStatusDoc from '../../type/ipr-status-name';
import { IIpr } from 'src/store/type/iprs-arr-data';

export const Plan: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useAppSelector((state) => state.user.user);

  const iprsArrData = useAppSelector((state) => state.iprs.iprsData);
  //console.log('iprData:', iprsArrData);

  const handleOpenButtonClick = (idIpr: number, selectedUserId: number) => {
    //console.log('ID ИПР переданное из строчки таблицы', idIpr);
    // console.log('ID пользователя переданное из строчки таблицы', selectedUserId);
    try {
      navigate(`/service-iprs/ipr/${idIpr}`, {
        state: { location, selectedUserId },
      });
    } catch (error) {
      //console.error('Error during navigating:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case IprStatusDoc.Draft:
        return 'purple';
      case IprStatusDoc.Canceled:
        return 'orange';
      case IprStatusDoc.InProgress:
        return 'blue';
      case IprStatusDoc.NotCompleted:
        return 'red';
      case IprStatusDoc.Completed:
        return 'green';
      case IprStatusDoc.NoIpr:
        return 'grey';
      default:
        return undefined;
    }
  };

  const formatDateRevert = (inputDate: string): string => {
    //console.log({ inputDate }, 'INPUTDATE');
    const [year, month, day] = inputDate.split('-');
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate || '';
  };

  return (
    <>
      {/* {isExecutive && (
				<Button view="primary" size="s" className={styles.button}>
					Создать новый план развития
				</Button>
			)} */}
      <Table className={styles.table} wrapper={false}>
        <Table.THead>
          <Table.THeadCell title="Цель">Цель</Table.THeadCell>
          <Table.THeadCell title="Начало">Начало</Table.THeadCell>
          <Table.THeadCell title="Завершение">Завершение</Table.THeadCell>
          <Table.THeadCell title="Прогресс">Прогресс</Table.THeadCell>
          <Table.THeadCell title="Статус">Статус</Table.THeadCell>
          <Table.THeadCell title="Пустая"></Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {iprsArrData.map(({ id, goal, closeDate, createDate, status, taskCompleted, taskCount }: IIpr) => {
            //console.log('taskCount:', taskCount);
            const progressTitle = `${taskCompleted}/${taskCount}`;
            const progressValue = (taskCompleted / taskCount) * 100;

            return (
              <Table.TRow className={`${styles.row} ${status.id === 'IN_PROGRESS' ? styles.active : ''}`} key={id}>
                <Table.TCell>
                  <div className={styles.tCell}>{goal?.name}</div>
                </Table.TCell>
                <Table.TCell>
                  <div>{createDate ? <div className={styles.tCell}>{formatDateRevert(createDate)}</div> : null}</div>
                </Table.TCell>
                <Table.TCell>
                  <div>{closeDate ? <div className={styles.tCell}>{formatDateRevert(closeDate)}</div> : null}</div>
                </Table.TCell>
                <Table.TCell>
                  <CircularProgressBar
                    value={progressValue || 0}
                    title={progressTitle || ''}
                    size="s"
                    contentColor="primary"
                    className={styles.progressBar}
                  />
                </Table.TCell>
                <Table.TCell>
                  <div className={styles.tCell}>
                    <Status view="soft" color={getStatusColor(status.id)}>
                      {status.name}
                    </Status>
                  </div>
                </Table.TCell>
                <Table.TCell>
                  <div className={styles.tBtn}>
                    <Button view="tertiary" size="xxs" onClick={() => handleOpenButtonClick(id, userData.id)}>
                      Открыть
                    </Button>
                  </div>
                </Table.TCell>
              </Table.TRow>
            );
          })}
        </Table.TBody>
      </Table>
    </>
  );
};
