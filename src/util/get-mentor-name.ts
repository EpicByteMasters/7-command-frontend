import { IMentor } from '../store/reducers/iprSlice';

/** Получение полного имени ментора */
const getMentorName = (mentor: IMentor) => `${mentor.firstName} ${mentor.patronymic} ${mentor.surname}`;

export default getMentorName;
