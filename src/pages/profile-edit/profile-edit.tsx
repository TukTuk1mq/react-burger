import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
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
import type { AppDispatch, RootState } from "../../services/store";

interface UserFormValues {
  name: string;
  email: string;
  password: string;
}

const ProfileEdit: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  const { values, handleChange, setValues } = useForm<UserFormValues>({
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setIsChanged(
      values.name !== initialUser.name ||
        values.email !== initialUser.email ||
        e.target.value !== "" ||
        values.password !== ""
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: values.name,
      email: values.email,
      ...(values.password && { password: values.password }),
    };
    dispatch(updateUser(payload));
  };

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        name="name"
        value={values.name}
        onChange={handleInputChange}
        placeholder="Имя"
        icon="EditIcon"
        extraClass="mb-6"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <EmailInput
        name="email"
        value={values.email}
        onChange={handleInputChange}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput
        name="password"
        value={values.password}
        onChange={handleInputChange}
        placeholder="Пароль"
        icon="EditIcon"
        extraClass="mb-6"
      />
      {isChanged && (
        <div className="mt-6">
          <Button type="secondary" htmlType="reset" size="medium">
            Отмена
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="medium"
            extraClass="ml-6"
            disabled={isLoading}
          >
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      )}
      {error && (
        <p className="text text_type_main-default text_color_error mt-6">
          {error}
        </p>
      )}
    </form>
  );
};

export default ProfileEdit;
