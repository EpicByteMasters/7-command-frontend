import React, { ChangeEvent, useState, useCallback } from 'react';
import styles from './notification.module.scss';
import { Notification } from '@alfalab/core-components/notification';
interface NoteData {
  error?: boolean;
  title: string;
  paragraph: string;
}

export const NotificationCard: React.FC<NoteData> = ({ title, paragraph, error }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);
  const hideNotification = useCallback(() => setIsVisible(false), []);
  return (
    <div className={styles.container} style={{ width: '400' }}>
      <Notification
        title={title}
        block={true}
        colors={'default'}
        titleClassName={styles.title}
        contentClassName={styles.content}
        hasCloser={true}
        badge={'positive'}
        visible={isVisible}
        offset={112}
        autoCloseDelay={6000}
        zIndex={10}
        onClose={hideNotification}
        onCloseTimeout={hideNotification}
      >
        {paragraph}
      </Notification>
      <button onClick={toggleVisibility}>Показать уведомление</button>
    </div>
  );
};
