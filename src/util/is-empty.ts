/**
 * Проверка строки или массива на пустоту
 */
function isEmpty(value: string | Array<unknown>): boolean {
  return Boolean(value.length);
}

export default isEmpty;
