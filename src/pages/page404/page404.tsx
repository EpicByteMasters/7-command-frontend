import { useNavigate, useLocation } from 'react-router-dom';

import { Button } from '@alfalab/core-components/button';

import styles from './page404.module.scss';

interface PageProps {
  error: string;
  title: string;
  paragraph: string;
  button: string;
}
export const Page404: React.FC<PageProps> = ({
  error,
  title,
  paragraph,
  button
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/207') {
      navigate('/');
    }
    if (location.pathname === '/404' || '/505') {
      navigate('/main');
    }

    navigate('/main');
  };
  return (
    <div className={styles.generalFooterWrapper}>
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.paragraph}>{paragraph}</p>
          <Button
            view="primary"
            size="s"
            className={styles.button}
            onClick={handleClick}>
            {button}
          </Button>
        </div>
      </section>
      <div className={styles.generalFooter}></div>
    </div>
  );
};
