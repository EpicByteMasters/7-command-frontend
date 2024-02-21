//Важно! тут не меняется URL страницы, но отображение пользователю должно меняться.
interface roleUrlProps {
  id: number;
  name: string;
  url: string;
}
// Руты по ролям
export const roleUrl: roleUrlProps[] = [
  { id: 1, name: 'myteam', url: '/service-iprs/myteam' },
  { id: 2, name: 'my', url: '/service-iprs/my' },
  { id: 3, name: 'mentor', url: '/service-iprs/mentor' }
];

interface myTeamUrlProps {
  id: number;
  url: string;
  role: string;
}

// Руты по которым может ходить руководитель
export const myTeamUrl: myTeamUrlProps[] = [
  { id: 1, role: 'myteam', url: '/service-iprs/myteam' },
  { id: 2, role: 'myteam', url: '/service-iprs/myteam/history' },
  { id: 3, role: 'myteam', url: '/service-iprs/ipr/:id' },
  { id: 4, role: 'main', url: '/' }
];

interface myUrlProps {
  id: number;
  url: string;
  role: string;
}

// Руты по которым может ходить сотурдник
export const myUrl: myUrlProps[] = [
  { id: 1, role: 'my', url: '/service-iprs/my' },
  { id: 2, role: 'my', url: '/service-iprs/ipr/:id' },
  { id: 3, role: 'main', url: '/' }
];

interface mentorUrlProps {
  id: number;
  url: string;
  role: string;
}
// Руты по которым может ходить ментор
export const mentorUrl: mentorUrlProps[] = [
  { id: 1, role: 'my', url: '/service-iprs/mentor' },
  { id: 2, role: 'my', url: '/service-iprs/ipr/:id' },
  { id: 3, role: 'main', url: '/' }
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
  { id: 4, role: 'main2', url: '/main' } // Главная - тест
];
