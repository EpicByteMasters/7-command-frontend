/**
 * Добавляем ноль в начало числа
 * @param value - Исходное число
 * @param length - Длина строки на выходе
 */
const leadingZero = (value: number, length = 2): string =>
	String(value).padStart(length, '0');

export default leadingZero;
