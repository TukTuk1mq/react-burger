import React, { useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../Modal/Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";

import styles from "../BurgerConstructor/BurgerConstructor.module.css";
const BurgerConstructor = ({ items }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.main}>
      <div
        key={items.id}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div className="ml-6">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={items.price}
            thumbnail={""}
          />
        </div>
        {items.map((item) => (
          <div>
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
            thumbnail={""}
          />
        </div>
      </div>

      <div>
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
            <Modal
              open={() => setOpenModal(false)}
              onClose={() => setOpenModal(false)}
            >
              <OrderDetails />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};
export default BurgerConstructor;
