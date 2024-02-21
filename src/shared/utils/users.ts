import firstManager from '../../shared/images/avatars/avatar_head1.png';
import secondManager from '../../shared/images/avatars/avatar_head2.png';
import firstEmployee from '../../shared/images/avatars/avatar_employee1.png';
import secondEmployee from '../../shared/images/avatars/avatar_employee2.png';
import firstMentor from '../../shared/images/avatars/avatar_mentor1.png';
import secondMentor from '../../shared/images/avatars/avatar_mentor2.png';

export interface User {
  id: number;
  name: string;
  position: string;
  pic: string;
  role: string;
  email: string;
  password: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'Ратилайнен Михаил Хейнович',
    position: 'Руководитель',
    pic: firstManager,
    role: 'myteam',
    email: 'user4@example.com',
    password: 'string'
  },
  {
    id: 2,
    name: 'Лебедев Арсений Артемьевич',
    position: 'Руководитель',
    pic: secondManager,
    role: 'myteam',
    email: 'user5@example.com',
    password: 'string'
  },
  {
    id: 3,
    name: 'Кириллов Константин Соломонович',
    position: 'Сотрудник',
    pic: firstEmployee,
    role: 'my',
    email: 'user@example.com',
    password: 'string'
  },
  {
    id: 4,
    name: 'Евсеев Антон Иванович',
    position: 'Сотрудник',
    pic: secondEmployee,
    role: 'my',
    email: 'user2@example.com',
    password: 'string'
  },
  {
    id: 5,
    name: 'Мармелодова Софья Семеновна',
    position: 'Ментор',
    pic: firstMentor,
    role: 'mentor',
    email: 'user15@example.com',
    password: 'password'
  },
  {
    id: 6,
    name: 'Довлатов Сергей Донатович',
    position: 'Ментор',
    pic: secondMentor,
    role: 'mentor',
    email: 'user6@example.com',
    password: 'string'
  }
];

export default users;
