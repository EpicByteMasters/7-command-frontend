import { Route, Routes } from 'react-router-dom';

//-------------------------------------------------
import { Login } from '../pages/login/login';
import { EmployeePlan } from '../pages/employee-plan/employee-plan';
import { MainPage } from '../pages/main-page/main-page';
import { LeaderEmployeesList } from '../pages/leader-employees-list/leader-employees-list';
import { MentorPlan } from '../pages/mentor-plan/mentor-plan';
import { NotificationCard } from '../entities/notification-green/notification';
import { Page404 } from '../pages/page404/page404';
import { OpendIpr } from '../pages/opend-ipr/opend-ipr';
import { MyPlan } from '../pages/my-plan/my-plan';
//----------------------------------------------------
import users from '../shared/utils/users';
import { roleUrl, accessUrl } from '../shared/utils/urls';

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={accessUrl[2].url} element={<Login users={users} />} />
        <Route path="/main" element={<MainPage></MainPage>} />
        <Route path={roleUrl[0].url} element={<LeaderEmployeesList />} />
        <Route path="/service-iprs/mentor" element={<MentorPlan />} />
        <Route path={roleUrl[1].url} element={<MyPlan />} />
        <Route path="/service-iprs/ipr/:id" element={<OpendIpr />} />
        <Route
          path="/service-iprs/myteam/history/:id"
          element={<EmployeePlan />}
        />
        <Route
          path="/404"
          element={
            <Page404
              error={'Ошибка'}
              title={'404'}
              paragraph={'Что-то пошло не так'}
              button={'Вернуться на главную'}
            ></Page404>
          }
        />

        <Route
          path="/505"
          element={
            <Page404
              error={'Ошибка2'}
              title={'505'}
              paragraph={'Сервер недоступен'}
              button={'Вернуться на главную'}
            ></Page404>
          }
        />
        <Route
          path="/207"
          element={
            <Page404
              error={'Ошибка2'}
              title={'207'}
              paragraph={'Вы не авторизованы'}
              button={'Авторизоваться'}
            ></Page404>
          }
        />
        <Route
          path="/*"
          element={
            <Page404
              error={'Ошибка'}
              title={'404'}
              paragraph={'Что-то пошло не так'}
              button={'Вернуться на главную'}
            ></Page404>
          }
        />
        <Route
          path={'/notification1'}
          element={
            <NotificationCard
              error={true}
              title={'Сохранено'}
              paragraph={'План развития добавлен в общий список как черновик'}
            />
            // <NotificationCard title={'Отправлено в работу'} paragraph={'План развития отправлен сотруднику для исполнения'} />
          }
        ></Route>
      </Routes>
    </>
  );
};
