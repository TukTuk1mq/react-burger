import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../../services/selectors";
import {
  getOrderDetails,
  clearOrderDetails,
} from "../../services/order-details-slice";
import type { AppDispatch, RootState } from "../../services/store";
import type { TIngredient } from "../../utils/types";

import styles from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../../components/loader/loader";

const OrderInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { order, isLoading, error } = useSelector(
    (state: RootState) => state.orderDetails
  );
  const { items: ingredients } = useSelector(getData);

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }

    return () => {
      dispatch(clearOrderDetails());
    };
  }, [dispatch, id]);

  const orderData = useMemo(() => {
    if (!order || !ingredients) return null;

    const ingredientsMap: Record<
      string,
      { ingredient: TIngredient; qty: number }
    > = {};
    let totalSum = 0;

    order.ingredients.forEach((ingredientId) => {
      const ingredient = ingredients.find(
        (item: TIngredient) => item._id === ingredientId
      );
      if (ingredient) {
        if (!ingredientsMap[ingredientId]) {
          ingredientsMap[ingredientId] = { ingredient, qty: 0 };
        }
        ingredientsMap[ingredientId].qty += 1;
        totalSum += ingredient.price;
      }
    });

    const orderIngredients = Object.values(ingredientsMap);

    const orderStatus =
      {
        done: "Выполнен",
        created: "Создан",
        pending: "Готовится",
      }[order.status] || order.status;

    return { orderIngredients, orderStatus, totalSum };
  }, [order, ingredients]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p
          className={`text text_type_main-default text_color_error ${styles.errorText}`}
        >
          {error}
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.emptyContainer}>
        <p className="text text_type_main-default text_color_inactive">
          Заказ не найден
        </p>
      </div>
    );
  }

  return (
    <main className={styles.main_container}>
      <>
        <p className={`text text_type_digits-default mb-10 text-center`}>
          #{String(order.number).padStart(6, "0")}
        </p>

        <h1 className={`text text_type_main-medium mb-3`}>{order.name}</h1>

        <p
          className={`text text_type_main-default ${styles.status_order} ${
            order.status === "done" ? styles.statusDone : ""
          }`}
        >
          {orderData?.orderStatus}
        </p>

        <p className="text text_type_main-medium mb-2">{"Состав:"}</p>

        <section className={styles.container_order}>
          {orderData?.orderIngredients.map((item, index) => (
            <li key={`${item.ingredient._id}-${index}`} className="mt-4 mr-6">
              <div className={styles.container_row}>
                <div className={styles.ingredientImage}>
                  <img
                    src={item.ingredient.image_mobile}
                    alt={item.ingredient.name}
                    className={styles.image}
                  />
                </div>

                <p
                  className={`text text_type_main-default ml-4 ${styles.name}`}
                >
                  {item.ingredient.name}
                </p>

                <div className={styles.count_price}>
                  <span className="text text_type_digits-default mr-2">
                    {item.qty} × {item.ingredient.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          ))}
        </section>

        <section
          className={`text text_type_main-default mt-10 mb-6 ${styles.food_order}`}
        >
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate
              date={new Date(order.createdAt)}
              className="text text_type_main-default text_color_inactive"
            />
          </p>

          <div className={styles.count_price}>
            <span className={`text text_type_digits-default mr-2`}>
              {orderData?.totalSum}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </section>
      </>
    </main>
  );
};

export default OrderInfo;
