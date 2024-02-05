import styles from './opend-ipr.module.scss';
//-----------------------------------------------------------------------------
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
//-----------------------------------------------------------------------------
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
//-----------------------------------------------------------------------------
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { PageTitle } from '../../shared/page-title/page-title';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { Raiting } from '../../shared/rating/rating';
import { Tasks } from '../../entities/tasks/tasks';
import { Modal } from '../../entities/modal/modal';
//-----------------------------------------------------------------------------
import { getManagerIprsList, selectManagerList } from '../../store/reducers/managerIprSlice';
import { getMentorIprsList, selectMentorList } from '../../store/reducers/mentorIprSlice';
import {
  cancelIpr,
  completeIpr,
  deleteIprById,
  editIprForEmployee,
  editIprForSupervisor,
  getIprByIdByEmployee,
  getIprByIdBySupervisor,
  initialIprData,
  startIpr,
} from '../../store/reducers/iprSlice';
import { getFullName, getStatusColor } from '../../shared/utils/constants';

import type { ISaveDraftDTO } from '../../api/dto/save-draft.dto';

//-----------------------------------------------------------------------------

import { getUserById, setSelectedUser } from '../../store/reducers/userSlice';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
import { EmployeeRatingPicker } from '../employee-rating/employee-rating';
import IprStatusDoc from '../../type/ipr-status-name';
import { isCompletedIpr, isDraftIpr, isInProgressIpr, isNotCompletedIpr } from '../../util/ipr-status';
import { roleUrl } from '../../shared/utils/urls';
import type { IIprData } from '../../store/type/ipr-data';

// ----------------------------------------------------------------------------

const dummyIprData = initialIprData;

// ----------------------------------------------------------------------------

