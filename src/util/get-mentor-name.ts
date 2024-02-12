import type { IMentor } from '../shared/store/type/ipr-data';

/** Получение полного имени ментора */
const getMentorName = (mentor: IMentor) => `${mentor.firstName} ${mentor.patronymic} ${mentor.surname}`;

export default getMentorName;
