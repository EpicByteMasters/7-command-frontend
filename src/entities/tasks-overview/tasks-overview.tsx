// --------------------------------------------------------------------------
// Import
// @TODO: @/ import resolve instead of like ../../
// --------------------------------------------------------------------------
import React, { FC, ChangeEvent, useState, useMemo, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

import type { OptionShape } from '@alfalab/core-components/select/typings';

// import type { ICommonLibWithSkillType } from '../../store/reducers/libSlice';

import type { ITasksObverviewProps, OptionCompetitionShape } from './type';

import type { ISaveDraftDTO } from '../../api/dto/save-draft.dto';

import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { Textarea } from '@alfalab/core-components/textarea';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { BaseOption } from '@alfalab/core-components/select/components/base-option';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import { isCompletedIpr, isDraftIpr, isInProgressIpr, isNotCompletedIpr } from '../../util/ipr-status';

import {
  selectCommonLibsIPRGoals,
  selectCommonLibsSpecialty,
  selectCommonLibsIPRCompetency,
} from '../../store/reducers/libSlice';

import { setTaskValues } from '../../store/reducers/iprSlice';

import { ICompetency, IIprData } from '../../store/type/ipr-data';

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
  getCompetitionOptionName,
  formatDateForInput,
  formatDate,
} from './utils';

import { getMentorName, adaptDateToClient, isEmpty } from '../../util';

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

const caseInsensitiveMatch = (source: string, target: string) => source.toLowerCase().includes(target.toLowerCase());

/**
 * TasksOverview component
 */
