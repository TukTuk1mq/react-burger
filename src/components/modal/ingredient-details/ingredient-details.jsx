import styles from "./ingredient-details.module.css";

export default function IngredientDetails({ selectedItem }) {
  return (
    <div>
      <img
        className={`${styles.image} mb-4`}
        src={selectedItem.image_large}
        alt="Изображение ингредиента"
      />
      <p
        className={`${styles.name} text-center text text_type_main-medium mb-8`}
      >
        {selectedItem.name}
      </p>
      <div className={`${styles.detail} mb-15`}>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {selectedItem.calories}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {selectedItem.proteins}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {selectedItem.fat}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {selectedItem.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}
