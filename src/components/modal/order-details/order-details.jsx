import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import orderDoneImg from "../../../images/graphics.svg";

export default function OrderDetails({ orderNumber, error}) {
  if(error) {
    return <div className={styles.wrap}>Ошибка: {error}</div>;
  }
  if(!orderNumber) {
    return <div className={styles.wrap}>Идет загрузка...</div>;
  }
  return (
    <div className={styles.wrap}>
      <div className="text text_type_digits-large mb-4">{orderNumber}</div>
      <p className="text text_type_main-medium mb-5 pb-2">
        Идентификатор заказа
      </p>
      <img className={styles.orderDoneImg} src={orderDoneImg} alt="" />
      <p className="text text_type_main-small pt-2 mb-1">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.waiting_text} text text_type_main-small pb-30`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string
}
