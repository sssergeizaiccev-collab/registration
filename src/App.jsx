import { useRef, useState } from "react";
import { UseStore } from "./components/UseStore";
import "./App.css";

const sendFormData = (formData) => {
  console.log(formData);
};

function App() {
  const { getState, updateState } = UseStore();
  const [loginError, setLoginError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);

  const { email, password, repeatPassword } = getState();

  const onsubmit = (event) => {
    event.preventDefault();
    sendFormData(getState());
  };

  const onChange = ({ target }) => {
    updateState(target.name, target.value);
  };

  const onLoginBlur = ({ target }) => {
    updateState(target.name, target.value);
    let error = null;

    if (!/\S+@\S+\.\S+/.test(target.value)) {
      error = "Не верный логин почты.";
    } else if (target.value.length > 30) {
      error = "Не верный логин почты. Максимальная длина логина 30 символов";
    }

    setLoginError(error);
    checkFormAndFocus(
      loginError,
      passwordError,
      repeatPasswordError,
      password,
      repeatPassword,
    );
  };

  const onPasswordBlur = ({ target }) => {
    updateState(target.name, target.value);
    let error = null;

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&*?_]).{8,}$/.test(target.value)) {
      error =
        "Пароль должен содержать: минимум 8 символов, 1 заглавную букву, 1 цифру и спецсимвол";
    }

    setPasswordError(error);
    checkFormAndFocus(
      loginError,
      passwordError,
      repeatPasswordError,
      password,
      repeatPassword,
    );
  };

  const onRepeatPasswordBlur = ({ target }) => {
    updateState(target.name, target.value);
    let error = null;

    if (target.value !== getState().password) {
      error = "Пароли не совпадают";
    }

    setRepeatPasswordError(error);
    checkFormAndFocus(
      loginError,
      passwordError,
      repeatPasswordError,
      password,
      repeatPassword,
    );
  };

  const submitRef = useRef(null);

  const checkFormAndFocus = (
    loginError,
    passwordError,
    repeatPasswordError,
    password,
    repeatPassword,
  ) => {
    if (
      password === repeatPassword &&
      !loginError &&
      !passwordError &&
      !repeatPasswordError
    ) {
      submitRef.current?.focus();
    }
  };

  return (
    <div className="container">
      <form className="containerForm" onSubmit={onsubmit}>
        {loginError && <div>{loginError}</div>}
        {passwordError && <div>{passwordError}</div>}
        {repeatPasswordError && <div>{repeatPasswordError}</div>}
        <input
          type="email"
          name="email"
          placeholder="Почта"
          value={email}
          onChange={onChange}
          onBlur={onLoginBlur}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={onChange}
          onBlur={onPasswordBlur}
        />
        <input
          type="password"
          name="repeatPassword"
          placeholder="Повторите пароль"
          value={repeatPassword}
          onChange={onChange}
          onBlur={onRepeatPasswordBlur}
        />
        <button
          type="submit"
          disabled={
            loginError !== null ||
            passwordError !== null ||
            repeatPasswordError !== null
          }
          ref={submitRef}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
