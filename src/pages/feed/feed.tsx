import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { WS_URL } from "../../utils/api";
import { getOrdersAll } from "../../services/selectors";

import styles from "./feed.module.css";
import OrdersList from "../../components/orders-list/orders-list";
import OrdersStatus from "../../components/orders-status/orders-status";
import Loader from "../../components/loader/loader";
import {
  connectionStart,
  connectionClosed,
} from "../../services/orders-all-slice";

const FeedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { connected, connecting, error, message } = useAppSelector(getOrdersAll);

  useEffect(() => {
    dispatch(connectionStart({ url: `${WS_URL}/orders/all` }));

    return () => {
      dispatch(connectionClosed());
    };
  }, [dispatch]);

  if (connecting) {
    return <Loader />;
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

  if (!connected) {
    return (
      <div className={styles.emptyContainer}>
        <p className="text text_type_main-default text_color_inactive">
          Не удалось подключиться к ленте заказов
        </p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className={styles.emptyContainer}>
        <p className="text text_type_main-default text_color_inactive">
          Нет данных о заказах
        </p>
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      <main className={styles.content}>
        <section className={styles.left_section}>
          <h1 className="text text_type_main-large mt-6 mb-6">Лента заказов</h1>
          <OrdersList data={message} />
        </section>
        <section className={styles.right_section}>
          <OrdersStatus data={message} />
        </section>
      </main>
    </div>
  );
};

export default FeedPage;
