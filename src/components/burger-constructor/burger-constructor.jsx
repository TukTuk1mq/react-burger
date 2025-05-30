import React, { useState } from "react";
import styles from "./burger-constructor.module.css";
import * as PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal/modal";
import {bun} from "../../utils/hard-bun-data";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../modal/order-details/order-details";

export const BurgerConstructor = ({ ingredients }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.ingredients}>
        <div className="ml-6">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={ingredients.price}
            thumbnail={bun.image}
          />
        </div>
        {ingredients.map((item, index) => (
          <div key={index}> 
            <DragIcon />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
        <div className="ml-6">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={styles.form}>
        <span className="text text_type_digits-medium mr-10">
          610
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => setOpenModal(true)}
        >
          Оформить заказ
        </Button>
        {openModal && (
          <Modal onClose={() => setOpenModal(false)}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