export const OpendIpr = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState('');

  const { selectedUserId } = location.state;
  const { id } = useParams<{ id: string }>(); //ID IPR
  const userData = useAppSelector((state) => state.user.user);
  const managerIprsList = useAppSelector(selectManagerList);
  const menteeIprList = useAppSelector(selectMentorList);

  const isLoadingIpr = useAppSelector((state) => state.ipr.isLoading);
  // const currentIpr = useAppSelector((state) => state.ipr.ipr);
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [isConclusion, setConclusion] = useState(false);
  // модальные окна
  const [modalDelete, setModalDelete] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

  const [modalCancel, setModalCancel] = useState(false);
  const [CancelItemId, setCancelItemId] = useState<number | null>(null);

  const [iprData, setIprData] = useState<IIprData>(dummyIprData);

  const taskValues = useAppSelector((state) => state.ipr.taskValues);
  const isLoadingIprs = useAppSelector((state) => state.iprs.isLoading);
  const isLoadingManagerIprs = useAppSelector((state) => state.managerIprs.isLoading);
  const isLoadingMentorIprs = useAppSelector((state) => state.mentorIprs.isLoading);
  const iprCurrentData = useAppSelector((state) => state.ipr.ipr);

  useEffect(() => {
    console.log({ iprCurrentData });

    if (!iprCurrentData) {
      return;
    }

    setIprData({ ...iprCurrentData });
  }, [iprCurrentData]);

  useEffect(() => {
    console.log({ iprData });
  }, [iprData]);

  useEffect(() => {
    dispatch(getUserById(selectedUserId));
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch, id]);

  // const updateLocalIpr = (update: Partial<ISaveDraftDTO>) => {
  //   setIprData({ ...iprData, ...update });
  // };

  // //ручка всех ИПР сотрудников рука
  // useEffect(() => {
  //   dispatch(getManagerIprsList());
  //   dispatch(getMentorIprsList());
  // }, [dispatch]);

  const getListMentorAndManager = async () => {
    return await Promise.all([dispatch(getManagerIprsList()), dispatch(getMentorIprsList())]);
  };

  const [isIprIdFoundInManagerList, setIsIprIdFoundInManagerList] = useState<boolean>();
  const [isIprIdFoundInMenteeList, setIsIprIdFoundInMenteeList] = useState<boolean>();

  useEffect(() => {
    getListMentorAndManager().then(() => {
      setIsIprIdFoundInManagerList(managerIprsList?.employees.some((employee) => employee.iprId === Number(id)));
      setIsIprIdFoundInMenteeList(menteeIprList?.employees.some((employee) => employee.iprId === Number(id)));
    });
  }, []);

  // нашли ИПР из рута в списке ИПР
  // const isIprIdFoundInManagerList = managerIprsList?.employees.some((employee) => employee.iprId === Number(id));
  // const isIprIdFoundInMenteeList = menteeIprList?.employees.some((employee) => employee.iprId === Number(id));

  let myCurrentRole;

  useEffect(() => {
    const fetchIprData = async () => {
      try {
        let iprDataResult;
        let myCurrentRole;
        console.log({ isIprIdFoundInManagerList, isIprIdFoundInMenteeList });

        if (isIprIdFoundInManagerList) {
          console.log('ручка рука');
          iprDataResult = await dispatch(getIprByIdBySupervisor(Number(id)) as any);
          myCurrentRole = 'manager';
          setIsManager(true);
          //console.log('MY CURRENT ROLE', myCurrentRole);
        } else if (isIprIdFoundInMenteeList) {
          console.log('ручка ментора');
          //TODO ментор с ошибкой 403 с сервера приходит
          iprDataResult = await dispatch(getIprByIdBySupervisor(Number(id)) as any);
          myCurrentRole = 'mentee';
          setIsMentor(true);
          // console.log('MY CURRENT ROLE', myCurrentRole);
        } else if (isIprIdFoundInManagerList !== undefined) {
          console.log('ручка работника');
          iprDataResult = await dispatch(getIprByIdByEmployee(Number(id)) as any);
          myCurrentRole = 'employee';
          setIsEmployee(true);
          // console.log('MY CURRENT ROLE', myCurrentRole);
        }

        if (iprDataResult.meta.requestStatus === 'fulfilled') {
          // console.log('Получили Ипр по id:', iprDataResult.payload);

          switch (myCurrentRole) {
            case 'employee':
              setPageTitle('Мой план развития');
              break;
            case 'manager':
              setPageTitle('План развития сотрудника');
              break;
            case 'mentee':
              setPageTitle('Менторство сотрудника');
              break;
            default:
              setPageTitle('Индивидуальный план развития');
          }
        } else {
          // console.error('Error during fetching IPRS data:', iprDataResult.payload);
        }
      } catch (error) {
        // console.error('Error during fetching user data:', error);
      }
    };

    fetchIprData();
  }, [dispatch, isIprIdFoundInManagerList, id]);

  // console.log('CURRENT IPR OPEND', iprCurrentData);
  //console.log('Current role', myCurrentRole);

  const handleDataSubmit = (goalData: any, taskData: any) => {
    // Здесь вы можете отправить оба набора данных на сервер
    // console.log('ТАСК ОВЕРВЬЮ Отправка данных на сервер из Tasks:', goalData);
    // console.log('ТАСК ОВЕРВЬЮ Отправка данных на сервер из AnotherComponent:', taskData);
  };

  // --------------------------------------------------------------------------
  //Обработчик удаления ИПР
  const onClickToDelete = (idIprtoDelete: number) => {
    //console.log('onClickToDelete ID', idIprtoDelete);
    setDeletingItemId(idIprtoDelete);
    setModalDelete(!modalDelete);
  };

  const handleDelete = async (idIpr: number | null) => {
    //console.log('id to delete', idIpr);
    if (idIpr) {
      await dispatch(deleteIprById(idIpr));

      dispatch(getManagerIprsList());
    }

    navigate(`${roleUrl[0].url}`);
    setDeletingItemId(null);
  };

  // --------------------------------------------------------------------------
  /**
   * Обработчик перевода ИПР в работу
   * Отправить на проверку, кнопка в задачах
   * @TODO: ПЕРЕВЕСИТЬ в задачи
   * {
  "goalId": "string",
  "competency": [
    "string"
  ],
  "specialtyId": "string",
  "mentorId": 0,
  "description": "string",
  "tasks": [
    {
      "name": "string",
      "description": "string",
      "closeDate": "2024-02-05",
      "supervisorComment": "string",
      "education": [
        0
      ],
      "iprId": 0,
      "comment": "string",
      "taskStatusId": "string",
      "id": 0
    }
  ],
  "supervisorComment": "string"
}
   */
  const onClickToStartIpr = async (id: number) => {
    //console.log('Старт в работу ЩЕЛК', id);
    //startIpr();
  };

  // --------------------------------------------------------------------------
  /**
   * Обработчик сохранения ИПР Сотрудником
   * @TODO: хочет инфу с полей
   */
  const onClickToEditIprByEmployee = async (id: number) => {
    //console.log('СОХРАНИТЬ Я Сотрудник ЩЕЛК');
    // console.log('idIprtoCancel', id);
    //editIprForEmployee();
  };

  // --------------------------------------------------------------------------
  /**
   * Обработчик редактирования ИПР Руководителем
   * @TODO: хочет инфу с полей
   */
  const onClickToEditIprByManager = async (id: number) => {
    // console.log('СОХРАНИТЬ Я Рук ЩЕЛК');
    // console.log('idIprtoCancel', id);
    //editIprForSupervisor();
  };

  // --------------------------------------------------------------------------
  /**
   * Обработчик сохранения ИПР руков
   * @TODO: кнопка сохранить в черновике   *
   * @TODO: хочет данные
   * @TODO: проброс данных
   * @TODO: данные можно взять из iprCurrentData   *
   */
  const onClickToSaveDraft = async (id: number) => {
    //console.log('СОХРАНИТЬ ЧЕРНОВИК ЩЕЛК');
    //console.log('idIprtoCancel', id);
  };

  // --------------------------------------------------------------------------
  /**
   * Обработчик отмены ИПР
   */
  const onClickToCancelIpr = (id: number) => {
    setCancelItemId(id);
    setModalCancel(!modalCancel);
  };

  const handleCancelIpr = async (id: number) => {
    if (id) {
      await dispatch(cancelIpr(id));
      dispatch(getManagerIprsList());
    }
    navigate(`${roleUrl[0].url}`);
  };
  // --------------------------------------------------------------------------
  /**
   *  Обработчик завершения ИПР
   * @TODO:Выставление оценки, стейт сохранить, пробросить
   */
  const onClickToEndIpr = () => {
    setConclusion(true);
  };

  return !isLoadingIprs && !isLoadingManagerIprs && !isLoadingMentorIprs ? (
    <div className={styles.generalFooterWrapper}>
      <div className={styles.generalFooterContainer}>
        <div className={styles.container}>
          <NavBarMini />
          <div>
            <div className={styles.titleContainer}>
              {/* Заголовок */}
              <PageTitle title={pageTitle} />
              {/* Статус */}
              {iprCurrentData?.status ? (
                <Status view="soft" color={getStatusColor(iprCurrentData?.status.id)}>
                  {iprCurrentData.status.name}
                </Status>
              ) : (
                ''
              )}
            </div>
            {/* инфа о пользователе */}
            {selectedUser && (isMentor || isManager) && (
              <div className={styles.employeeInfoCardWrapper}>
                <EmployeeInfoCard
                  name={getFullName(selectedUser)}
                  position={selectedUser.position.name}
                  avatar={selectedUser.imageUrl}
                />
              </div>
            )}

            {/* если подведение итогов кнопка, то рендерим экран Оценки */}
            {isConclusion ? (
              <EmployeeRatingPicker withBtn />
            ) : (
              <div className={styles.owerviewWrapper}>
                {/* кнопки */}
                {isEmployee && isInProgressIpr(iprCurrentData?.status.id) ? (
                  <div className={styles.buttonsWrapper}>
                    <Button
                      view="secondary"
                      size="s"
                      className={styles.buttonSave}
                      onClick={() => onClickToEditIprByEmployee(Number(iprCurrentData?.id))}
                    >
                      Сохранить
                    </Button>
                  </div>
                ) : isManager && isInProgressIpr(iprCurrentData?.status.id) ? (
                  <div className={styles.buttonsWrapper}>
                    <Button
                      view="secondary"
                      size="s"
                      className={styles.buttonSave}
                      onClick={() => onClickToEditIprByManager(Number(iprCurrentData?.id))}
                    >
                      Сохранить
                    </Button>
                    <Button view="primary" size="xs" className={styles.buttonSummary} onClick={() => onClickToEndIpr()}>
                      Подвести итоги
                    </Button>
                    <Button
                      view="tertiary"
                      size="s"
                      className={styles.buttonDiscard}
                      onClick={() => onClickToCancelIpr(Number(iprCurrentData?.id))}
                    >
                      Отменить
                    </Button>
                  </div>
                ) : isManager && isDraftIpr(iprCurrentData?.status.id) ? (
                  <div className={styles.buttonsWrapper}>
                    <Button
                      view="secondary"
                      size="s"
                      className={styles.buttonSave}
                      onClick={() => onClickToSaveDraft(Number(iprCurrentData?.id))}
                    >
                      Сохранить
                    </Button>
                    <Button
                      view="primary"
                      size="s"
                      className={styles.buttonSave}
                      onClick={() => onClickToStartIpr(Number(iprCurrentData?.id))}
                    >
                      Отправить в работу
                    </Button>
                    <Button
                      view="tertiary"
                      size="s"
                      className={styles.buttonDelete}
                      onClick={() => onClickToDelete(Number(iprCurrentData?.id))}
                    >
                      Удалить
                    </Button>
                  </div>
                ) : isMentor && isInProgressIpr(iprCurrentData?.status.id) ? (
                  <div className={styles.buttonsWrapper}>
                    <Button
                      view="secondary"
                      size="s"
                      className={styles.buttonSave}
                      onClick={() => onClickToSaveDraft(Number(iprCurrentData?.id))}
                    >
                      Сохранить
                    </Button>
                    <Button
                      view="primary"
                      size="s"
                      className={styles.buttonSend}
                      onClick={() => onClickToStartIpr(Number(iprCurrentData?.id))}
                    >
                      Отправить в работу
                    </Button>
                  </div>
                ) : null}
                {isEmployee &&
                (isCompletedIpr(iprCurrentData?.status.id) || isNotCompletedIpr(iprCurrentData?.status.id)) ? (
                  <Raiting
                    title="Оценка от руководителя"
                    ratingData={{
                      comment: iprCurrentData?.comment,
                      rating: iprCurrentData?.iprGrade,
                    }}
                    isDisabled
                  />
                ) : isManager &&
                  (isCompletedIpr(iprCurrentData?.status.id) || isNotCompletedIpr(iprCurrentData?.status.id)) ? (
                  <Raiting
                    title="Оценка выполнения"
                    ratingData={{
                      comment: iprCurrentData?.comment,
                      rating: iprCurrentData?.iprGrade,
                    }}
                    isDisabled
                  />
                ) : (
                  ''
                )}
                <div className={styles.taskOverviewWrapper}>
                  {iprCurrentData ? (
                    <TasksOverview
                      isExecutive={isManager}
                      iprStatus={iprCurrentData.status.id}
                      handleGoalValuesChange={handleDataSubmit}
                      iprCurrentData={isDraftIpr(iprCurrentData.status.id) ? dummyIprData : iprCurrentData}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className={styles.tasksWrapper}>
                  {iprCurrentData ? (
                    <Tasks
                      isEmployee={isEmployee}
                      handleTaskValuesChange={handleDataSubmit}
                      iprCurrentData={isDraftIpr(iprCurrentData?.status.id) ? dummyIprData : iprCurrentData}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.generalFooter}></div>
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
      {modalCancel ? (
        <Modal
          title="Отменить план развития?"
          paragraph={'После отмены план развития станет неактивным (нельзя будет внести изменения)'}
          confirmButtonLabel={'Да'}
          cancelButtonLabel={'Нет'}
          onConfirm={() => handleCancelIpr(Number(id))}
        ></Modal>
      ) : (
        ''
      )}
    </div>
  ) : (
    <div>Loading</div>
  );
};
