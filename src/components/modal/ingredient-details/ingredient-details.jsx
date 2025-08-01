import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIngredients } from "../../../services/ingredients-slice";

export default function IngredientDetails({ selectedItem }) {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.items);
  const dispatch = useDispatch();

  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredients.length) {
    return <p>Загрузка...</p>;
  }
  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }
  return (
    <div>
      <img
        className={`${styles.image} mb-4`}
        src={ingredient.image_large}
        alt="Изображение ингредиента"
      />
      <p
        className={`${styles.name} text-center text text_type_main-medium mb-8`}
      >
        {ingredient.name}
      </p>
      <div className={`${styles.detail} mb-15`}>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}
