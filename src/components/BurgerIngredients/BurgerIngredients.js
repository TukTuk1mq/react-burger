import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal/Modal";

import styles from "../BurgerIngredients/BurgerIngredients.module.css";

const BurgerIngredients = ({ items }) => {
  const [current, setCurrent] = useState("one");
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  return (
    <div className={styles.main}>
      <h2
        className="text text_type_main-large"
        style={{ marginTop: "40px", marginBottom: "20px" }}
      >
        Соберите бургер
      </h2>

      <div className={styles.tabs}>
        <Tab value="one" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        <div className="text text_type_main-medium mt-10 mb-6">Булки</div>
        <div>
          {items
            .filter((item) => item.type === "bun")
            .map((item, i) => (
              <button
                key={i}
                className={styles.card}
                onClick={() => handleItemClick(item)}
              >
                <div style={{ textAlign: "center" }}>
                  <img src={item.image} alt={''}/>
                </div>
                <p
                  className="text text_type_digits-default"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "4px 0",
                  }}
                >
                  {item.price}
                  <CurrencyIcon type="primary" />
                </p>
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  {item.name}
                </div>
              </button>
            ))}
        </div>
        <div className="text text_type_main-medium mt-10 mb-6">Соусы</div>
        <div>
          {items
            .filter((item) => item.type === "sauce")
            .map((item, i) => (
              <button
                key={i}
                className={styles.card}
                onClick={() => handleItemClick(item)}
              >
                <div style={{ textAlign: "center" }}>
                  <img src={item.image} alt={''}/>
                </div>
                <p
                  className="text text_type_digits-default"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "4px 0",
                  }}
                >
                  {item.price}
                  <CurrencyIcon type="primary" />
                </p>
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  {item.name}
                </div>
              </button>
            ))}
        </div>
        <div className="text text_type_main-medium mt-10 mb-6">Начинки</div>
        <div>
          {items
            .filter((item) => item.type === "main")
            .map((item, i) => (
              <button
                key={i}
                className={styles.card}
                onClick={() => handleItemClick(item)}
              >
                <div style={{ textAlign: "center" }}>
                  <img src={item.image} alt={''}/>
                </div>
                <p
                  className="text text_type_digits-default"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "4px 0",
                  }}
                >
                  {item.price}
                  <CurrencyIcon type="primary" />
                </p>
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  {item.name}
                </div>
              </button>
            ))}
        </div>
      </div>

      {openModal && selectedItem && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <IngredientDetails selectedItem={selectedItem} />
        </Modal>
      )}
    </div>
  );
};
export default BurgerIngredients;

BurgerIngredients.propTypes = {
  image: PropTypes.node,
  name: PropTypes.string,
  price: PropTypes.number
};
