
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Backdrop } from '@alfalab/core-components/backdrop';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { TooltipDesktop } from '@alfalab/core-components/tooltip/desktop';

import { useAppDispatch } from '../../shared/hooks/redux';

import { getNotificationList } from '../../shared/store/reducers/notificationsSlice';
import { BASE_URL } from '../../shared/utils/constants';

import styles from './notifications.module.scss';

import type { INotification } from './type';

const MAX_ITEMS = 3;

export const Notifications = ({ close }: { close: () => void }) => {
  const [notificationsList, setNotificationsList] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const dispatch = useAppDispatch();

  const notificationsDataResult = async () => {
    return await dispatch(getNotificationList());
  };

  useEffect(() => {
    notificationsDataResult().then((response) => {
      const notificationsData = [...(response.payload as INotification[])];
      notificationsData.length = MAX_ITEMS;
      setNotificationsList(notificationsData);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <div style={{ zIndex: 1, position: 'relative' }}>
          <div className={styles.notifications}>
            <ul className={styles.list}>
              {notificationsList.map(
                ({
                  title,
                  briefText,
                  date,
                  url,
                  buttonText
                }: {
                  title: string;
                  briefText: string;
                  date: string;
                  url: string;
                  buttonText: string;
                }) => {
                  return (
                    <li className={styles.item} key={Math.random()}>
                      <b className={styles.title}>{title}</b>
                      <p className={styles.description}>{briefText}</p>
                      <footer className={styles.footer}>
                        <div className={styles.date}>{date}</div>
                        <NavLink to={BASE_URL + url} className={styles.link}>
                          {buttonText || 'Ссылка'}
                        </NavLink>
                      </footer>
                    </li>
                  );
                }
              )}
            </ul>
            <div className={styles.wrapperShowMore}>
              <TooltipDesktop
                content={<div>Ожидайте в следующих релизах :)</div>}
                position="bottom"
                view="hint"
                trigger="click"
              >
                <ButtonDesktop view="primary" size="s">
                  Показать все
                </ButtonDesktop>
              </TooltipDesktop>
            </div>
          </div>
          <Backdrop open={true} onClick={() => close()} />
        </div>
      )}
    </>
  );
};
