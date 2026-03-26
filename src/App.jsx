import { useRef, useEffect } from "react";
import { useStore } from "./components/useStore";
import "./App.css";

const sendFormData = (formData) => {
  console.log(formData);
};

function App() {
  const {
    state,
    updateState,
    validateEmail,
    validatePassword,
    validateRepeatPassword,
  } = useStore();

  const { email, password, repeatPassword, errors } = state;

  const onsubmit = (event) => {
    event.preventDefault();
    const { email, password, repeatPassword } = state;
    sendFormData({ email, password, repeatPassword });
  };

  const onChange = ({ target }) => {
    updateState(target.name, target.value);
  };

  const submitRef = useRef(null);

  useEffect(() => {
    const isFormValid =
      !errors.loginError &&
      !errors.passwordError &&
      !errors.repeatPasswordError &&
      email &&
      password &&
      repeatPassword;

    if (isFormValid) {
      submitRef.current?.focus();
    }
  }, [errors, email, password, repeatPassword]);

  return (
    <div className="container">
      <form className="containerForm" onSubmit={onsubmit}>
        {errors.loginError && <div className="error">{errors.loginError}</div>}
        {errors.passwordError && <div className="error">{errors.passwordError}</div>}
        {errors.repeatPasswordError && <div className="error">{errors.repeatPasswordError}</div>}
        <input
          type="email"
          name="email"
          placeholder="Почта"
          value={email}
          onChange={onChange}
          onBlur={(e) => validateEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={onChange}
          onBlur={(e) => validatePassword(e.target.value)}
        />
        <input
          type="password"
          name="repeatPassword"
          placeholder="Повторите пароль"
          value={repeatPassword}
          onChange={onChange}
          onBlur={(e) => validateRepeatPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={
            errors.loginError ||
            errors.passwordError ||
            errors.repeatPasswordError
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
