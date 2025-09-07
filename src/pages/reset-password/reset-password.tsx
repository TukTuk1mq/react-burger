import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { URL_FORGOT_PASSWORD, URL_LOGIN, URL_ROOT } from "../../utils/routes";
import { useAppSelector } from "../../services/hooks";
import { request } from "../../utils/api";
import { useForm } from "../../hooks/useForm";
import type { RootState } from "../../services/store";

interface FormValues {
  password: string;
  token: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const ResetPassword: React.FC = () => {
  const { values, handleChange } = useForm<FormValues>({
    password: "",
    token: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state: RootState) => state.user);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data: ApiResponse = await request("/password-reset/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: values.password,
          token: values.token,
        }),
      });

      if (!data.success) {
        throw new Error(data.message || "Ошибка при сбросе пароля");
      }

      navigate(URL_LOGIN);
      alert("Пароль успешно изменён");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
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
      navigate(URL_FORGOT_PASSWORD, { replace: true });
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
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Введите новый пароль"
          extraClass="mb-6"
          icon="ShowIcon"
        />

        <Input
          type="text"
          name="token"
          value={values.token}
          onChange={handleChange}
          placeholder="Введите код из письма"
          extraClass="mb-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />

        <Button
          type="primary"
          htmlType="submit"
          extraClass="mb-20"
          size="medium"
          disabled={loading}
        >
          {loading ? "Сохранение..." : "Сохранить"}
        </Button>

        {error && (
          <p className="text text_type_main-default text_color_error mb-4">
            {error}
          </p>
        )}

        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={URL_LOGIN} className="page-link">
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
};

export default ResetPassword;
