import { IUser } from '../../store/reducers/userSlice';

/* eslint-disable no-useless-escape */
export const BASE_URL = 'https://granpri.ru';
//export const BASE_URL = 'http://213.171.6.128:81';

export const username = 'user4@example.com';
export const password = 'string';

export const courses = [
  { key: 'Подготовка к IELTS' },
  { key: 'Профессиональный английский' },
  { key: 'Python-разработчик' },
  { key: 'Python-разработчик плюс' },
  { key: 'Fullstack-разработчик на Python' },
  { key: 'Тестировщик' },
  { key: 'Java-разработчик (Самостоятельный)' },
  { key: 'Инженер по тестированию' },
  { key: 'Фронтенд-разработчик' },
  { key: 'Ручное тестирование' },
  { key: 'Специалист по информационной безопасности' },
  { key: 'Аналитик данных' },
  { key: 'Аналитик данных плюс' },
  { key: 'Разработчик на C++' },
  { key: 'Тестировщик на Python' },
  { key: 'Go-разработчик' },
  { key: 'Специалист по Data Science' },
  { key: 'Специалист по Data Science плюс' },
  { key: 'Дизайнер интерфейсов' },
  { key: 'Системный аналитик' },
  { key: 'Бизнес-аналитик' },
  { key: 'Менеджер проектов' },
  { key: 'Менеджер проектов. Расширенный курс' },
  { key: 'Базовый курс «Управление командой»' },
  { key: 'Продакт-менеджер' },
  { key: 'Интернет-маркетолог' },
  { key: 'Трафик-менеджер' },
  { key: 'Продуктовый подход для дизайнеров' },
  { key: 'UX-исследования для дизайнеров' },
  { key: 'DevOps для эксплуатации и разработки' },
  { key: 'Математика для анализа данных' },
  { key: 'SQL для работы с данными и аналитики' },
  { key: 'React-разработчик' },
  { key: 'Критическое мышление' },
  { key: 'Финансовый менеджмент' },
  { key: 'Юнит-экономика' },
  { key: 'Навыки аргументации для руководителей' },
  { key: 'Инструменты начинающего руководителя' },
  { key: 'Руководитель отдела продаж' },
  { key: 'Психолог-консультант' },
  { key: 'Личная эффективность: ваш маршрут к цели' },
  { key: 'Тайм-менеджмент' },
  { key: 'Ораторское мастерство: от презентации до выступления' },
  { key: 'Инструменты начинающего руководителя' },
  { key: 'Мотивационные программы по работе с клиентом' },
  { key: 'Курсы управления стрессом' },
  { key: 'Основы эффективной коммуникации' },
  { key: 'Корпоративные хронофаги: найти и обезвредить' },
  { key: 'Мнемотехника. Развитие памяти: как запоминать легко?' },
  { key: 'Soft skills: ключевые навыки руководителя' },
  { key: 'Курс «Суперпамять»' },
  { key: 'Голос и речь: как говорить убедительно (Самостоятельный)' },
];

export interface Goal {
  id: number;
  goal: string;
  dateStart: string;
  dateEnd: string;
  statusText: string;
  statusColor?: 'green' | 'orange' | 'red' | 'blue' | 'grey' | 'teal' | 'purple' | undefined;
}

export const goalsData: Goal[] = [
  {
    id: 1,
    goal: 'Развитие софт-скиллов',
    dateStart: '15.01.2024',
    dateEnd: '25.12.2024',
    statusText: 'в работе',
    statusColor: 'blue',
  },
  {
    id: 2,
    goal: 'Повышение грейда',
    dateStart: '20.01.2023',
    dateEnd: '20.01.2023',
    statusText: 'отменен',
    statusColor: 'orange',
  },
  {
    id: 3,
    goal: 'Получение нового опыта',
    dateStart: '16.01.2022',
    dateEnd: '25.12.2022',
    statusText: 'не выполнен',
    statusColor: 'red',
  },
  {
    id: 4,
    goal: 'Смена команды',
    dateStart: '12.01.2021',
    dateEnd: '25.12.2021',
    statusText: 'выполнен',
    statusColor: 'green',
  },
  {
    id: 5,
    goal: 'Соответствие занимаемой должности',
    dateStart: '23.01.2020',
    dateEnd: '25.12.2020',
    statusText: 'выполнен',
    statusColor: 'green',
  },
];

