import React from "react";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";

export const IngredientCard = ({ item, count, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <button
      ref={dragRef}
      onClick={() => onClick(item)}
      className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
    >
      <div className={styles.imageWrapper}>
        <Counter
          count={count}
          size="default"
          extraClass="m-1"
          className={styles.count}
        />
        <img src={item.image} alt={item.name} />
      </div>
      <p className={`${styles.price} text text_type_digits-default`}>
        {item.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.name} text text_type_main-small`}>{item.name}</p>
    </button>
  );
};
