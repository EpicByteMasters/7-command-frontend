// --------------------------------------------------------------------------
// Import
// @TODO: @/ import resolve instead of like ../../
// --------------------------------------------------------------------------
import React, { FC, ChangeEvent, useState, useMemo, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

import type { OptionShape } from '@alfalab/core-components/select/typings';

// import type { ICommonLibWithSkillType } from '../../store/reducers/libSlice';

import type { ITasksObverviewProps, OptionCompetitionShape } from './type';

import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { Textarea } from '@alfalab/core-components/textarea';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { BaseOption } from '@alfalab/core-components/select/components/base-option';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';

import {
  selectCommonLibsIPRGoals,
  selectCommonLibsSpecialty,
  selectCommonLibsIPRCompetency,
} from '../../store/reducers/libSlice';

import { ICompetency, IIprData, setTaskValues } from '../../store/reducers/iprSlice';

import { goal, mentor, role } from '../../shared/utils/constants';

import { useAppSelector } from '../../shared/hooks/redux';

// import styles from './tasks-overview.module.scss';
import styles2 from './tasks-overview-form.module.scss';

import avatarMentor from '../../images/avatars/avatar_mentor1.png';

import {
  getInitialDate,
  adaptCompetency,
  getInputValues,
  makeInputValue,
  getLastInputValue,
  isOptionMatch,
  isValidInputValue,
  // getCompetitionOptionName,
  formatDateForInput,
  formatDate,
} from './utils';

import { getMentorName } from '../../util';
import { isDraftIpr } from '../../util/ipr-status';

/** Сообщение о необходимости заполнения поля */
const requiredInputMessage = (inputName: string) => `${inputName} является обязательным для заполенния`;

/** Сообщение о невалидном значении в текстовом поле */
const invalidInputMessage = 'Допустимы только кириллические символы, числа, пробелы и точки с запятыми';

/** Стандарный паттерн валидации значения поля */
const validateInputDefaultPattern = /[а-я\d ,.]+/iu;

/**
 * Получение начального занчения поля ввода компетенций
 * @param competencyList - список компетенций
 */
const getCompetencyInitValues = (competencyList?: ICompetency[]) => {
  if (!competencyList) {
    return '';
  }

  return makeInputValue(competencyList.map((conpetence: ICompetency) => conpetence.competencyRel?.name));
};
interface IProps {
  isExecutive: boolean;
  iprStatus: string;
  handleGoalValuesChange: (goalData: any, taskData: any) => void;
  iprCurrentData: IIprData | null;
}

/**
 * TasksOverview component
 */
export const TasksOverview: FC<IProps> = ({
  isExecutive,
  iprStatus,
  handleGoalValuesChange,
  iprCurrentData,
}: ITasksObverviewProps) => {
  // Подключение БД данных по значениям инпутов
  const iprGoals = useAppSelector(selectCommonLibsIPRGoals);
  const specialty = useAppSelector(selectCommonLibsSpecialty);
  const iprCompetency = useAppSelector(selectCommonLibsIPRCompetency);

  // Константы из /utils/constants
  const optionsRole: OptionShape[] = role;
  const optionsGoal: OptionShape[] = goal;
  const optionsMentor: OptionShape[] = mentor;

  // Стейты
  const [multiple] = useState(true);
  const [shownChevron] = useState(true);

  const [valueGoal, setValueGoal] = useState<string>('');
  const [valueRole, setValueRole] = useState<string>('');
  const [valueMentor, setValueMentor] = useState<string>('');
  const [valueStartDate, setStartDate] = useState<string>(getInitialDate());
  const [valueEndDate, setEndDate] = useState<string>(getInitialDate());
  const [valueDescription, setValueDescription] = useState<string>('');
  const [valueComment, setValueComment] = useState<string>('');
  const [valueCompetence, setCompetenceValue] = useState<string>('');

  // Ошибки
  const [goalEerror, setGoalError] = useState<string>('');
  const [roleError, setRoleError] = useState<string>('');
  const [competenceError, setCompetenceError] = useState<string>('');
  const [commentError, setCommentError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');

  // Заполняем данные из ипр
  useEffect(() => {
    setValueGoal(iprCurrentData?.goal.name || '');
    setValueRole(iprCurrentData?.specialty.name || '');
    setValueMentor(iprCurrentData?.mentor ? getMentorName(iprCurrentData.mentor) : '');
    setStartDate(iprCurrentData?.createDate || '');
    setEndDate(iprCurrentData?.closeDate || '');
    setValueDescription(iprCurrentData?.description || '');
    setCompetenceValue(getCompetencyInitValues(iprCurrentData?.competency));
    // setValueComment(iprCurrentData?.comment || '')
  }, [iprCurrentData]);

  // --------------------------------------------------------------------------
  // Competence
  // --------------------------------------------------------------------------

  // Model
  // --------------------------------------------------------------------------

  // const [valueCompetence, setValueCompetence] = useState<string>(
  // 	isExecutive
  // 		? 'Знания продуктовой аналитики2, продуктовых исследований, UI/UX, Ведение бэклога, Запуск новых фичей, Оценивать влияние запуска фичи на ключевые метрики, Определять потребность клиентов, Искать решения проблем клиентов, Составление стратегии развития, Продуктовый маркетинг, Бюджетирование продукта, управление P&L, Анализ рынка и конкурентов'
  // 		: 'Ведение переговоров, Делегирование, Лидерство, Понимание бизнеса и структуры организации, Построение эффективных процессов, Публичные выступления, Стратегическое мышление, Управление конфликтами'
  // );

  // Computed
  // --------------------------------------------------------------------------
  // console.log(iprCurrentData, 'Data');
  /**
   * Вычисленные для компонента адаптированные опции компетенций
   * Обновляется после получения ответа от сервера
   */
  const competenceOptionList = useMemo<OptionCompetitionShape[]>(
    () => iprCompetency.map((competencyOption) => adaptCompetency(competencyOption)),
    [iprCompetency]
  );

  /**
   * Выбранные опции
   */
  const selectedCompetenceOptions = useMemo<OptionCompetitionShape[]>(() => {
    try {
      const inputValueList = getInputValues(valueCompetence.toLowerCase());

      const filteredOptions = competenceOptionList.filter((competenceOption) => {
        if (typeof competenceOption.content !== 'string') {
          return false;
        }

        const isValueContainsOption = inputValueList.includes(competenceOption.content.toLowerCase());

        return isValueContainsOption;
      });

      console.log('kek', valueCompetence.split(','));

      console.log({ valueCompetence, inputValueList, filteredOptions }, 'DAT');

      return filteredOptions;
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [valueCompetence, competenceOptionList]);

  /**
   * Список идентификаторов выбранных компетиций
   */
  const selectedCompetenceIdList = useMemo<string[]>(() => {
    try {
      return selectedCompetenceOptions.map((option) => option.value?.id as string);
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [selectedCompetenceOptions]);

  /**
   * Отфильтрованные компетиции, включая выбранные
   */
  const competenceFilteredOptionList = useMemo<OptionCompetitionShape[]>(() => {
    const isLessOrEqValues = getInputValues(valueCompetence).length <= selectedCompetenceOptions.length;

    const isShowAllOptions = valueCompetence === '' || isLessOrEqValues;

    if (isShowAllOptions) {
      return competenceOptionList;
    }

    return competenceOptionList.filter((option) =>
      isOptionMatch(option, getLastInputValue(getInputValues(valueCompetence)))
    );
  }, [valueCompetence, selectedCompetenceOptions, competenceOptionList]);

  // Methods
  // --------------------------------------------------------------------------

  /**
   * Отмена выбора через тег
   * @param {Object} competenceOption - Значение поля ввода
   */
  // const clearCompetenceTag = (competenceOption: OptionCompetitionShape) => {
  //   // Оставляем все опции кроме удаляемой
  //   const filtered = selectedCompetenceOptions.filter((option) => option.key !== competenceOption.key);

  //   setCompetenceValue(makeInputValue(filtered.map((option) => getCompetitionOptionName(option))));
  // };

  /**
   * Валидация поля при изменениях
   * @param {Object} value - Значение поля ввода
   */
  const validateCompetence = (value: string) => {
    let errorList: string[] = [];

    setCompetenceValue(value);

    if (value === '') {
      errorList.push('Обязательное поле');
    }

    if (!isValidInputValue(validateInputDefaultPattern, value)) {
      errorList.push(invalidInputMessage);
    }

    return errorList;
  };

  /**
   * Обработчик ввода в поле компетенции
   * @param {Object} event - Событие при вводе / вставке в поле
   */
  const onCompetenceInput = (event: ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => {
    setCompetenceValue(value);

    const errList = validateCompetence(value);

    if (errList.length) {
      setCompetenceError(errList[0]);
      return;
    }

    setCompetenceError('');

    handleCallback();
  };

  /**
   * Обработчик выбора компетенции в списке
   * @param {Object} payload
   * @param {Object} payload.selectedMultiple - Выбранные значения
   */
  const onCompetenceChange = ({ selectedMultiple }: { selectedMultiple: OptionCompetitionShape[] }) => {
    const value = selectedMultiple.length
      ? `${selectedMultiple.map((option) => option?.value?.name || option.content).join(', ')}, `
      : '';

    setCompetenceValue(value);

    const errList = validateCompetence(value);

    if (errList.length) {
      setCompetenceError(errList[0]);
      return;
    }

    setCompetenceError('');

    handleCallback();
  };

  // Поиск id Цели
  const goalId: string | undefined = iprGoals.find((o) => o.name === valueGoal)?.id;

  // Поиск id Роли
  const roleId: string | undefined = specialty.find((o) => o.name === valueRole)?.id;

  // @TODO: заменить на реализацию с useMemo
  const taskValues = useMemo(
    () => ({
      goal: goalId,
      specialty: roleId,
      competence: selectedCompetenceIdList,
      createDate: valueStartDate,
      closeDate: valueEndDate,
      mentorId: iprCurrentData?.mentor.id || -1,
      description: valueDescription,
      comment: valueComment,
      iprStatus: iprStatus,
    }),
    [
      selectedCompetenceIdList,
      goalId,
      roleId,
      valueDescription,
      valueComment,
      iprStatus,
      valueStartDate,
      valueEndDate,
      iprCurrentData,
    ]
  );

  const handleCallback = () => {
    console.log({ taskValues });

    setTaskValues(taskValues);

    handleGoalValuesChange(taskValues);
  };

  // const [modalOpen, setModalOpen] = useState(false);

  // Обработка инпутов
  const handleInputGoal = (event: ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => {
    setValueGoal(value);
    handleCallback();
  };

  const handleInputRole = (event: ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => {
    setValueRole(value);
    handleCallback();
  };

  const handleInputDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const inputValue = event.target.value;

    setDescriptionError('');

    if (!inputValue) {
      setDescriptionError(requiredInputMessage('Поле описания'));
      return;
    }

    if (!isValidInputValue(validateInputDefaultPattern, inputValue)) {
      setDescriptionError(invalidInputMessage);
      return;
    }

    setValueDescription(inputValue);
    handleCallback();
  };

  const handleInputComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const inputValue = event.target.value;

    setCommentError('');

    if (!inputValue) {
      setCommentError(requiredInputMessage('Комментарий '));
      return;
    }

    if (!isValidInputValue(validateInputDefaultPattern, inputValue)) {
      setCommentError(invalidInputMessage);
      return;
    }

    setValueComment(inputValue);
    handleCallback();
  };

  const handleInputMentor = (event: ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => {
    setValueMentor(value);
    handleCallback();
  };

  // Обработка изменения инпутов
  const handleChangeGoal = ({ selected }: { selected: OptionShape | null }) => {
    setValueGoal('');

    if (!selected) {
      setGoalError('Обязательное поле');
      setValueGoal('');
      return;
    }

    setValueGoal(selected.key);
    handleCallback();
  };

  // Обрабатываем изменение роли
  const handleChangeRole = ({ selected }: { selected: OptionShape | null }) => {
    setRoleError('');

    if (!selected) {
      setRoleError('Обязательное поле');
      setValueRole('');
      return;
    }

    setValueRole(selected.key);
    handleCallback();
  };

  // Обрабатываем изменение наставника
  const handleChangeMentor = ({ selected }: { selected: OptionShape | null }) => {
    setValueMentor(selected ? selected.key : '');
    handleCallback();
  };

  const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => {
    // setStartDate(value);
    var d = new Date(Date.now()).toLocaleString().split(',')[0];
    d.toString();
    setStartDate(d);
  };

  const handleChangeEndDate = (event: React.ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => {
    setEndDate(value);
  };

  // Обработка фильтры поиска значения
  const getFilteredGoals = (): OptionShape[] =>
    optionsGoal.some(({ key }) => key === valueGoal)
      ? optionsGoal
      : optionsGoal.filter((option) => isOptionMatch(option, valueGoal));

  const getFilteredRoles = (): OptionShape[] =>
    optionsRole.some(({ key }) => key === valueRole)
      ? optionsRole
      : optionsRole.filter((option) => isOptionMatch(option, valueRole));

  const getFilteredMentor = (): OptionShape[] =>
    optionsMentor.some(({ key }) => key === valueMentor)
      ? optionsMentor
      : optionsMentor.filter((option) => isOptionMatch(option, valueMentor));

  // Обработка вывода тагов
  // const valueTags = getCompetencyInitValues(iprCurrentData?.competency);
  // const valueTagArr = Array.from(valueTags.split(',').filter((item) => item.length > 1));

  return (
    <fieldset className={styles2.blockWrapper}>
      <legend className={styles2.blockTitle} onClick={handleCallback}>
        Общее описание
      </legend>
      <div className={styles2.formBlock}>
        <div className={styles2.formRow}>
          <div style={{ width: 496 }}>
            <InputAutocomplete
              error={goalEerror}
              name="goal"
              block={true}
              closeOnSelect={true}
              className="inputGoal"
              size="s"
              options={getFilteredGoals()}
              label="Цель *"
              placeholder="Начните вводить название"
              onChange={handleChangeGoal}
              onInput={handleInputGoal}
              Arrow={shownChevron ? Arrow : null}
              value={valueGoal}
              allowUnselect={true}
              showEmptyOptionsList={true}
              inputProps={{
                onClear: () => setValueGoal(''),
                clear: true,
              }}
              disabled={isExecutive ? false : true}
            ></InputAutocomplete>
          </div>
          <div style={{ width: 496 }}>
            <InputAutocomplete
              error={roleError}
              name="role"
              block={true}
              closeOnSelect={true}
              className="inputRole"
              size="s"
              options={getFilteredRoles()}
              label="Специализация *"
              placeholder="Начните вводить название"
              onChange={handleChangeRole}
              onInput={handleInputRole}
              Arrow={shownChevron ? Arrow : null}
              value={valueRole}
              allowUnselect={true}
              inputProps={{
                onClear: () => setValueRole(''),
                clear: true,
              }}
              disabled={isExecutive ? false : true}
            ></InputAutocomplete>
          </div>
        </div>
        <div>
          <InputAutocomplete
            error={competenceError}
            name="competence"
            value={valueCompetence}
            selected={selectedCompetenceOptions}
            options={competenceFilteredOptionList}
            Option={BaseOption}
            block={true}
            multiple={multiple}
            allowUnselect={true}
            closeOnSelect={true}
            showEmptyOptionsList={true}
            onChange={onCompetenceChange}
            onInput={onCompetenceInput}
            Arrow={shownChevron ? Arrow : undefined}
            inputProps={{
              onClear: () => setCompetenceValue(''),
              clear: true,
            }}
            className={styles2.inputCompetence}
            size="s"
            label="Компетенция *"
            placeholder="Начните вводить название"
            disabled={isExecutive ? false : true}
          ></InputAutocomplete>
        </div>
        <div className={styles2.formRowTag}>
          {selectedCompetenceOptions.length
            ? selectedCompetenceOptions.map((competence) => {
                return (
                  <div key={competence.key} style={{ maxWidth: '319' }}>
                    <FilterTag
                      disabled={isExecutive ? false : true}
                      showClear={true}
                      size="xxs"
                      shape="rounded"
                      view="filled"
                      checked={true}
                      onClear={() => {
                        // clearCompetenceTag();
                        // setValueTag([]);
                      }}
                    >
                      {competence.content}
                    </FilterTag>
                  </div>
                );
              })
            : ''}
        </div>
        <div className={styles2.formRow}>
          <div>
            <InputAutocomplete
              name="mentor"
              block={true}
              closeOnSelect={true}
              className={styles2.inputMentor}
              size="s"
              options={getFilteredMentor()}
              label="Ментор"
              placeholder="Начните вводить название"
              onChange={handleChangeMentor}
              onInput={handleInputMentor}
              Arrow={shownChevron ? Arrow : undefined}
              value={valueMentor}
              allowUnselect={true}
              inputProps={{
                onClear: () => setValueMentor(''),
                clear: true,
              }}
              disabled={isExecutive ? false : true}
            ></InputAutocomplete>

            {!isExecutive && isDraftIpr(iprStatus) ? (
              <img className={styles2.avatarMentor} src={avatarMentor} alt="avatar"></img>
            ) : (
              ''
            )}
          </div>

          <div style={{ width: 236 }}>
            <UniversalDateInput
              name="startDate"
              block={true}
              view="date"
              label="Дата создания"
              size="s"
              value={isExecutive ? valueStartDate : formatDate(valueStartDate)}
              onChange={handleChangeStartDate}
              picker={true}
              Calendar={CalendarDesktop}
              calendarProps={{
                selectorView: 'month-only',
              }}
              clear={true}
              onClear={(e) => {
                e.stopPropagation();
                setStartDate('');
              }}
              disabled={true}
            />
          </div>
          <div style={{ width: 236 }}>
            <UniversalDateInput
              name="endDate"
              block={true}
              view="date"
              label="Дата завершения"
              size="s"
              value={isExecutive ? '' : formatDate(valueEndDate)}
              // onChange={handleChange}
              onChange={handleChangeEndDate}
              picker={true}
              Calendar={CalendarDesktop}
              calendarProps={{
                selectorView: 'month-only',
              }}
              clear={true}
              onClear={(e) => {
                e.stopPropagation();
                setEndDate('');
              }}
              disabled={true}
            />
          </div>
          <div
            style={{
              width: 1016,
            }}
          >
            <Textarea
              error={descriptionError}
              name="description"
              value={valueDescription}
              onChange={handleInputDescription}
              fieldClassName={styles2.textClass}
              maxHeight={91}
              label="Описание"
              labelView="inner"
              size="m"
              block={true}
              minLength={0}
              maxLength={96}
              showCounter={true}
              autosize={true}
              disabled={isExecutive ? false : true}
            />
          </div>
          <div
            style={{
              width: 1016,
            }}
          >
            {isExecutive ? (
              <Textarea
                error={commentError}
                name="comment"
                onChange={handleInputComment}
                fieldClassName={styles2.textClass}
                maxHeight={91}
                label="Комментарий (виден только вам)"
                labelView="inner"
                size="m"
                block={true}
                minLength={0}
                maxLength={96}
                showCounter={true}
                autosize={true}
                disabled={isExecutive ? false : true}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </fieldset>
  );
};