export interface Task {
  id: number;
  title: string;
  deadline: string;
  progress: number;
  statusText: string;
  statusColor?: 'green' | 'orange' | 'red' | 'blue' | 'grey' | 'teal' | 'purple' | undefined;
  closeButton?: boolean | undefined;
}

export const tasksData: Task[] = [
  {
    id: 1,
    title: 'Изучение английского языка до С1',
    deadline: '15.01.2024',
    progress: 0,
    statusText: 'в работе',
    statusColor: 'blue',
  },
  {
    id: 2,
    title: 'Менторинг новых сотрудников',
    deadline: '20.01.2023',
    progress: 40,
    statusText: 'отменен',
    statusColor: 'orange',
  },
  {
    id: 3,
    title: 'Получение нового опыта',
    deadline: '16.01.2022',
    progress: 40,
    statusText: 'не выполнен',
    statusColor: 'red',
  },
  {
    id: 4,
    title: 'Смена команды',
    deadline: '12.01.2021',
    progress: 90,
    statusText: 'выполнен',
    statusColor: 'green',
  },
  {
    id: 5,
    title: 'Подготовка и выступление на конференции',
    deadline: '23.01.2020',
    progress: 100,
    statusText: 'выполнен',
    statusColor: 'green',
  },
];

export interface Education {
  name: string;
  url: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
}

export interface IPRTask {
  id: number;
  name: string;
  dateOfEnd: string;
  description: string;
  educations: Education[];
  commentOfEmployee: string;
  commentOfMentor: string;
  files: { name: string; url: string }[];
  status: 'IN_PROGRESS' | 'COMPLETED' | 'NOT_COMPLETED' | 'CANCELED';
}

const statusKeyMap = {
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Выполнен',
  NOT_COMPLETED: 'Не выполнен',
  CANCELED: 'Отменен',
};

export interface IPRGoal {
  id: number;
  goal: string;
  specialization: string;
  competence: string[];
  createdAt: string;
  dateOfEnd: string;
  mentorId: number | null;
  description: string;
  tasks: IPRTask[];
  status: keyof typeof statusKeyMap;
}

export const employeeIPRs: IPRGoal[] = [
  {
    id: 1,
    goal: 'SOFT_SKILLS',
    specialization: 'DEVELOPER',
    competence: ['ENGLISH'],
    createdAt: '12.01.2024',
    dateOfEnd: '31.12.2024',
    mentorId: null,
    description:
      'Улучшить знания технического английского языка до уровня свободного чтения и подготовки документации к ПО',
    tasks: [
      {
        id: 123123,
        name: 'Изучение английского языка',
        dateOfEnd: '31.12.2024',
        description:
          'Необходимо повысить уровень технического английского языка для свободного чтения и подготовки документации ПО',
        educations: [
          {
            name: 'Английский язык для разработчиков (продвинутый уровень)',
            url: 'https://alfapeople.alfabank.ru/educations/english_for_devs_advanced.mp4',
            status: 'COMPLETED',
          },
        ],
        commentOfEmployee: '',
        commentOfMentor: '',
        files: [
          {
            name: 'Сертификат о прохождении курса_Английский язык для разработчиков (продвинутый уровень)_Петров П.',
            url: 'https://user.imagestorage.ru/SertificatePetrov.img',
          },
        ],
        status: 'IN_PROGRESS',
      },
    ],
    status: 'IN_PROGRESS',
  },
];

export const goal = [
  { key: 'Карьерный рост' },
  { key: 'Повышение грейда' },
  { key: 'Соответствие занимаемой должности' },
  { key: 'Развитие софт-скиллов' },
  { key: 'Развитие хард-скиллов' },
  { key: 'Смена специализации' },
  { key: 'Смена команды' },
  { key: 'Получение нового опыта' },
];

