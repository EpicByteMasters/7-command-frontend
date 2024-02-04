import styles from './leader-employees-list.module.scss';

import { useEffect, useState } from 'react';

import { Input } from '@alfalab/core-components/input';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { ChevronDownSIcon } from '@alfalab/icons-glyph/ChevronDownSIcon';
import { ChevronUpSIcon } from '@alfalab/icons-glyph/ChevronUpSIcon';
import { ExclamationCircleSIcon } from '@alfalab/icons-glyph/ExclamationCircleSIcon';

import NavBarMini from '../../entities/navbar-mini/navbar-mini';

import { LeadInfoBlock } from '../../entities/lead-info-block/lead-info-block';
import { PageTitle } from '../../shared/page-title/page-title';
import { EmployeesList } from '../../entities/employees-list/employees-list';
import { EmployeeGoalPlan } from '../../shared/utils/test-users';

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';

import { getManagerIprsList, selectManagerList } from '../../store/reducers/managerIprSlice';

import { selectCommonLibsIPRGoals, selectCommonLibsIPRStatus } from '../../store/reducers/libSlice';

const structureData = {
  title: 'Вовлеченность команды',
  items: [
    { subtitle: 'Размеры команды', number: 348 },
    { subtitle: 'Всего в работе', number: 60 },
    { subtitle: 'Соотношение', number: 15 },
  ],
};

const successData = {
  title: 'Успешность планов развития',
  items: [
    { subtitle: 'Выполненных', number: 85 },
    { subtitle: 'Не выполненных', number: 15 },
    { subtitle: 'Соотношение', number: 5 },
  ],
};

export const LeaderEmployeesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const managerIprsList = useAppSelector(selectManagerList);
  const iprStatusLib = useAppSelector(selectCommonLibsIPRStatus);
  const iprGoalsLib = useAppSelector(selectCommonLibsIPRGoals);

  useEffect(() => {
    dispatch(getManagerIprsList());
  }, [dispatch]);

  console.log('MANAGER_LIST_IPRS', managerIprsList);

  const [chevron, setChevron] = useState(false);
  const [chevron2, setChevron2] = useState(false);
  const [statusValue, setStatusValue] = useState<string>('');
  const [statusGoal, setGoalValue] = useState<string>('');

  const onClick = () => {
    setChevron(!chevron);
    setGoalValue('');
  };
  const onClick2 = () => {
    setChevron2(!chevron2);
    setStatusValue('');
  };
  //TODO шеврон закрывался по клику вне его без выбора
  return (
    <div className={styles.generalFooterWrapper}>
      <div className={styles.generalFooterContainer}>
        <div className={styles.container}>
          {/* <NavBarMini isExecutive={isExecutive} /> */}
          <NavBarMini />

          <div className={styles.wrapper}>
            <div className={styles.titleWrapper}>
              <PageTitle title="План развития сотрудников" />
              <ExclamationCircleSIcon fill={'#898889'} />
            </div>
            <div className={styles.dataWrapper}>
              <LeadInfoBlock data={structureData} />
              <LeadInfoBlock data={successData} />
            </div>
            <div className={styles.searchInputWrapper}>
              <Input
                size="s"
                colors="default"
                placeholder="Поиск по сотрудникам"
                className={styles.input}
                leftAddons={<MagnifierMIcon color="#898889" />}
                type="text"
                block={true}
              />
            </div>

            <div className={styles.filterTagsWrapper}>
              <div className={styles.dropdown1}>
                <button onClick={onClick} name="btnGoal" className={styles.dropbtn1}>
                  Цель
                  <div>{chevron ? <ChevronDownSIcon></ChevronDownSIcon> : <ChevronDownSIcon></ChevronDownSIcon>}</div>
                </button>
                {chevron ? (
                  <div className={styles.dropdownContent1}>
                    {chevron &&
                      iprGoalsLib.map((goal, key) => {
                        return (
                          <p
                            key={goal.id}
                            onClick={() => {
                              setGoalValue(goal.id);
                              setChevron(!chevron);
                            }}
                          >
                            {goal.name}
                          </p>
                        );
                      })}
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className={styles.dropdown2}>
                <button name="btnStatus" onClick={onClick2} className={styles.dropbtn2}>
                  Статус
                  <div>{chevron2 ? <ChevronDownSIcon></ChevronDownSIcon> : <ChevronDownSIcon></ChevronDownSIcon>}</div>
                </button>
                {chevron2 ? (
                  <div className={styles.dropdownContent2}>
                    {chevron2 &&
                      iprStatusLib.map((status, key) => {
                        return (
                          <p
                            key={status.id}
                            onClick={() => {
                              setStatusValue(status.id);
                              setChevron2(!chevron2);
                            }}
                          >
                            {status.name}
                          </p>
                        );
                      })}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <EmployeesList data={managerIprsList?.employees} status={statusValue} goal={statusGoal} />
          </div>
        </div>
      </div>
      <div className={styles.generalFooter}></div>
    </div>
  );
};
