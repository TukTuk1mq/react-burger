import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  resetUserEdit,
  fetchUser,
} from "../../services/user-slice";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isChanged, setIsChanged] = useState(false);

  const [initialUser, setInitialUser] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: "" });
      setInitialUser({ name: user.name, email: user.email });
      setIsChanged(false);
    }
  }, [user]);

  useEffect(() => {
    if (
      form.name !== initialUser.name ||
      form.email !== initialUser.email ||
      form.password !== ""
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [form, initialUser]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { name: form.name, email: form.email };
    if (form.password) payload.password = form.password;
    dispatch(updateUser(payload));
    setIsChanged(false);
  };

  const onReset = (e) => {
    e.preventDefault();
    dispatch(resetUserEdit());
    setForm({ name: initialUser.name, email: initialUser.email, password: "" });
    setIsChanged(false);
  };

  if (!user) {
    return <p>Загрузка...</p>;
  }

  return (
    <form
      className="page-container-inner"
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <Input
        extraClass="mb-6"
        name="name"
        placeholder="Имя"
        icon="EditIcon"
        value={form.name}
        onChange={onChange}
      />
      <EmailInput
        extraClass="mb-6"
        name="email"
        icon="EditIcon"
        value={form.email}
        onChange={onChange}
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        icon="EditIcon"
        value={form.password}
        onChange={onChange}
      />
      {isChanged && (
        <div>
          <Button type="primary" htmlType="reset">
            Отмена
          </Button>
          <Button
            type="primary"
            extraClass="ml-5"
            htmlType="submit"
            disabled={isLoading}
          >
            Сохранить
          </Button>
        </div>
      )}
      {error && (
        <p className="text text_type_main-default text_color_error">{error}</p>
      )}
    </form>
  );
}
