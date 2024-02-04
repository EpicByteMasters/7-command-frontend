import type { ICoursesOption } from './type';

import { MONTH_FULL_NAME_LIST, PICKER_OPTIONS } from './const';

// shared

/**
 * Получение последнего элемента массива
 */
const getArrLastEl = <T>(arr: T[]): T | null => arr[arr.length - 1] || null;

function formatDateToCustomFormat(dateString?: string) {
  console.log('dateString: ', dateString);

  if (!dateString) {
    return '';
  }

  const [year, month, day] = dateString.split('-').map(Number);

  const formattedDate = `${day} ${getArrLastEl(MONTH_FULL_NAME_LIST)}`;

  return `до ${formattedDate}`;
}

// Local Course

/**
 * Фильтр выбранных опций
 * @param option - Опция курса или тренина
 * @param inputValues - Массив вводимых
 */
const isCourseSelectedOption = (option: ICoursesOption, inputValues: string[]) =>
  inputValues.includes(option.value.name);

/** Поиск опции, значение которой содержит подстроку с вводимым в поле ввода */
function matchCourseOption(option: ICoursesOption, inputValue: string) {
  return option.value.name.toLowerCase().includes(inputValue.toLowerCase());
}

/** Проверка на то что опция была выбрана */
const isCourseFilteredOption = (optionsSelected: ICoursesOption[], option: ICoursesOption, inputValue: string | null) =>
  optionsSelected.includes(option) || (inputValue && matchCourseOption(option, inputValue));

export { getArrLastEl, isCourseSelectedOption, isCourseFilteredOption, formatDateToCustomFormat };
