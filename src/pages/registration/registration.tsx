import React, { useEffect, FormEvent } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { URL_LOGIN, URL_ROOT } from "../../utils/routes";
import { registerUser } from "../../services/user-slice";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useForm } from "../../hooks/useForm";
import type { AppDispatch, RootState } from "../../services/store";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, error } = useAppSelector((state: RootState) => state.user);

  const { values, handleChange } = useForm<FormValues>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };

  useEffect(() => {
    if (isAuth) {
      navigate(URL_ROOT);
    }
  }, [isAuth, navigate]);

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

        <div className="mb-6">
          <Input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Имя"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className="mb-6">
          <EmailInput
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="E-mail"
            isIcon={true}
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Пароль"
            icon="ShowIcon"
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          extraClass="mb-20"
          size="medium"
        >
          Зарегистрироваться
        </Button>

        {error && (
          <p className="text text_type_main-default text_color_error mb-4">
            {error}
          </p>
        )}

        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link className="page-link" to={URL_LOGIN}>
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Registration;
