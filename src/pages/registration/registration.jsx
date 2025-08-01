import React, { useState, useEffect } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { URL_LOGIN, URL_ROOT } from "../../utils/routes";
import { registerUser } from "../../services/user-slice";
import { setCookie } from "../../utils/cookie";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, error } = useSelector((state) => state.user);

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
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
    if (isAuth) navigate(URL_ROOT);
  }, [isAuth, navigate]);

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        <>
          <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
          <Input name="name" value={values.name} onChange={handleChange} />
          <EmailInput
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            value={values.password}
            onChange={handleChange}
          />

          <Button type="primary" extraClass="mb-20" htmlType="submit">
            Зарегистрироваться
          </Button>
          {error && (
            <p className="text text_type_main-default text_color_error">
              {error}
            </p>
          )}

          <p className="text text_type_main-default text_color_inactive mb-4">
            Уже зарегистрированы?{" "}
            <Link className="page-link" to={URL_LOGIN}>
              Войти
            </Link>
          </p>
        </>
      </form>
    </main>
  );
}

export default Registration;
