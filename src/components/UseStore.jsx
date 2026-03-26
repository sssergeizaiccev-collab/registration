import { useState } from "react";

export const useStore = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    errors: {
      loginError: null,
      passwordError: null,
      repeatPasswordError: null,
    },
  });

  const updateState = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setError = (field, error) => {
    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: error,
      },
    }));
  };

  const validateEmail = (value) => {
    let error = null;

    if (!/\S+@\S+\.\S+/.test(value)) {
      error = "Не верный логин почты.";
    } else if (value.length > 30) {
      error = "Не верный логин почты. Максимальная длина логина 30 символов";
    }

    setError('loginError', error);
  };

  const validatePassword = (value) => {
    let error = null;

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*?_]).{8,}$/.test(value)) {
      error =
        "Пароль должен содержать: минимум 8 символов, 1 заглавную букву, 1 цифру и спецсимвол";
    }

    setError('passwordError', error);
  };

  const validateRepeatPassword = (value) => {
    let error = null;

    if (value !== state.password) {
      error = "Пароли не совпадают";
    }

    setError('repeatPasswordError', error);
  };

  return {
    state,
    updateState,
    validateEmail,
    validatePassword,
    validateRepeatPassword,
  };
};
