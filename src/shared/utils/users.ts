import head1 from '../../images/avatars/avatar_head1.png';
import head2 from '../../images/avatars/avatar_head2.png';
import employee1 from '../../images/avatars/avatar_employee1.png';
import employee2 from '../../images/avatars/avatar_employee2.png';
import mentor1 from '../../images/avatars/avatar_mentor2.png';
import mentor2 from '../../images/avatars/avatar_mentor1.png';
import { roleUrl } from './urls';

export interface User {
	id: number;
	name: string;
	position: string;
	pic: string;
	link: {};
	role: string;
	email: string;
	password: string;
}

const users: User[] = [
	{
		id: 1,
		name: 'Хорошёва Анна Викторовна',
		position: 'Руководитель 1',
		pic: head1,
		link: roleUrl[0].url,
		role: 'myteam',
		email: 'user@example.com',
		password: 'string',
	},
	{
		id: 2,
		name: 'Иванов Пётр Александрович',
		position: 'Руководитель 2',
		pic: head2,
		link: roleUrl[0].url,
		role: 'myteam',
		email: 'user2@example.com',
		password: 'string',
	},
	{
		id: 3,
		name: 'Кириллов Константин Соломонович',
		position: 'Сотрудник 1',
		pic: employee1,
		link: roleUrl[1].url,
		role: 'my',
		email: 'user3@example.com',
		password: 'string',
	},
	{
		id: 4,
		name: 'Евсеев Антон Иванович',
		position: 'Сотрудник 2',
		pic: employee2,
		link: roleUrl[1].url,
		role: 'my',
		email: 'user4@example.com',
		password: 'string',
	},
	{
		id: 5,
		name: 'Чаевская Евгения Владимировна',
		position: 'Ментор 1',
		pic: mentor1,
		link: roleUrl[2].url,
		role: 'mentor',
		email: 'user5@example.com',
		password: 'string',
	},
	{
		id: 6,
		name: 'Куприна Валентина Ивановна',
		position: 'Ментор 2',
		pic: mentor2,
		link: roleUrl[2].url,
		role: 'mentor',
		email: 'user6@example.com',
		password: 'string',
	},
];

export default users;
