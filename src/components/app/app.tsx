import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredients(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);
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
        {error && <p className="text text_type_main-medium">{error}</p>}{" "}
        {!isLoading && !error && (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </div>
  );
};