export const role = [
  { key: 'Продакт-менеджер' },
  { key: 'Проджект-менеджер' },
  { key: 'Бизнес-аналитик' },
  { key: 'Системный аналитик' },
  { key: 'Дизайнер' },
  { key: 'QA-инженер' },
  { key: 'Фронтенд-разработчик' },
  { key: 'Бэкенд-разработчик' },
  { key: 'Мобильный разработчик' },
  { key: 'DevOps-инженер' },
  { key: 'Системный администратор' },
  { key: 'Дата-аналитик' },
  { key: 'Дата-сайентист' },
  { key: 'Руководитель' },
  { key: 'HR' },
  { key: 'Другое' },
];

export const competence = [
  { key: 'Адаптивность и стрессоустойчивость' },
  { key: 'Анализ и решение проблем' },
  { key: 'Английский язык' },
  { key: 'Аналитическое мышление' },
  { key: 'Ведение переговоров' },
  { key: 'Выявление паттернов или связей' },
  { key: 'Гибкость и готовность к изменениям' },
  { key: 'Делегирование' },
  { key: 'Исполнительская дисциплина' },
  { key: 'Клиентоориентированность' },
  { key: 'Креативное мышление' },
  { key: 'Критическое мышление' },
  { key: 'Лидерство' },
  { key: 'Навык деловой переписки' },
  { key: 'Наставничество и менторинг' },
  { key: 'Ориентация на результат' },
  { key: 'Ответственность' },
  { key: 'Планирование и организация' },
  { key: 'Поиск информации и ресурсов для решения задач' },
  { key: 'Понимание бизнеса и структуры организации' },
  { key: 'Построение эффективных процессов' },
  { key: 'Принятие управленческих решений' },
  { key: 'Публичные выступления' },
  { key: 'Работа в команде' },
  { key: 'Работа в режиме неопределенности' },
  { key: 'Работоспособность и личная эффективность' },
  { key: 'Самоанализ и саморефлексия' },
  { key: 'Самомотивация' },
  { key: 'Самосовершенствование (самообучение)' },
  { key: 'Самостоятельность (самоорганизация)' },
  { key: 'Системное мышление' },
  { key: 'Следование стандартам деятельности' },
  { key: 'Способности к анализу и прогнозированию результатов' },
  { key: 'Стратегическое мышление' },
  { key: 'Умение обрабатывать полученную информацию' },
  { key: 'Умение оценивать сроки выполнения задач' },
  { key: 'Умение проводить исследования' },
  { key: 'Умение слушать' },
  { key: 'Управление данными' },
  { key: 'Управление изменениям' },
  { key: 'Управление конфликтами' },
  { key: 'Управление людьми' },
  { key: 'Управление проектами' },
  { key: 'Целеустремленность' },
  { key: 'Эмоциональный интеллект' },
  { key: 'Эмпатия' },
  { key: 'Другое' },
];

export const mentor = [
  { key: 'Иванова Наталья Дмитриевна' },
  { key: 'Евдокимов Сергей Семёнович' },
  { key: 'Писарев Сергей Витальевич' },
];

