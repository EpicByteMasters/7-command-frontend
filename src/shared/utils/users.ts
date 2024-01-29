import head1 from '../../images/avatars/avatar_head1.png';
import head2 from '../../images/avatars/avatar_head2.png';
import employee1 from '../../images/avatars/avatar_employee1.png';
import employee2 from '../../images/avatars/avatar_employee2.png';
import mentor1 from '../../images/avatars/avatar_mentor1.png';
import mentor2 from '../../images/avatars/avatar_mentor2.png';

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
		name: 'Хорошёва Анна Викторовна',
		position: 'Руководитель 1',
		pic: head1,
		role: 'myteam',
		email: 'user4@example.com',
		password: 'string',
	},
	{
		id: 2,
		name: 'Иванов Пётр Александрович',
		position: 'Руководитель 2',
		pic: head2,
		role: 'myteam',
		email: 'user5@example.com',
		password: 'string',
	},
	{
		id: 3,
		name: 'Кириллов Константин Соломонович',
		position: 'Сотрудник 1',
		pic: employee1,
		role: 'my',
		email: 'user@example.com',
		password: 'string',
	},
	{
		id: 4,
		name: 'Евсеев Антон Иванович',
		position: 'Сотрудник 2',
		pic: employee2,
		role: 'my',
		email: 'user2@example.com',
		password: 'string',
	},
	{
		id: 5,
		name: 'Чаевская Евгения Владимировна',
		position: 'Ментор 1',
		pic: mentor1,
		role: 'mentor',
		email: 'user1@example.com',
		password: 'string',
	},
	{
		id: 6,
		name: 'Куприна Валентина Ивановна',
		position: 'Ментор 2',
		pic: mentor2,
		role: 'mentor',
		email: 'user6@example.com',
		password: 'string',
	},
];

export default users;
