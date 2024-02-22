// Utils
import { ICommonLibWithSkillType } from 'src/shared/store/type/libraries';

import { isEmpty, leadingZero } from '../../util';

import { INPUT_TAG_DELIMETER } from './const';

import type { OptionShape } from '@alfalab/core-components/select/typings';

import type { ICompetitionOption, OptionCompetitionShape } from './type';

/**
 * Форматирование даты под поле ввода
 * @param payload - Дата по частям
 * @param payload.year - Год
 * @param payload.month - Номер месяца
 * @param payload.day - Номер дня
 */

const formatDateForInput = ({
  year,
  month,
  day
}: {
  year: number;
  month: number;
  day: number;
}) => {
  // console.log(`${leadingZero(day)}.${leadingZero(month)}.${year}`, 'DATE');
  return `${leadingZero(day)}.${leadingZero(month)}.${year}`;
};

/**
 * Начальное значение для поля ввода даты
 * @param date - Объект даты
 */
const getInitialDate = (date = new Date()) => {
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ];

  return formatDateForInput({ year, month, day });
};

/**
 * Преобразовывем модель компетиций полученных по сети в совместимую с компонентом
 */
const adaptCompetency = (
  competency: ICommonLibWithSkillType
): ICompetitionOption => ({
  key: competency.id,
  content: competency.name,
  value: competency
});

// Получаем разделённые значения из поля ввода
const getInputValues = (
  inputValue: string,
  delimeter = INPUT_TAG_DELIMETER
) =>
  inputValue
    .split(delimeter)
    .filter((value) => !isEmpty(value))
    .map((value) => value.trim());

// Собираем теги в строку как значение инпута
const makeInputValue = (
  inputValue: string[],
  delimeter = INPUT_TAG_DELIMETER
) => [...inputValue, ''].join(`${INPUT_TAG_DELIMETER} `);

// Получаем последнее введённое в поле значение
const getLastInputValue = (inputValues: string[]): string =>
  inputValues.length ? inputValues[inputValues.length - 1] : '';

/**
 * Получение совпадающей опции
 * @param option - опция компетиции
 * @param inputValue - значение инпута
 */
const isOptionMatch = (
  option: ICompetitionOption | OptionShape,
  inputValue: string
) => {
  if (
    typeof inputValue !== 'string' ||
    inputValue === '' ||
    typeof option.content !== 'string'
  ) {
    return false;
  }

  const inputValuePrepared = inputValue.toLowerCase();
  const optionValuePrepared = option.content.toLowerCase();

  return optionValuePrepared.includes(inputValuePrepared);
};

/**
 * Извлекаем отображаемое значение из опции
 * @param competenceOption - опция компетиции
 */
const getCompetitionOptionName = (
  competenceOption: OptionCompetitionShape
) =>
  (competenceOption.value?.name as string) ||
  (competenceOption.content as string) ||
  '';

// const matchOptionPropValue = (
// 	optionValue: string | unknown,
// 	inputValue: string
// ): boolean => (
// 	(typeof optionValue !== 'string')
// 		? false
// 		: optionValue
// 			.toLowerCase()
// 			.includes(inputValue.toLowerCase())
// )

// Валидация значения поля
const isValidInputValue = (pattern: RegExp, inputValue: string) =>
  pattern.test(inputValue);

const getMentor = (id: number) => {
  switch (id) {
    case 5:
      return 'Иванова Наталья Дмитриевна';
    case 4:
      return 'Евдокимов Сергей Семенович';
    case 2:
      return 'Писарев Сергей Витальевич';
    case 12:
      return 'Ленц Алекс Иванович';
    default:
      return '';
  }
};
function formatDate(inputDate: string): string {
  const [year, month, day] = inputDate.split('-');
  const formattedDate: string = `${day}.${month}.${year}`;
  return formattedDate;
}

export {
  formatDate,
  adaptCompetency,
  getInputValues,
  makeInputValue,
  getLastInputValue,
  isOptionMatch,
  isValidInputValue,
  getCompetitionOptionName,
  getInitialDate,
  formatDateForInput,
  getMentor
};