export const objCompetence = [
  {
    id: 'PRODUCT_ANALYTICS',
    name: 'Знания продуктовой аналитики',
    skillType: 'HARD',
  },
  { id: 'BACKLOG', name: 'Ведение бэклога', skillType: 'HARD' },
  { id: 'LAUNCH_FEATURES', name: 'Запуск новых фичей', skillType: 'HARD' },
  {
    id: 'ESTIMATING_INFLUENCE',
    name: 'Оценивать влияние запуска фичи на ключевые метрики',
    skillType: 'HARD',
  },
  {
    id: 'DETERMINE_CLIENT_NEED',
    name: 'Определять потребность клиентов',
    skillType: 'SOFT',
  },
  {
    id: 'SOLVING_PROBLEMS',
    name: 'Искать решения проблем клиентов',
    skillType: 'HARD',
  },
  {
    id: 'MAKING_STRATEGY_GROW',
    name: 'Составление стратегии развития',
    skillType: 'HARD',
  },
  { id: 'PRODUCT_MARKETING', name: 'Продуктовый маркетинг', skillType: 'HARD' },
  {
    id: 'MANAGING_PL',
    name: 'Бюджетирование продукта',
    skillType: 'HARD',
  },
  {
    id: 'MARKET_ANALYSIS',
    name: 'Анализ рынка и конкурентов',
    skillType: 'HARD',
  },
  {
    id: 'MANAGING_PROJECT_METHODOLOGIES',
    name: 'Методологии управления проектами',
    skillType: 'HARD',
  },

  { id: 'TECH_EXPERTISE', name: 'Техническая экспертность', skillType: 'HARD' },

  { id: 'PRIORITISING_TASKS', name: 'Приоритизация задач', skillType: 'HARD' },

  {
    id: 'TASK_FOMULATION',
    name: 'Постановка и декомпозиция задач',
    skillType: 'HARD',
  },

  { id: 'DOCS_MNGMNT', name: 'Ведение документооборота', skillType: 'HARD' },

  {
    id: 'CREATING_DOCS',
    name: 'Создание ТЗ и документаций',
    skillType: 'HARD',
  },

  { id: 'RISK_MANAGEMENT', name: 'Риск-менеджмент', skillType: 'HARD' },

  {
    id: 'DEADLINES_CONTROL',
    name: 'Контроль сроков и качества',
    skillType: 'HARD',
  },

  { id: 'MOBILE_DEVELOPMENT', name: 'Мобильная разработка', skillType: 'HARD' },

  {
    id: 'SYSTEM_MATERIAL',
    name: 'Систематизация материала',
    skillType: 'HARD',
  },

  { id: 'PRESENTATIONS', name: 'Презентации', skillType: 'HARD' },

  {
    id: 'ESTIMATING_WORKBANDWIDTH',
    name: 'Оценка трудоемкости',
    skillType: 'HARD',
  },

  { id: 'TASK_FORM', name: 'Постановка задач', skillType: 'HARD' },

  { id: 'LOGIC', name: 'Логика', skillType: 'SOFT' },

  { id: 'MODELING', name: 'Моделирование', skillType: 'HARD' },
  {
    id: 'ARCHITECTURE_IS',
    name: 'Проектирование и архитектура ИС',
    skillType: 'HARD',
  },
  {
    id: 'IT_ARCHITECTURE',
    name: 'ИТ архитектура предприятия',
    skillType: 'HARD',
  },
  { id: 'OPTIMIZATION_METHODS', name: 'Методы оптимизации', skillType: 'HARD' },

  { id: 'BI', name: 'BI', skillType: 'HARD' },
  {
    id: 'WORK_WITH_REQUIREMENTS',
    name: 'Работа с требованиями',
    skillType: 'HARD',
  },
  {
    id: 'WORK_WITH_DOCUMENTS',
    name: 'Работа с документами',
    skillType: 'HARD',
  },
  {
    id: 'NOTATIONS',
    name: 'Нотации - методологии - инструменты',
    skillType: 'HARD',
  },
  {
    id: 'STANDARTS_AND_KNOWLEDGE',
    name: 'Стандарты и своды знаний',
    skillType: 'SOFT',
  },
  { id: 'TECHNIQUES', name: 'Техники', skillType: 'HARD' },
  {
    id: 'FACILITATION_OF_MEETINGS',
    name: 'Фасилитация встреч',
    skillType: 'SOFT',
  },
  { id: 'NEGOTIATIONS', name: 'Переговоры', skillType: 'SOFT' },
  { id: 'TESTING', name: 'Тестирование', skillType: 'HARD' },
  { id: 'MANAGING_RISKS', name: 'Управление рисками', skillType: 'HARD' },
  { id: 'SQL', name: 'SQL', skillType: 'HARD' },
  { id: 'UML', name: 'UML', skillType: 'HARD' },
  { id: 'BPMN', name: 'BPMN', skillType: 'HARD' },
  {
    id: 'REST_INTEGRATION_OUT',
    name: 'Интеграция REST — сторонних сервисов',
    skillType: 'HARD',
  },
  {
    id: 'REST_INTEGRATION_SELF',
    name: 'Интеграция REST — собственных сервисов',
    skillType: 'HARD',
  },
  { id: 'ABILITY_TO_LISTEN', name: 'Умение слушать', skillType: 'SOFT' },
  { id: 'GRADE', name: 'Оценка', skillType: 'SOFT' },
  { id: 'COMPOSITION', name: 'Композиция и сетки', skillType: 'HARD' },
  { id: 'TYPOGRAPHIC', name: 'Типографика', skillType: 'HARD' },
  { id: 'COLOR', name: 'Цвет', skillType: 'HARD' },
  { id: 'UI', name: 'UI', skillType: 'HARD' },
  { id: 'UI_ANALYTICS', name: 'UX и Аналитика', skillType: 'HARD' },
  { id: 'SYSTEMATIC_THINKING', name: 'Системное мышление', skillType: 'SOFT' },
  {
    id: 'COMMUNICATION_COLLOBARATION',
    name: 'Коммуникация и коллаборация',
    skillType: 'SOFT',
  },
  { id: 'TEAM_MANAGEMENT', name: 'Управление командой', skillType: 'HARD' },
  { id: 'PRODUCT_SKILLS', name: 'Продуктовые навыки', skillType: 'HARD' },
  { id: 'MOBILE_APPS', name: 'Мобильные приложения', skillType: 'HARD' },
  {
    id: 'ADAPTIVENESS',
    name: 'Адаптивность и стрессоустойчивость',
    skillType: 'SOFT',
  },
  { id: 'ENGLISH', name: 'Английский язык', skillType: 'HARD' },
  {
    id: 'ANALYTIC_THINKING',
    name: 'Аналитическое мышление',
    skillType: 'SOFT',
  },
  { id: 'DELEGATING', name: 'Делегирование', skillType: 'SOFT' },
  {
    id: 'CLIENT_ORIENTED',
    name: 'Клиентоориентированность',
    skillType: 'SOFT',
  },
  { id: 'CREATIVE_THINKING', name: 'Креативное мышление', skillType: 'SOFT' },
  { id: 'CRITICAL_THINKING', name: 'Критическое мышление', skillType: 'SOFT' },
  { id: 'LEADERSHIP', name: 'Лидерство', skillType: 'SOFT' },
  { id: 'PROJECT_MANAGING', name: 'Управление проектами', skillType: 'HARD' },
  { id: 'GOAL_DRIVENESS', name: 'Целеустремленность', skillType: 'SOFT' },
  {
    id: 'EMOTIONAL_INTELLEGENCE',
    name: 'Эмоциональный интеллект',
    skillType: 'SOFT',
  },
  { id: 'EMPATHY', name: 'Эмпатия', skillType: 'SOFT' },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'DRAFT':
      return 'purple';
    case 'CANCELED':
      return 'orange';
    case 'IN_PROGRESS':
      return 'blue';
    case 'NOT_COMPLETED':
      return 'red';
    case 'COMPLETED':
      return 'green';
    case 'NO_IPR':
      return 'grey';
    default:
      return 'grey';
  }
};

// Библиотека
interface LibraryItem {
  id: string;
  name: string;
}

// Универсальная функция для получения русского значения по id из библиотеки
export const getValueById = <T extends LibraryItem>(id: string, library: T[]): string => {
  const item = library.find((item) => item.id === id);
  return item ? item.name : id; // Если не найдено, вернуть исходное значение
};

// Функция преобразования формата даты
export const formatDateString = (inputDate: string): string => {
  const [day, month, year] = inputDate.split('-');
  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};

// Функция для объединения ФИО в одну строку
export const getFullName = (user: IUser): string => {
  return `${user.surname} ${user.firstName} ${user.patronymic}`;
};
