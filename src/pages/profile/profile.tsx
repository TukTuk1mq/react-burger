import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  matchPath,
} from "react-router-dom";
import { logout } from "../../services/user-slice";
import {
  URL_LOGIN,
  URL_PROFILE,
  URL_PROFILE_LOGOUT,
  URL_PROFILE_ORDERS,
} from "../../utils/routes";
import type { AppDispatch, RootState } from "../../services/store";

const Profile: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state: RootState) => state.user);

  let info = "";
  if (matchPath(pathname, `${URL_PROFILE}/${URL_PROFILE_ORDERS}`)) {
    info = "В этом разделе вы можете просмотреть свою историю заказов";
  } else if (matchPath(pathname, URL_PROFILE)) {
    info = "В этом разделе вы можете изменить свои персональные данные";
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuth) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <main className="page-container page-container-profile">
      <div className="page-container-profile-wrapper">
        <nav className="page-container-profile-sidebar ml-5 mr-15">
          <ul>
            <li>
              <NavLink to={URL_PROFILE} end>
                {({ isActive }) => (
                  <span
                    className={`text text_type_main-medium ${
                      isActive ? "text_color_primary" : "text_color_inactive"
                    }`}
                  >
                    Профиль
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_ORDERS}>
                {({ isActive }) => (
                  <span
                    className={`text text_type_main-medium ${
                      isActive ? "text_color_primary" : "text_color_inactive"
                    }`}
                  >
                    История заказов
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_LOGOUT} onClick={handleLogout}>
                {({ isActive }) => (
                  <span
                    className={`text text_type_main-medium ${
                      isActive ? "text_color_primary" : "text_color_inactive"
                    }`}
                  >
                    Выход
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_dark mt-20">
            {info}
          </p>
        </nav>
        <section style={{ flex: 1 }}>
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default Profile;