export const TasksOverview: FC<IProps> = ({ isExecutive, iprStatus, handleGoalValuesChange, iprCurrentData }) => {
  // Подключение БД данных по значениям инпутов
  const iprGoals = useAppSelector(selectCommonLibsIPRGoals);
  const specialty = useAppSelector(selectCommonLibsSpecialty);
  const iprCompetency = useAppSelector(selectCommonLibsIPRCompetency);

  // Константы из /utils/constants
  const optionsRole: OptionShape[] = role;
  const optionsGoal: OptionShape[] = goal;
  const optionsMentor: OptionShape[] = mentor;

  //console.groupCollapsed('TasksOverview');
  //console.log(iprCurrentData, 'DATA');
  //console.groupEnd();

  // Стейты
  const [multiple] = useState(true);
  const [shownChevron] = useState(true);

  const [valueGoal, setValueGoal] = useState<string>('');
  const [valueRole, setValueRole] = useState<string>('');
  const [valueMentor, setValueMentor] = useState<string>('');
  const [valueStartDate, setStartDate] = useState<string>('');
  const [valueEndDate, setEndDate] = useState<string>('');
  const [valueDescription, setValueDescription] = useState<string>('');
  const [valueComment, setValueComment] = useState<string>('');
  const [valueCompetence, setCompetenceValue] = useState<string>(' ');

  // Ошибки
  const [goalError, setGoalError] = useState<string>('');
  const [roleError, setRoleError] = useState<string>('');
  const [commentError, setCommentError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');

  // const !isFormEnabled = useMemo(() => {
  //   return !isExecutive || (!isInProgressIpr(iprStatus) && !isDraftIpr(iprStatus))
  // }, [isExecutive]);

  // useEffect(() => {
  //   updateLocalIpr({
  //     goalId: valueGoal,
  //   });
  // }, []);

  const isFormEnabled = useMemo(() => {
    return isExecutive && (isInProgressIpr(iprStatus) || isDraftIpr(iprStatus));
  }, [isExecutive]);

  const goalErrorMessage = useMemo(() => {
    if (!isFormEnabled) return '';
    if (isEmpty(valueGoal)) return 'Обязательное поле';
    return '';
  }, [valueGoal, isFormEnabled, iprCurrentData]);

  const roleErrorMessage = useMemo(() => {
    if (!isFormEnabled) return '';
    if (isEmpty(valueRole)) return 'Обязательное поле';
    return '';
  }, [valueRole, isFormEnabled, iprCurrentData]);

  const competenceErrorMessage = useMemo(() => {
    if (!isFormEnabled) return '';
    if (isEmpty(valueCompetence)) return 'Обязательное поле';
    return '';
  }, [valueCompetence, isFormEnabled, iprCurrentData]);

  // Заполняем данные из ипр
  useEffect(() => {
    const goalValue = iprCurrentData?.goal?.name || '';
    const roleValue = iprCurrentData?.specialty?.name || '';
    const descriptionValue = iprCurrentData?.description || '';
    const competenceValue = getCompetencyInitValues(iprCurrentData?.competency);
    const mentorValue = iprCurrentData?.mentor ? getMentorName(iprCurrentData.mentor) : '';
    const startDateValue = iprCurrentData?.createDate ? adaptDateToClient(iprCurrentData.createDate) : '';
    const endDateValue = iprCurrentData?.closeDate ? adaptDateToClient(iprCurrentData.closeDate) : '';

    setValueGoal(goalValue);
    setValueRole(roleValue);
    setValueMentor(mentorValue);
    setStartDate(startDateValue);
    setEndDate(endDateValue);
    setValueDescription(descriptionValue);
    setCompetenceValue(competenceValue);
  }, [iprCurrentData]);

  // --------------------------------------------------------------------------
  // Competence
  // --------------------------------------------------------------------------

  // Model
  // --------------------------------------------------------------------------

  // Computed
  // --------------------------------------------------------------------------

  /**
   * Вычисленные для компонента адаптированные опции компетенций
   * Обновляется после получения ответа от сервера
   */
  const competenceOptionList = useMemo<OptionCompetitionShape[]>(
    () => iprCompetency.map((competencyOption) => adaptCompetency(competencyOption)),
    [iprCompetency]
  );

  const competitionValueList = useMemo<string[]>(
    () => getInputValues(valueCompetence.toLowerCase()),
    [valueCompetence]
  );

  /** Выбранные опции */
  const selectedCompetenceOptions = useMemo<OptionCompetitionShape[]>(() => {
    //console.groupCollapsed('selectedCompetenceOptions');
    // console.log({ valueCompetence, competenceOptionList });
    // console.groupEnd();

    try {
      const filteredOptions = competenceOptionList.filter((competenceOption) => {
        if (typeof competenceOption.content !== 'string') {
          return false;
        }

        const isMatch = caseInsensitiveMatch(valueCompetence, competenceOption.content);

        // console.log({ isMatch });

        return isMatch;
      });

      // console.log({ valueCompetence, competenceOptionList, filteredOptions });

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
   * @param {Object} key - Ключ удаляеой опции
   */
  const deleteCompetenceTag = (key: string) => {
    // Оставляем все опции кроме удаляемой
    const filtered = selectedCompetenceOptions.filter((option) => option.key !== key);

    setCompetenceValue(makeInputValue(filtered.map((option) => getCompetitionOptionName(option))));
  };

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
      mentorId: iprCurrentData?.mentor?.id || -1,
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
    //console.log({ taskValues });
    // setTaskValues(taskValues);
    //handleGoalValuesChange(taskValues);
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
    const inputValue = event.target.value;

    setValueDescription(inputValue);
    handleCallback();
    setDescriptionError('');
  };

  const handleInputComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const inputValue = event.target.value;
    setCommentError('');
    // if (!inputValue) {
    //   setCommentError(requiredInputMessage('Комментарий '));
    //   return;
    // }
    // if (!isValidInputValue(validateInputDefaultPattern, inputValue)) {
    //   setCommentError(invalidInputMessage);
    //   return;
    // }
    // setValueComment(inputValue);
    // handleCallback();
    // setCommentError('');
  };

  const handleInputMentor = (event: ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => {
    setValueMentor(value);
    handleCallback();
  };

  // Обработка изменения инпутов
  const handleChangeGoal = ({ selected }: { selected: OptionShape | null }) => {
    setValueGoal('');

    if (!selected) {
      // setGoalError('Обязательное поле');
      setValueGoal('');
      return;
    }

    setValueGoal(selected.key);
    handleCallback();
  };

  // Обрабатываем изменение роли
  const handleChangeRole = ({ selected }: { selected: OptionShape | null }) => {
    if (!selected) {
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

  const handleChangeEndDate = (_: any, { value }: { value: string }) => {};

  // Обработка фильтры поиска значения
  const getFilteredGoals = (): OptionShape[] => {
    const isShowFiltered = valueGoal.length && optionsGoal.some(({ key }) => caseInsensitiveMatch(key, valueGoal));
    return isShowFiltered ? optionsGoal.filter(({ key }) => caseInsensitiveMatch(key, valueGoal)) : optionsGoal;
  };

  const getFilteredRoles = (): OptionShape[] => {
    const isShowFiltered = valueRole.length && optionsRole.some(({ key }) => caseInsensitiveMatch(key, valueRole));
    return isShowFiltered ? optionsRole.filter(({ key }) => caseInsensitiveMatch(key, valueRole)) : optionsRole;
  };

  const getFilteredMentor = (): OptionShape[] => {
    const isShowFiltered =
      valueMentor.length && optionsMentor.some(({ key }) => caseInsensitiveMatch(key, valueMentor));
    return isShowFiltered ? optionsMentor.filter(({ key }) => caseInsensitiveMatch(key, valueMentor)) : optionsMentor;
  };

  return (
    <fieldset className={styles2.blockWrapper}>
      <legend className={styles2.blockTitle} onClick={handleCallback}>
        Общее описание
      </legend>
      <div className={styles2.formBlock}>
        <div className={styles2.formRow}>
          <div style={{ width: 496 }}>
            <InputAutocomplete
              // error={goalErrorMessage}
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
              disabled={!isFormEnabled}
            ></InputAutocomplete>
          </div>
          <div style={{ width: 496 }}>
            <InputAutocomplete
              // error={roleErrorMessage}
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
              disabled={!isFormEnabled}
            ></InputAutocomplete>
          </div>
        </div>
        <div>
          <InputAutocomplete
            // error={competenceErrorMessage}
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
            disabled={!isFormEnabled}
          ></InputAutocomplete>
        </div>
        <div className={styles2.formRowTag}>
          {selectedCompetenceOptions.length
            ? selectedCompetenceOptions.map((competence) => {
                return (
                  <div key={competence.key} style={{ maxWidth: '319' }}>
                    <FilterTag
                      disabled={!isFormEnabled}
                      showClear={true}
                      size="xxs"
                      shape="rounded"
                      view="filled"
                      checked={true}
                      onClear={() => {
                        deleteCompetenceTag(competence.key);
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
              disabled={!isFormEnabled}
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
              value={valueStartDate}
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
              value={valueEndDate}
              onChange={handleChangeEndDate}
              picker={true}
              Calendar={CalendarDesktop}
              calendarProps={{
                selectorView: 'month-only',
              }}
              clear={true}
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
              disabled={!isFormEnabled}
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
                disabled={!isFormEnabled}
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
