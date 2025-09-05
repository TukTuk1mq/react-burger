import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../services/user-slice";
import {
  URL_LOGIN,
  URL_PROFILE,
  URL_PROFILE_LOGOUT,
  URL_PROFILE_ORDERS,
} from "../../utils/routes";
import type { AppDispatch, RootState } from "../../services/store";

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.user);

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
        </nav>
        <section style={{ flex: 1 }}>
          <Outlet />
        </section>
      </div>
    </main>
  );
};


export default Profile;
