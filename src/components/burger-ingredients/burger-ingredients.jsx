import React, { useState } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";

export const BurgerIngredients = ({ ingredients }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("bun");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { value: "bun", label: "Булки" },
    { value: "sauce", label: "Соусы" },
    { value: "main", label: "Начинки" },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  return (
    <section className={styles.burgerIngredients}>
      <nav>
        <ul className={styles.menu}>
          {categories.map((category) => (
            <Tab
              key={category.value}
              value={category.value}
              active={currentCategory === category.value}
              onClick={() => setCurrentCategory(category.value)}
            >
              {category.label}
            </Tab>
          ))}
        </ul>
      </nav>
      <div className={styles.ingredients}>
        {categories.map((category) => (
          <div key={category.value}>
            <h2 className="text text_type_main-medium mt-10 mb-6">
              {category.label}
            </h2>
            <div className={styles.cards}>
              {ingredients
                .filter((item) => item.type === category.value)
                .map((item) => (
                  <button
                    key={item._id}
                    className={styles.card}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className={styles.imageWrapper}>
                      <Counter count={1} size="default" extraClass="m-1" className={styles.count}/>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <p
                      className={`${styles.price} text text_type_digits-default`}
                    >
                      {item.price}
                      <CurrencyIcon type="primary" />
                    </p>
                    <p className={`${styles.name} text text_type_main-small`}>
                      {item.name}
                    </p>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
      {openModal && selectedItem && (
        <Modal
          title="Детали ингридиента"
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <IngredientDetails selectedItem={selectedItem} />
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
