// --------------------------------------------------------------------------
// Utils
// --------------------------------------------------------------------------
import type { OptionShape } from '@alfalab/core-components/select/typings';

import type { ICommonLibWithSkillType } from '../../store/reducers/libSlice';

import type { ICompetitionOption, OptionCompetitionShape } from './type';

import { isEmpty, leadingZero } from '../../util';

import { INPUT_TAG_DELIMETER } from './const';

/**
 * Форматирование даты под поле ввода
 * @param payload - Дата по частям
 * @param payload.year - Год
 * @param payload.month - Номер месяца
 * @param payload.day - Номер дня
 */
const formatDatetForInput = ({
	year,
	month,
	day,
}: {
	year: number;
	month: number;
	day: number;
}) => `${leadingZero(day)}.${leadingZero(month)}.${year}`;

/**
 * Начальное значение для поля ввода даты
 * @param date - Объект даты
 */
const getInitialDate = (date = new Date()) => {
	const [year, month, day] = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	];

	return formatDatetForInput({ year, month, day });
};

/**
 * Преобразовывем модель компетиций полученных по сети в совместимую с компонентом
 */
const adaptCompetency = (
	competency: ICommonLibWithSkillType
): ICompetitionOption => ({
	key: competency.id,
	content: competency.name,
	value: competency,
});

// Получаем разделённые значения из поля ввода
const getInputValues = (inputValue: string, delimeter = INPUT_TAG_DELIMETER) =>
	inputValue
		.trim()
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
const getCompetitionOptionName = (competenceOption: OptionCompetitionShape) =>
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

export {
	// getInitialDate,
	adaptCompetency,
	getInputValues,
	makeInputValue,
	getLastInputValue,
	isOptionMatch,
	isValidInputValue,
	getCompetitionOptionName,
	getInitialDate,
	formatDatetForInput,
};
