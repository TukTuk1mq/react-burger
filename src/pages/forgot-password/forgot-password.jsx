import React, { useState } from "react";
import { URL_LOGIN, URL_RESET_PASSWORD } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        "https://norma.nomoreparties.space/api/password-reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Ошибка");
      localStorage.setItem("resetPasswordAllowed", "true");
      navigate(URL_RESET_PASSWORD);
      alert("Проверьте почту");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        <>
          <h1 className="text text_type_main-medium mb-6">
            Восстановление пароля
          </h1>
          <EmailInput
            extraClass="mb-6"
            placeholder="Укажите e-mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="primary" extraClass="mb-20" htmlType="submit">
            Восстановить
          </Button>

          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{" "}
            <Link className="page-link" to={URL_LOGIN}>
              Войти
            </Link>
          </p>
        </>
      </form>
    </main>
  );
}

export default ForgotPassword;
