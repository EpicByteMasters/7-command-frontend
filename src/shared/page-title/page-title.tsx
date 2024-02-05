import styles from './page-title.module.scss';

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => <h2 className={styles.title}>{title}</h2>;
