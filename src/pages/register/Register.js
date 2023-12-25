import React, {useState} from "react";
import styles from "../../style/register.module.css";
import cn from "classnames";
import { H } from "../../components/Htag/Htag";
import Htag from "../../components/Htag/Htag.module.css";
import { Input } from "../../components/Input/Input";
import button from "../../components/Button/Button.module.css";
import { Button } from "../../components/Button/Button";
import { withAuthLayout } from "../../Layout/AuthLayout/AuthLayout";
import {Logo} from "../../components/Logo/Logo";
import {Link} from "react-router-dom";

function RegisterIndex(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailState, setEmailState] = useState("default");
  const [passwordState, setPasswordState] = useState("default");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

   const handleCreateAccount = () => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]{8,}$/;

  if (emailRegex.test(email)) {
  setEmailState("default");
  setEmailValid(true);
  } else {
  setEmailState("error-filled");
  setEmailValid(false);
  }

  if (passwordRegex.test(password)) {
  setPasswordState("default");
  setPasswordValid(true);
  } else {
  setPasswordState("error-filled");
  setPasswordValid(false);
  }

  if (emailRegex.test(email) && passwordRegex.test(password)){
    localStorage.setItem("user", JSON.stringify({ email, password }));
    window.location.href = "Filmheros/";
  }
};

  return (
      <>
        <div className={cn(styles.auth)}>
          <Logo className={styles.logo}/>
          <H type={"h2"} className={cn(styles.title, Htag.h2)}>
            Создайте аккаунт,<br></br> чтобы начать
          </H>
          <div className={cn(styles.form)}>
            <Input
                type={"email"}
                className={cn(styles.input)}
                state={emailState}
                label={"E-mail"}
                placeholder={"E-mail"}
                value={email}
                hint={isEmailValid ? "" : "Неверный электронный адрес"}
                onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
                type={"password"}
                className={cn(styles.input)}
                state={passwordState}
                label={"Пароль"}
                placeholder={"Пароль"}
                value={password}
                hint={isPasswordValid ? "Верхний/нижний регистр, цифры, спец.знак, 8 символов" : "Неверный пароль"}
                onChange={(e) => setPassword(e.target.value)}
            ></Input>
              <Button
                  state={"default"}
                  type={"primary"}
                  className={cn(
                      styles.form_item_button,
                      button.default,
                      button.primary,
                      button.button
                  )}
                  onClick={handleCreateAccount}
              >
                Создать аккаунт
              </Button>
            <div className={styles.after_list}>
              <H type={"body"} className={cn(styles.list_text, Htag.body)}>
                Уже есть аккаунт?
              </H>
              <Link to={"/login"}>
                <Button state={"default"} type={"text"}>
                  Войти
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
  );
}

export default withAuthLayout(RegisterIndex);
