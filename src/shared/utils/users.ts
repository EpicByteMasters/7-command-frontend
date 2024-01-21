import head1 from '../../images/avatars/avatar_head1.png';
import head2 from '../../images/avatars/avatar_head2.png';
import employee1 from '../../images/avatars/avatar_employee1.png';
import employee2 from '../../images/avatars/avatar_employee2.png';
import mentor1 from '../../images/avatars/avatar_mentor1.png';
import mentor2 from '../../images/avatars/avatar_mentor2.png';

interface User {
	userName: string;
	position: string;
	pic: string;
	link: string;
}

const users: User[] = [
	{
		userName: 'Хорошёва Анна Викторовна',
		position: 'Руководитель 1',
		pic: head1,
		link: '/head',
	},
	{
		userName: 'Иванов Пётр Александрович',
		position: 'Руководитель 2',
		pic: head2,
		link: '/head',
	},
	{
		userName: 'Кириллов Константин Соломонович',
		position: 'Сотрудник 1',
		pic: employee1,
		link: '/employee',
	},
	{
		userName: 'Евсеев Антон Иванович',
		position: 'Сотрудник 2',
		pic: employee2,
		link: '/employee',
	},
	{
		userName: 'Чаевская Евгения Владимировна',
		position: 'Ментор 1',
		pic: mentor1,
		link: '/mentor',
	},
	{
		userName: 'Куприна Валентина Ивановна',
		position: 'Ментор 2',
		pic: mentor2,
		link: '/mentor',
	},
];

export default users;
