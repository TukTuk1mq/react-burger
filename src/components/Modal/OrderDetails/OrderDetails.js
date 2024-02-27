import imgIcon from "../../../images/7fc90c4fa8d58fc7f2d482c801de99e4.png";

import styles from "./OrderDetails.module.css";

export default function OrderDetails() {
  return (
    <div className={styles.main}>
      <p className="text text_type_digits-large mt-30 mb-8">034536</p>
      <p className="text text_type_main-medium ">индефикатор заказа</p>
      <img className={styles.imgIcon} src={imgIcon} alt=''/>
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
