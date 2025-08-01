import React, { useState, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  URL_FORGOT_PASSWORD,
  URL_REGISTER,
  URL_ROOT,
} from "../../utils/routes";
import { setCookie } from "../../utils/cookie";
import { loginUser } from "../../services/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, error } = useSelector((state) => state.user);

  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (isAuth) {
      const redirectPath = location.state?.from?.pathname || URL_ROOT;
      navigate(redirectPath, { replace: true });
    }
  }, [isAuth, navigate, location]);

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <EmailInput
          extraClass="mb-6"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          extraClass="mb-6"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <Button type="primary" extraClass="mb-20" htmlType="submit">
          Войти
        </Button>

        {error && (
          <p className="text text_type_main-default text_color_error">
            {error}
          </p>
        )}
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?{" "}
          <Link className="page-link" to={URL_REGISTER}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link className="page-link" to={URL_FORGOT_PASSWORD}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
