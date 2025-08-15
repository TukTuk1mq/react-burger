import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIngredients } from "../../../services/ingredients-slice";
import { RootState, AppDispatch } from "../../../services/store";

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface IngredientDetailsProps {
  selectedItem?: Ingredient;
}

export default function IngredientDetails({ selectedItem }: IngredientDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((state: RootState) => state.ingredients.items);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredient = selectedItem || ingredients.find((item: Ingredient) => item._id === id);

  if (!ingredients.length) {
    return <p>Загрузка...</p>;
  }
  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <div className={styles.container}>
      <img
        className={`${styles.image} mb-4`}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <p className={`${styles.name} text-center text text_type_main-medium mb-8`}>
        {ingredient.name}
      </p>
      <div className={`${styles.detail} mb-15`}>
        <div className={styles.detailItem}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </div>
        </div>
        <div className={styles.detailItem}>
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