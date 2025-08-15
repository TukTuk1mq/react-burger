import React, { useRef } from "react";
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-drugg-ingredient.module.css";
import { ConstructorIngredient } from "../../services/constructor-slice";

interface DraggedItem {
  uuid: string;
  index: number;
}

interface CollectedProps {
  isDragging: boolean;
}

interface Props {
  item: ConstructorIngredient;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleClose: () => void;
}

export const BurgerConstructorDruggIngredient: React.FC<Props> = ({ 
  item, 
  index, 
  moveCard, 
  handleClose 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DraggedItem, void, void>({
    accept: "constructor-ingredient",
    hover(draggedItem: DraggedItem, monitor: DropTargetMonitor) {
      if (draggedItem.index === index) return;
      moveCard(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag<DraggedItem, void, CollectedProps>({
    type: "constructor-ingredient",
    item: { uuid: item.uuid, index },
    collect: (monitor: DragSourceMonitor) => ({
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