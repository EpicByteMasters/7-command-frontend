import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonDesktop } from '@alfalab/core-components/button/desktop';

import { useAppDispatch } from '../../shared/hooks/redux';
// import { getMyIprsData } from '../../store/reducers/iprsSlice';
// import { Page404 } from '../page404/page404';

import { User } from '../../shared/utils/users';
import {
  getUserData,
  logInUser
} from '../../shared/store/reducers/userSlice';

import styles from './login.module.scss';

interface LoginProps {
  users: User[];
}

export const Login: FC<LoginProps> = ({ users }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [email]: true
      }));
      const loginAction = logInUser({ email, password });
      const loginResult = await dispatch(loginAction);

      //console.log('result', loginResult);

      if (logInUser.rejected.match(loginResult)) {
        //console.error('Login rejected:', loginResult.error);
      } else if (logInUser.fulfilled.match(loginResult)) {
        if (loginResult.payload && loginResult.payload.access_token) {
          try {
            const userDataResult = await dispatch(getUserData());

            if (getUserData.fulfilled.match(userDataResult)) {
              // console.log('User data received:', userDataResult.payload);
              navigate('/main');
              // console.log('Login successful. Token and data received.');
            } else {
              //  console.error('Error during fetching user data:', userDataResult.error);
              navigate('/404');
            }
          } catch (userDataError) {
            // console.error('Error during fetching user data:', userDataError);
            navigate('/505');
          }
        } else {
          // console.error('Token not received during login.');
          navigate('/207');
        }
      } else {
        //console.error('Unexpected result during login:', loginResult);
        navigate('/207');
      }
    } catch (error) {
      //console.error('Error during login:', error);
      navigate('/207');
    } finally {
      // Устанавливаем состояние загрузки для конкретного пользователя в false
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [email]: false
      }));
    }
  };

  return (
    <div className={styles.generalFooterWrapper}>
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <ul className={styles.list}>
              <h3 className={styles.header}>Сотрудник</h3>

              {users.map((user: User, key: number) => {
                return (
                  <li className={styles.item} key={user.id}>
                    <img
                      src={user.pic}
                      className={styles.img}
                      alt="аватар"
                    />
                    <div className={styles.textWrapper}>
                      <h3 className={styles.title}>{user.name}</h3>
                      <p className={styles.paragraph}>{user.position}</p>
                    </div>

                    <div className={styles.link}>
                      <ButtonDesktop
                        loading={loadingStates[user.email]}
                        view="tertiary"
                        shape="rectangular"
                        size="xxs"
                        onClick={() =>
                          handleLogin(user.email, user.password)
                        }
                        name={user.role}>
                        Вход
                      </ButtonDesktop>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
      <div className={styles.generalFooter}></div>
    </div>
  );
};
