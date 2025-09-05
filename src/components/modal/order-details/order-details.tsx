import styles from "./order-details.module.css";
import orderDoneImg from "../../../images/graphics.svg";

interface OrderDetailsProps {
  orderNumber?: string | number | null;
  error?: string | null;
}

export default function OrderDetails({
  orderNumber,
  error,
}: OrderDetailsProps) {
  if (error) {
    return <div className={styles.wrap}>Ошибка: {error}</div>;
  }

  if (orderNumber === null || orderNumber === undefined) {
    return <div className={styles.wrap}>Идет загрузка...</div>;
  }

  return (
    <div className={styles.wrap}>
      <div className="text text_type_digits-large mb-4">
        {typeof orderNumber === "number"
          ? orderNumber
          : parseInt(orderNumber as string)}
      </div>
      <p className="text text_type_main-medium mb-5 pb-2">
        Идентификатор заказа
      </p>
      <img
        className={styles.orderDoneImg}
        src={orderDoneImg}
        alt="Заказ принят"
      />
      <p className="text text_type_main-small pt-2 mb-1">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.waiting_text} text text_type_main-small pb-30`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
