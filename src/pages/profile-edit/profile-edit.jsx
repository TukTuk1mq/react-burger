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
import { useForm } from "../../hooks/useForm";

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [initialUser, setInitialUser] = useState({ name: "", email: "" });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setValues({ name: user.name, email: user.email, password: "" });
      setInitialUser({ name: user.name, email: user.email });
      setIsChanged(false);
    }
  }, [user, setValues]);

  useEffect(() => {
    if (
      values.name !== initialUser.name ||
      values.email !== initialUser.email ||
      values.password !== ""
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [values, initialUser]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { name: values.name, email: values.email };
    if (values.password) payload.password = values.password;
    dispatch(updateUser(payload));
    setIsChanged(false);
  };

  const onReset = (e) => {
    e.preventDefault();
    dispatch(resetUserEdit());
    setValues({
      name: initialUser.name,
      email: initialUser.email,
      password: "",
    });
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
        value={values.name}
        onChange={handleChange}
      />
      <EmailInput
        extraClass="mb-6"
        name="email"
        icon="EditIcon"
        value={values.email}
        onChange={handleChange}
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        icon="EditIcon"
        value={values.password}
        onChange={handleChange}
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
