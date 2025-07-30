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

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name }));
  };

  useEffect(() => {
    if (isAuth) navigate(URL_ROOT);
  }, [isAuth, navigate]);

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        <>
          <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
          <Input
            placeholder="Имя"
            extraClass="mb-6"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <EmailInput
            extraClass="mb-6"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            extraClass="mb-6"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
