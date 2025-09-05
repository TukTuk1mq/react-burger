import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { fetchIngredients } from "../../services/ingredients-slice";
import { getData } from "../../services/selectors";
import styles from "./main-page.module.css";
import type { AppDispatch } from "../../services/store";

const MainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: ingredients, isLoading, error } = useSelector(getData);

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading && <p>Загрузка...</p>}
        {error && <p className="text text_type_main-medium">{error}</p>}
        {!isLoading && !error && (
          <>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </>
        )}
      </main>
    </div>
  );
};

export default MainPage;
