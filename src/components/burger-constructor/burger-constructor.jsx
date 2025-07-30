import React, { useState } from "react";
import styles from "./burger-constructor.module.css";
import * as PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal/modal";
import { createOrder, clearOrder } from "../../services/order-slice";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../modal/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  moveIngredient,
  removeIngredient,
} from "../../services/constructor-slice";
import { BurgerConstructorDruggIngredient } from "../burger-constructor-drugg-ingredient/burger-constructor-drugg-ingredient";

export const BurgerConstructor = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.constructorBurger);
  const { orderNumber, isLoading, error } = useSelector((state) => state.order);
  const { isAuth } = useSelector((state) => state.user);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  const handleOrder = () => {
    if (!isAuth) {
      setShowAuthModal(true);
      return;
    }
    if (!bun) return;
    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id,
    ];
    dispatch(createOrder(ingredientIds));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(clearOrder());
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addIngredient(item));
    },
  });

  const total =
    (bun ? bun.price * 2 : 0) +
    ingredients.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.main} ref={dropRef}>
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

        {ingredients.map((item, index) => (
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
