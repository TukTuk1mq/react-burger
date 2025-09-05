import React, { useEffect, FormEvent } from "react";
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
import { loginUser } from "../../services/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import type { AppDispatch, RootState } from "../../services/store";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, error } = useSelector((state: RootState) => state.user);

  const { values, handleChange } = useForm<FormValues>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
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

        <div className="mb-6">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <EmailInput
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="sr-only">
            Пароль
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>

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
};

export default Login;
