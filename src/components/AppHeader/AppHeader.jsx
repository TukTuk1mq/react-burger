import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../../components/AppHeader/AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={styles.main}>
      <div className={styles.header}>
        <div className={styles.nav}>
          <button className={styles.button}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2 mr-7">
              Конструктор
            </span>
          </button>

          <button className={styles.button}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
          </button>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <button className={styles.button}>
          <span className="ml-30">
            <ProfileIcon type="secondary" />
          </span>

          <span className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
