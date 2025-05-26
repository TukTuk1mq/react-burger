import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import orderDoneImg from "../../../images/graphics.svg";

export default function OrderDetails() {
  return (
    <div className={styles.wrap}>
      <div className="text text_type_digits-large mb-4">034536</div>
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
