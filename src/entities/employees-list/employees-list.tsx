import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './employees-list.module.scss';

import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Status } from '@alfalab/core-components/status';
import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { Table } from '@alfalab/core-components/table';
import { ListDefaultSIcon } from '@alfalab/icons-glyph/ListDefaultSIcon';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';

import { Modal } from '../modal/modal';
import { getManagerIprsList } from '../../shared/store/reducers/managerIprSlice';

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import {
  selectCommonLibsIPRGoals,
  selectCommonLibsIPRStatus,
  selectCommonLibsPositions,
} from '../../shared/store/reducers/libSlice';

import { formatDateString, getStatusColor, getValueById } from '../../shared/utils/constants';

import { TIprStatusType } from '../../shared/utils/types';
import { createIpr, deleteIprById } from '../../shared/store/reducers/iprSlice';
import { async } from 'q';
import { IEmployee } from 'src/shared/store/type/employees-list';

export interface IEmployeesListProps {
  data: IEmployee[] | undefined;
  status: string;
  goal: string;
}

export const EmployeesList: React.FC<IEmployeesListProps> = ({ data, status, goal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const positionsLib = useAppSelector(selectCommonLibsPositions);
  const iprGoalsLib = useAppSelector(selectCommonLibsIPRGoals);
  const iprStatusLib = useAppSelector(selectCommonLibsIPRStatus);

  const userData = useAppSelector((state) => state.user.user);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [creatingIprUserId, setCreatingIprUserId] = useState<number | null>(null);

  //sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const getStatusSortOrder = (status: TIprStatusType): string => {
    const order = {
      DRAFT: '0',
      IN_PROGRESS: '1',
      COMPLETED: '2',
      NOT_COMPLETED: '3',
      CANCELED: '4',
      NO_IPR: '5',
    };

    return order[status] || '6';
  };

  // Filtered data
  const [filteredData, setFilteredData] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.length > 0) {
        let filteredResult = data;

        // Фильтрация по цели
        if (goal) {
          filteredResult = filteredResult.filter((item) => item.goalId === goal);
        }

        // Фильтрация по статусу
        if (status) {
          filteredResult = filteredResult.filter((item) => item.statusId === status);
        }

        setFilteredData(filteredResult);
        setLoading(false);
      }
    };

    // Запускаем функцию получения данных
    fetchData();
  }, [data, goal, status]);

  // Sorted and filtered data
  const sortedAndFilteredData = useMemo(() => {
    if (!filteredData) return [];

    return [...filteredData].sort((a, b) => {
      if (sortColumn === 'name') {
        const fullNameA = `${a.lastName} ${a.firstName} ${a.middleName}`;
        const fullNameB = `${b.lastName} ${b.firstName} ${b.middleName}`;

        return sortOrder === 'asc' ? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);
      } else if (sortColumn === 'date') {
        const getDateValue = (dateString: string | undefined) => {
          if (!dateString) {
            return sortOrder === 'asc' ? Infinity : -Infinity;
          }

          const [day, month, year] = dateString.split('.');
          return new Date(`${year}-${month}-${day}`).getTime();
        };

        const dateA = getDateValue(a.dateOfEnd);
        const dateB = getDateValue(b.dateOfEnd);

        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortColumn === 'status') {
        const statusA = a.statusId as TIprStatusType;
        const statusB = b.statusId as TIprStatusType;

        const statusOrderA = getStatusSortOrder(statusA);
        const statusOrderB = getStatusSortOrder(statusB);

        return sortOrder === 'asc'
          ? statusOrderA.localeCompare(statusOrderB)
          : statusOrderB.localeCompare(statusOrderA);
      }

      return 0;
    });
  }, [filteredData, sortColumn, sortOrder]);

  const onClickToDraft = () => {
    setModalCreate(!modalCreate);
    // navigate(`/service-iprs/ipr/${ipr_id2}`, { replace: true });
  };

  const handleOpenButtonClick = (idIpr: number, selectedUserId: number) => {
    //console.log('ID ИПР переданное из строчки таблицы', idIpr);
    //console.log('ID пользователя переданное из строчки таблицы', selectedUserId);
    try {
      navigate(`/service-iprs/ipr/${idIpr}`, {
        state: { location, selectedUserId },
      });
    } catch (error) {
      //console.error('Error during navigating:', error);
    }
  };

  //pagination
  const [page, setPage] = useState<number>(0);

  const perPage = 10; // Фиксированное количество строк на странице
  const handlePageChange = (pageIndex: number) => setPage(pageIndex);
  const pagesCount = Math.ceil(sortedAndFilteredData.length / perPage);
  const currentPageData = sortedAndFilteredData.slice(page * perPage, (page + 1) * perPage);

  //--------------------------------------------PopOver---------------------------------------
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleMoreButtonClick = (rowIndex: number) => {
    setActiveRowIndex(rowIndex === activeRowIndex ? null : rowIndex);
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActiveRowIndex(null);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [popoverRef, setActiveRowIndex]);

  //--------------------------------------------DELETE IPR--------------------------------------
  const onClickToDelete = (idIprtoDelete: number) => {
    // console.log('onClickToDelete ID', idIprtoDelete);
    setDeletingItemId(idIprtoDelete);
    setModalDelete(!modalDelete);
  };

  const handleDelete = async (id: number | null) => {
    //console.log('id to delete', id);

    if (id) {
      // Вызываем функцию удаления из редьюсера, передавая id IPR
      await dispatch(deleteIprById(id));
      // После успешного удаления выполняем запрос данных
      dispatch(getManagerIprsList());
    }

    // Сбрасываем состояние deletingItemId после удаления
    setDeletingItemId(null);
  };

  //-----------------------------------------CREATE IPR-------------------------------------------
  const onClickToCreate = (userId: number) => {
    //console.log('onClickToCreate ID', userId);
    setCreatingIprUserId(userId);
    setModalCreate(!modalCreate);
  };

  const handleCreate = async (userId: number) => {
    // console.log('create IPR USer Id', userId);

    if (userId) {
      await dispatch(createIpr(userId));
      dispatch(getManagerIprsList());
    }

    setCreatingIprUserId(null);
  };

  return (
    <>
      <Table
        className={styles.table}
        wrapper={false}
        pagination={
          <Table.Pagination
            perPage={perPage}
            currentPageIndex={page}
            pagesCount={pagesCount}
            onPageChange={handlePageChange}
            hidePerPageSelect={true}
          />
        }
      >
        <Table.THead>
          <Table.THeadCell>
            <div className={styles.sortBtn}>
              <span>Сотрудник</span>
              <ListDefaultSIcon className={styles.sortIcon} onClick={() => handleSort('name')} />
            </div>
          </Table.THeadCell>
          <Table.THeadCell>Цель</Table.THeadCell>
          <Table.THeadCell>
            <div className={styles.sortBtn}>
              <span>Дата</span>
              <ListDefaultSIcon className={styles.sortIcon} onClick={() => handleSort('date')} />
            </div>
          </Table.THeadCell>
          <Table.THeadCell>Прогресс</Table.THeadCell>
          <Table.THeadCell>
            <div className={styles.sortBtn}>
              <span>Статус</span>
              <ListDefaultSIcon className={styles.sortIcon} onClick={() => handleSort('status')} />
            </div>
          </Table.THeadCell>
          <Table.THeadCell title="Пустая"></Table.THeadCell>
          <Table.THeadCell title="Пустая"></Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {currentPageData && currentPageData.length > 0 ? (
            currentPageData.map(
              (
                {
                  id,
                  firstName,
                  lastName,
                  middleName,
                  imageUrl,
                  positionId,
                  goalId,
                  statusId,
                  taskCount,
                  taskCompleted,
                  iprId,
                  dateOfEnd,
                },
                rowIndex
              ) => {
                const progressPercent = (taskCompleted / taskCount) * 100;
                //  console.log('progressPercent', progressPercent);
                //TODO вставить в верстку аватарку
                return (
                  <Table.TRow key={id}>
                    <Table.TCell>
                      <Space size={2} align={'start'}>
                        <div
                          className={styles.tCell}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '300px',
                          }}
                        >
                          <img
                            src={imageUrl}
                            style={{
                              width: '40px',
                              height: '40px',
                            }}
                            alt="аватар"
                          ></img>
                          <div style={{ marginLeft: '10px', width: '250px' }}>
                            <Typography.Text view="primary-small" tag="div">
                              {`${lastName} ${firstName} ${middleName}`}
                            </Typography.Text>
                            <Typography.Text view="primary-small" color="secondary">
                              {getValueById(positionId, positionsLib)}
                            </Typography.Text>
                          </div>
                        </div>
                      </Space>
                    </Table.TCell>
                    <Table.TCell>
                      <div
                        className={styles.tCell}
                        style={{
                          width: '200px',
                        }}
                      >
                        {goalId ? getValueById(goalId, iprGoalsLib) : '—'}
                      </div>
                    </Table.TCell>
                    <Table.TCell>
                      <div className={styles.tCell} style={{ textAlign: 'center', width: '75' }}>
                        {dateOfEnd ? formatDateString(dateOfEnd) : '—'}
                      </div>
                    </Table.TCell>
                    <Table.TCell>
                      {taskCount ? (
                        <CircularProgressBar
                          value={progressPercent}
                          title={`${taskCompleted}/${taskCount}`}
                          size="s"
                          contentColor="primary"
                          className={styles.progressBar}
                        />
                      ) : (
                        <div style={{ textAlign: 'center' }} className={styles.tCell}>
                          —
                        </div>
                      )}
                    </Table.TCell>
                    <Table.TCell>
                      <div
                        className={styles.tCell}
                        style={{
                          width: '110px',
                        }}
                      >
                        <Status view="soft" color={getStatusColor(statusId)}>
                          {getValueById(statusId, iprStatusLib) || 'отсутвует'}
                        </Status>
                      </div>
                    </Table.TCell>
                    <Table.TCell>
                      <div className={styles.tBtn}>
                        {statusId === 'NO_IPR' ? (
                          <Button view="tertiary" size="xxs" onClick={() => onClickToCreate(id)}>
                            Создать
                          </Button>
                        ) : (
                          <Button view="tertiary" size="xxs" onClick={() => handleOpenButtonClick(iprId, id)}>
                            Открыть
                          </Button>
                        )}
                      </div>
                    </Table.TCell>
                    <Table.TCell>
                      <div className={styles.btnsWrapper}>
                        <div className={styles.tBtnDot}>
                          <Button view="ghost" onClick={() => handleMoreButtonClick(rowIndex)}>
                            <MoreMIcon style={{ fill: '#898889' }} />
                          </Button>
                        </div>
                        {activeRowIndex === rowIndex && (
                          <div className={styles.popoverButtons} ref={popoverRef}>
                            {statusId === 'DRAFT' ? (
                              <Button
                                className={styles.btnText}
                                view="ghost"
                                size="s"
                                onClick={() => onClickToDelete(iprId)}
                              >
                                Удалить
                              </Button>
                            ) : statusId === 'IN_PROGRESS' ? (
                              <Button
                                className={styles.btnText}
                                view="ghost"
                                size="s"
                                //onClick={() => onClickToDelete(iprId)}
                              >
                                Отменить
                              </Button>
                            ) : null}

                            <Button
                              className={styles.btnText}
                              view="ghost"
                              size="s"
                              onClick={() => {
                                navigate(`/service-iprs/myteam/history/${id}`); //TODO перейти на историю конкретного сотрудника
                              }}
                            >
                              История
                            </Button>
                          </div>
                        )}
                      </div>
                    </Table.TCell>
                  </Table.TRow>
                );
              }
            )
          ) : (
            <Table.TRow>
              <Table.TCell>Нет данных для отображения</Table.TCell>
            </Table.TRow>
          )}
        </Table.TBody>
      </Table>
      {modalCreate ? (
        <Modal
          title="Создать новый план развития"
          paragraph={'Вы можете создать черновик и вернуться к нему позже'}
          confirmButtonLabel={'Создать'}
          cancelButtonLabel={'Отмена'}
          onConfirm={() => handleCreate(Number(creatingIprUserId))}
        ></Modal>
      ) : (
        ''
      )}
      {modalDelete ? (
        <Modal
          title="Удаление плана развития"
          paragraph={'Вы действительно хотите удалить план развития?'}
          confirmButtonLabel={'Удалить'}
          cancelButtonLabel={'Отмена'}
          onConfirm={() => handleDelete(Number(deletingItemId))}
        ></Modal>
      ) : (
        ''
      )}
    </>
  );
};
