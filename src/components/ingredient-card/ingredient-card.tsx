import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { Ingredient } from "../../services/constructor-slice";
import { DragSourceMonitor } from "react-dnd";

interface IngredientCardProps {
  item: Ingredient;
  count: number;
  onClick: (item: Ingredient) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  item,
  count,
  onClick,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [, drag] = useDrag({
    type: "ingredient",
    item,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <button
      ref={ref}
      onClick={() => onClick(item)}
      className={`${styles.card}`}
      data-cy="ingredient-card"
      data-cy-id={item._id}
      data-cy-type={item.type}
      type="button"
    >
      <div className={styles.imageWrapper}>
        {count > 0 && (
          <div className={styles.count}>
            <Counter count={count} size="default" extraClass="m-1" />
          </div>
        )}
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
