import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { URL_LOGIN, URL_ROOT } from "../../utils/routes";
import { useSelector } from "react-redux";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        "https://norma.nomoreparties.space/api/password-reset/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, token }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Ошибка");
      navigate(URL_LOGIN);
      alert("Пароль успешно изменён");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate(URL_ROOT, { replace: true });
      return;
    }
    if (localStorage.getItem("resetPasswordAllowed") !== "true") {
      navigate("/forgot-password", { replace: true });
    }
    return () => {
      localStorage.removeItem("resetPasswordAllowed");
    };
  }, [isAuth, navigate]);

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <PasswordInput
          extraClass="mb-6"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите новый пароль"
        />
        <Input
          extraClass="mb-6"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Введите код из письма"
        />
        <Button
          type="primary"
          extraClass="mb-20"
          htmlType="submit"
          disabled={loading}
        >
          {loading ? "Сохранение..." : "Сохранить"}
        </Button>
        {error && (
          <p className="text text_type_main-default text_color_error">
            {error}
          </p>
        )}
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <a href={URL_LOGIN} className="page-link">
            Войти
          </a>
        </p>
      </form>
    </main>
  );
}

export default ResetPassword;
