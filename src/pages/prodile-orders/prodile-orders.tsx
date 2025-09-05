import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersUser } from "../../services/selectors";
import {
  userConnectionStart,
  userConnectionClosed,
} from "../../services/orders-user-slice";
import { WS_URL } from "../../utils/api";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { getValidToken, checkAndRefreshToken } from "../../utils/auth";

import styles from "./prodile-orders.module.css";
import Loader from "../../components/loader/loader";
import OrdersList from "../../components/orders-list/orders-list";

function ProfileOrders() {
  const dispatch = useDispatch();
  const { connected, connecting, error, message } = useSelector(getOrdersUser);
  const [retryCount, setRetryCount] = useState(0);

  const normalizeToken = (token: string): string =>
    token.replace(/^Bearer\s+/i, "").trim();

  const getAuthUrl = async (): Promise<string> => {
    try {
      const validToken = await checkAndRefreshToken();

      if (!validToken) {
        throw new Error("Не удалось получить валидный токен");
      }

      const clean = normalizeToken(validToken);
      return `${WS_URL}/orders?token=${encodeURIComponent(clean)}`;
    } catch (error) {
      console.error("Ошибка получения токена:", error);
      const token = getCookie("accessToken");
      if (token) {
        const clean = normalizeToken(token);
        return `${WS_URL}/orders?token=${encodeURIComponent(clean)}`;
      }
      throw new Error("Токен не найден");
    }
  };

  const setupWebSocket = async () => {
    try {
      const url = await getAuthUrl();
      dispatch(userConnectionStart({ url }));
    } catch (error) {
      console.error("Ошибка настройки WebSocket:", error);
    }
  };

  const handleRetry = async () => {
    try {
      const newToken = await checkAndRefreshToken();
      if (newToken) {
        setRetryCount((prev) => prev + 1);
      } else {
        console.error("Не удалось обновить токен");
      }
    } catch (error) {
      console.error("Ошибка при повторной попытке:", error);
    }
  };

  const handleReLogin = () => {
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  const sortedOrders = useMemo(() => {
    if (!message?.orders) {
      return [];
    }
    return [...message.orders].sort((a, b) => b.number - a.number);
  }, [message]);

  useEffect(() => {
    setupWebSocket();

    return () => {
      dispatch(userConnectionClosed());
    };
  }, [dispatch, retryCount]);

  if (connecting && !connected) {
    return (
      <div className={styles.container}>
        <Loader />
        <p className="text text_type_main-default text_color_inactive mt-4">
          Загружаем историю заказов...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={`mb-6 error-text text text_type_main-default`}>
            Ошибка: {error}
          </p>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.primary}`}
              onClick={handleRetry}
            >
              Попробовать снова
            </button>
            <button
              className={`${styles.button} ${styles.secondary}`}
              onClick={handleReLogin}
            >
              Войти заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!message || sortedOrders.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2 className="text text_type_main-medium mb-4">История заказов</h2>
          <p className="text text_type_main-default text_color_inactive">
            У вас пока нет заказов
          </p>
          <p className="text text_type_main-default text_color_inactive mt-2">
            Сделайте первый заказ и он появится здесь!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        <OrdersList
          data={{
            orders: sortedOrders,
            total: message.total,
            totalToday: message.totalToday,
          }}
          isPerson={true}
        />
      </div>
    </div>
  );
}

export default ProfileOrders;
