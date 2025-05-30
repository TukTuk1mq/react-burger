import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { fetchIngredients } from "../../services/ingredients-slice";
import { getData } from "../../services/selectors";

export const App = () => {
  const dispatch = useDispatch();
  const {
    items: ingredients,
    isLoading,
    error,
  } = useSelector(getData);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
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
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
    </div>
  );
};
