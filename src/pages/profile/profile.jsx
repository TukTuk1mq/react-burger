import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout, fetchUser } from "../../services/user-slice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <main className="page-container page-container-profile">
      <div className="page-container-profile-wrapper">
        <nav className="page-container-profile-sidebar ml-5 mr-15">
          <ul>
            <li>
              <NavLink to="/profile" end>
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
              <NavLink to="/profile/orders">
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
              <NavLink to="/profile/logout">
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
}
