import React, { useState, useRef, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { addIngredient } from "../../services/constructor-slice";
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
import { IngredientCard } from "../ingredient-card/ingredient-card";
import { useNavigate, useLocation } from "react-router-dom";

export const BurgerIngredients = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("bun");
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useSelector((state) => state.ingredients.items);

  const dispatch = useDispatch();
  const { bun, ingredients: constructorIngredients } = useSelector(
    (state) => state.constructorBurger
  );

  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const categories = [
    { value: "bun", label: "Булки", ref: bunRef },
    { value: "sauce", label: "Соусы", ref: sauceRef },
    { value: "main", label: "Начинки", ref: mainRef },
  ];

  const getCount = (item) => {
    if (item.type === "bun") {
      return bun && bun._id === item._id ? 2 : 0;
    }
    return constructorIngredients.filter((i) => i._id === item._id).length;
  };

  const handleItemClick = (item) => {
    navigate(`/ingredients/${item._id}`, { state: { background: location } });
  };

  useEffect(() => {
    const handleScroll = () => {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const offsets = categories.map((cat) => ({
        value: cat.value,
        offset: Math.abs(
          cat.ref.current.getBoundingClientRect().top - containerTop
        ),
      }));
      const closest = offsets.reduce((a, b) => (a.offset < b.offset ? a : b));
      setCurrentCategory(closest.value);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [categories]);

  return (
    <section className={styles.burgerIngredients}>
      <nav>
        <ul className={styles.menu}>
          {categories.map((category) => (
            <Tab
              key={category.value}
              value={category.value}
              active={currentCategory === category.value}
            >
              {category.label}
            </Tab>
          ))}
        </ul>
      </nav>
      <div className={styles.ingredients} ref={containerRef}>
        {categories.map((category) => (
          <div key={category.value} ref={category.ref}>
            <h2 className="text text_type_main-medium mt-10 mb-6">
              {category.label}
            </h2>
            <div className={styles.cards}>
              {ingredients
                .filter((item) => item.type === category.value)
                .map((item) => (
                  <IngredientCard
                    key={item._id}
                    item={item}
                    count={getCount(item)}
                    onClick={handleItemClick}
                  />
                ))}
              ;
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};
