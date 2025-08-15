import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { fetchIngredients } from "../../services/ingredients-slice";
import { getData } from "../../services/selectors";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  URL_FORGOT_PASSWORD,
  URL_LOGIN,
  URL_REGISTER,
  URL_ROOT,
  URL_ANY,
  URL_PROFILE,
  URL_RESET_PASSWORD,
  URL_INGREDIENTS,
  URL_PROFILE_LOGOUT,
} from "../../utils/routes";
import {
  MainPage,
  Login,
  Registration,
  Profile,
  ProfileEdit,
  ProfileLogout,
  IngredientDetailsPage,
} from "../../pages";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import NotFound from "../../pages/404/404";
import ResetPassword from "../../pages/reset-password/reset-password";
import { ProtectedRouteElement } from "../protected-route-element";
import Modal from "../modal/modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { AppDispatch, RootState } from "../../services/store";

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={`${styles.main} pl-5 pr-5`}>
        <Routes location={background || location}>
          <Route path={URL_ROOT} element={<MainPage />} />
          <Route
            path={`${URL_INGREDIENTS}/:id`}
            element={<IngredientDetailsPage />}
          />
          <Route
            path={URL_LOGIN}
            element={
              <ProtectedRouteElement onlyUnAuth>
                <Login />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={URL_REGISTER}
            element={
              <ProtectedRouteElement onlyUnAuth>
                <Registration />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={URL_FORGOT_PASSWORD}
            element={
              <ProtectedRouteElement onlyUnAuth>
                <ForgotPassword />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={URL_RESET_PASSWORD}
            element={
              <ProtectedRouteElement onlyUnAuth>
                <ResetPassword />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={URL_PROFILE}
            element={
              <ProtectedRouteElement>
                <Profile />
              </ProtectedRouteElement>
            }
          >
            <Route index element={<ProfileEdit />} />
            <Route path={URL_PROFILE_LOGOUT} element={<ProfileLogout />} />
          </Route>
          <Route path={URL_ANY} element={<NotFound />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path={`${URL_INGREDIENTS}/:id`}
              element={
                <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};
