import { ExclamationCircleSIcon } from '@alfalab/icons-glyph/ExclamationCircleSIcon';

import styles from './lead-info-block.module.scss';
interface LeadInfoItem {
  subtitle: string;
  number: number;
}

interface LeadInfoBlockProps {
  data: {
    title: string;
    items: LeadInfoItem[];
  };
}

export const LeadInfoBlock: React.FC<LeadInfoBlockProps> = ({ data }) => {
  return (
    <div className={styles.dataItem}>
      <h3 className={styles.dataTitle}>
        {data.title} <ExclamationCircleSIcon fill={'#898889'} />
      </h3>
      <div className={styles.dataList}>
        {data.items.map((item, index) => (
          <div key={index} className={styles.dataElement}>
            <span className={styles.dataText}>{item.subtitle}</span>
            <span className={styles.dataNumber}>{item.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
