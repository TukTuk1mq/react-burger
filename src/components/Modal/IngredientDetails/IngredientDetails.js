import styles from "../IngredientDetails/IngredientDetails.module.css";

export default function IngredientDetails({ selectedItem }) {
  return (
    <div className={styles.infoInModal}>
      <div className={styles.ModalHeader}>
        <div className="text text_type_main-large mt-10">
          Детали ингредиента
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={selectedItem.image} alt={selectedItem.name} className={styles.ModalImage} />
      </div>
      <p
        className="text text_type_main-medium mt-2 mb-8"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {selectedItem.name}
      </p>
      <ul>
        <li className="text text_type_main-default text_color_inactive">
          Калории,ккал
          <p className="text text_type_digits-default">
            {selectedItem.calories}
          </p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          Белки, г
          <p className="text text_type_digits-default">
            {selectedItem.proteins}
          </p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          Жиры, г
          <p className="text text_type_digits-default">{selectedItem.fat}</p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          Углеводы, г
          <p className="text text_type_digits-default">
            {selectedItem.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
