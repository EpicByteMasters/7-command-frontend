import styles from './main-page.module.scss';

import { NavBarMain } from '../../entities/navbar-main/navbar-main';

import layoutTop from '../../shared/images/main-layout/top.png';
import layoutMain from '../../shared/images/main-layout/main-news.png';
import layoutCard from '../../shared/images/main-layout/card.png';
import layoutCards from '../../shared/images/main-layout/cards.png';
import layoutCardsRowTwo from '../../shared/images/main-layout/cards-1.png';
import layoutButton from '../../shared/images/main-layout/button.png';

export const MainPage = () => {
  return (
    <div className={styles.generalFooterWrapper}>
      <main className={styles.main}>
        <div className={styles.container}>
          <NavBarMain />
          <div className={styles.contentWrapper}>
            <div className={styles.titleWrapper}>
              <img src={layoutTop} alt="заглушка" className={styles.title}></img>
            </div>
            <div className={styles.headerWrapper}>
              <img src={layoutMain} alt="заглушка" className={styles.news}></img>
              <img src={layoutCard} alt="заглушка" className={styles.card}></img>
            </div>
            <div className={styles.cardsWrapper}>
              <img src={layoutCards} alt="заглушка" className={styles.cards}></img>
              <img src={layoutCardsRowTwo} alt="заглушка" className={styles.cards}></img>
            </div>
            <div className={styles.buttonWrapper}>
              <img src={layoutButton} alt="заглушка" className={styles.button}></img>
            </div>
          </div>
        </div>
      </main>
      <div className={styles.generalFooter}></div>
    </div>
  );
};
