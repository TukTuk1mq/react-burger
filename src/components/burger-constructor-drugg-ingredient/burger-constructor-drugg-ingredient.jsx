import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-drugg-ingredient.module.css";

export const BurgerConstructorDruggIngredient= ({ item, index, moveCard, handleClose }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "constructor-ingredient",
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveCard(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor-ingredient",
    item: { uuid: item.uuid, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${styles.draggableItem} ${isDragging ? styles.dragging : ""}`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </div>
  );
};