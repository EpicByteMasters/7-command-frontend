import { IUser } from '@/store/reducers/userSlice';

/** Получение полного имени пользователя, игнорируя отсутствие отчества */

const getFullName = (user: IUser): string => {
  const fullName = [user.surname, user.firstName, user.patronymic].filter(Boolean).join(' ');

  return fullName;
};

export default getFullName;
