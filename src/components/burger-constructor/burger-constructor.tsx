import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd/dist";
import { DropTargetMonitor } from "react-dnd/dist/types";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal/modal";
import { createOrder, clearOrder } from "../../services/order-slice";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../modal/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  addIngredient,
  moveIngredient,
  removeIngredient,
} from "../../services/constructor-slice";
import { BurgerConstructorDruggIngredient } from "../burger-constructor-drugg-ingredient/burger-constructor-drugg-ingredient";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../services/store";
import { ConstructorIngredient, clearConstructor } from "../../services/constructor-slice";
import { getData } from "../../services/selectors";

export const BurgerConstructor: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector(
    (state: RootState) => state.constructorBurger
  );
  const { orderNumber, isLoading, error } = useAppSelector(
    (state: RootState) => state.order
  );
  const { isAuth } = useAppSelector((state: RootState) => state.user);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "ingredient",
    drop: (item: ConstructorIngredient) => {
      dispatch(addIngredient(item));
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  drop(ref);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  const handleOrder = () => {
    if (!isAuth) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (!bun) return;
    const ingredientIds = [
      bun._id,
      ...ingredients.map((item: ConstructorIngredient) => item._id),
      bun._id,
    ];
    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        setOpenModal(true);
        dispatch(clearConstructor());
      })
      .catch(() => {
        setOpenModal(true);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(clearOrder());
  };

  const total =
    (bun ? bun.price * 2 : 0) +
    ingredients.reduce(
      (sum: number, item: ConstructorIngredient) => sum + item.price,
      0
    );

  return (
    <div className={styles.main} ref={ref}>
      <div className={styles.ingredients}>
        {bun && (
          <div className="ml-6">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        {ingredients.map((item: ConstructorIngredient, index: number) => (
          <BurgerConstructorDruggIngredient
            key={item.uuid}
            item={item}
            index={index}
            moveCard={moveCard}
            handleClose={() => dispatch(removeIngredient(item.uuid))}
          />
        ))}

        {bun && (
          <div className="ml-6">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={styles.form}>
        <span className="text text_type_digits-medium mr-10">
          {total}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleOrder}
          disabled={!bun || ingredients.length === 0 || isLoading}
        >
          {isLoading ? "Оформляем заказ..." : "Оформить заказ"}
        </Button>
        {showAuthModal && (
          <Modal onClose={() => setShowAuthModal(false)}>
            <p className="text text_type_main-medium p-10">
              Для оформления заказа необходимо зарегистрироваться или войти в
              аккаунт.
            </p>
          </Modal>
        )}
        {openModal && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails orderNumber={orderNumber} error={error} />
          </Modal>
        )}
      </div>
    </div>
  );
};
