import styles from './footer-main.module.scss';
import logo from '../../images/footer-icons/logo-mobile.svg';
import logo1 from '../../images/footer-icons/logotype_telegram_m.svg';
import logo2 from '../../images/footer-icons/logotype_vk_m.svg';
import logo3 from '../../images/footer-icons/logotype_youtube_m.svg';

export const FooterMain = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksWrapper}>
        <div className={styles.linksColumn}>
          <a className={styles.linkText} href="#">
            Главная
          </a>
          <a className={styles.linkText} href="#">
            Сервисы
          </a>
          <a className={styles.linkText} href="#">
            Контакты
          </a>
        </div>
        <div className={styles.linksColumn}>
          <a className={styles.linkText} href="#">
            Подразделения
          </a>
          <a className={styles.linkText} href="#">
            Всё о работе
          </a>
          <a className={styles.linkText} href="#">
            Академия
          </a>
        </div>
        <div className={styles.linksColumn}>
          <a className={styles.linkText} href="#">
            SAP АХД
          </a>
          <a className={styles.linkText} href="#">
            Заказ HR-услуг
          </a>
          <a className={styles.linkText} href="#">
            Заказ IT-услуг
          </a>
        </div>
        <div className={styles.linksColumn}>
          <a className={styles.linkText} href="#">
            WSS Docs
          </a>
          <a className={styles.linkText} href="#">
            Карьера в банке
          </a>
          <a className={styles.linkText} href="#">
            Сайт Альфа Банка
          </a>
        </div>
        <div className={styles.linksColumn}>
          <div className={styles.mobileColumn}>
            <img className={styles.redLogo} src={logo} alt="logo"></img>
            <div className={styles.mobileLink}>
              <p className={styles.paragraphOne}>Мобильное приложение</p>
              <p className={styles.paragraphTwo}>Для iOS и Android</p>
            </div>
          </div>
          <div className={styles.socialWrapper}>
            <div className={styles.icon}>
              <img className={styles.img} src={logo1} alt="logo"></img>
            </div>
            <div className={styles.icon}>
              <img className={styles.img} src={logo2} alt="logo"></img>
            </div>
            <div className={styles.icon}>
              <img className={styles.img} src={logo3} alt="logo"></img>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.supportWrapper}>
        <div className={styles.supportLinks}>
          <div className={styles.bottomColumn}>011-1111 — Help Desk | IT-поддержка</div>
          <div className={styles.bottomColumn}>013-3777 — Human Help | HR-поддержка</div>
        </div>
        <button className={styles.button}>Помощь</button>
      </div>
    </footer>
  );
};
