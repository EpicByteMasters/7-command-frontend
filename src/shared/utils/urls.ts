//Важно! тут не меняется URL страницы, но отображение пользователю должно меняться.
interface roleUrlProps {
	id: number;
	name: string;
	url: string;
}
// Руты по ролям
export const roleUrl: roleUrlProps[] = [
	{ id: 1, name: 'myteam', url: '/service-iprs/myteam' }, // План развития сотрудников
	{ id: 2, name: 'my', url: '/service-iprs/my' }, // Мой план развития
	{ id: 3, name: 'mentor', url: '/service-iprs/mentor' }, //Менторство сотрудников
];

interface myTeamUrlProps {
	id: number;
	url: string;
	role: string;
}

// Руты по которым может ходить руководитель
export const myTeamUrl: myTeamUrlProps[] = [
	{ id: 1, role: 'myteam', url: '/service-iprs/myteam' }, // План развития сотрудников
	{ id: 2, role: 'myteam', url: '/service-iprs/myteam/history' }, // История ИПР сотрудника
	{ id: 3, role: 'myteam', url: '/service-iprs/ipr/:id' }, //Просмотра ИПР // Подведение итогов ИПР //Просмотра активного ИПР
	{ id: 4, role: 'main', url: '/' },
];

interface myUrlProps {
	id: number;
	url: string;
	role: string;
}

// Руты по которым может ходить сотурдник
export const myUrl: myUrlProps[] = [
	{ id: 1, role: 'my', url: '/service-iprs/my' }, // Мой план развития
	{ id: 2, role: 'my', url: '/service-iprs/ipr/:id' }, // Просмотр ИПР //Просмотра активного ИПР
	{ id: 3, role: 'main', url: '/' },
];

interface mentorUrlProps {
	id: number;
	url: string;
	role: string;
}
// Руты по которым может ходить ментор
export const mentorUrl: mentorUrlProps[] = [
	{ id: 1, role: 'my', url: '/service-iprs/mentor' }, // Менторство сотрудников
	{ id: 2, role: 'my', url: '/service-iprs/ipr/:id' }, //Просмотра активного ИПР //Подведение итогов ИПР
	{ id: 3, role: 'main', url: '/' },
];

interface accessUrlProps {
	id: number;
	url: string;
	role: string;
}

// Руты доступа
export const accessUrl: accessUrlProps[] = [
	{ id: 1, role: 'login', url: '/login' }, // Страница входа
	{ id: 2, role: 'logout', url: '/logout' }, // Запрос выхода
	{ id: 3, role: 'main', url: '/' }, // Главная
];
