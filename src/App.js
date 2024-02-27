import React, { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";

import styles from "./css/App.module.css";

function App() {
  const URL_API = 'https://norma.nomoreparties.space/api/ingredients'
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch(URL_API)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data.data);
      })
      .catch(err => {
        console.log(err.message)
      })
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.main}>
        <div style={{ display: "flex", columnCount: "2", columnGap: "40px" }}>
          {items && <BurgerIngredients items={items} />}

          <div style={{ marginTop: "100px"}}>
            {items && <BurgerConstructor items={items} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
