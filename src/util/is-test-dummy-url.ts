import { TEST_RESULT_DUMMY_URL } from '../const';

/** Проверка на тестовую ссылку результатов обучения */
const isTestResultDummyUrl = (url: string): boolean => url === TEST_RESULT_DUMMY_URL;

export default isTestResultDummyUrl;
