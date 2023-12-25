import React, {useEffect, useState} from "react";
import { withAuthLayout } from "../Layout/AuthLayout/AuthLayout";
import styles from "../style/Login.module.css";
import cn from "classnames";
import { H } from "../components/Htag/Htag";
import Htag from "../components/Htag/Htag.module.css";
import { Input } from "../components/Input/Input";
import button from "../components/Button/Button.module.css";
import { Button } from "../components/Button/Button";
import {Logo} from "../components/Logo/Logo";
import {Link} from "react-router-dom";
import Captcha from "../components/Captcha/Captcha";

export const Login = () => {

  const [isCaptcha, setCaptcha] = useState(false);
  const [emailState, setEmailState] = useState("default")
  const [passwordState, setPasswordState] = useState("default")
  const openCaptcha = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]{8,}$/;

    const Email = document.querySelector('input[placeholder="E-mail"]').value;
    const Password = document.querySelector('input[placeholder="Пароль"]').value;

    if(Email && Password){
      if(emailRegex.test(Email)){
         setEmailState("default");
      }
      if(passwordRegex.test(Password)){
         setPasswordState("default");
      }
      if(emailRegex.test(Email) && passwordRegex.test(Password)){
        setCaptcha(true);
        const user = {
                      email: document.querySelector('input[placeholder="E-mail"]')?.value,
                      password: document.querySelector('input[placeholder="Пароль"]')?.value,
                    };
                    alert(JSON.stringify(user))
                    localStorage.setItem("user", JSON.stringify(user));
      } else {
        if(!emailRegex.test(Email)){
          setEmailState("error-filled");
        }
        if(!passwordRegex.test(Password)){
          setPasswordState("error-filled");
        }
      }
    } else{
      if(Email === ""){
        setEmailState("error-filled");
      }
      if(Password === ""){
        setPasswordState("error-filled");
      }
    }
  }

  return (
    <>
      <div className={cn(styles.auth)}>
        <Logo className={styles.logo}/>
        <H type={"h2"} className={cn(styles.title, Htag.h2)}>
          Вход в аккаунт
        </H>
        <div className={cn(styles.form)}>
          <Input
              type={"email"}
            className={cn(styles.input)}
            state={emailState}
            label={"E-mail"}
            placeholder={"E-mail"}
          ></Input>
          <Input
              type={"password"}
            className={cn(styles.input)}
            state={passwordState}
            label={"Пароль"}
            placeholder={"Пароль"}
          ></Input>
          <Button
            state={"default"}
            type={"primary"}
            onClick={openCaptcha}
            className={cn(
              styles.form_item_button,
              button.default,
              button.primary,
              button.button
            )}
          >
            Войти
          </Button>
          <div className={styles.after_list}>
            <H type={"body"} className={cn(styles.list_text, Htag.body)}>
              Ещё нет аккаунта?
            </H>
            <Link to={"/register"}>
              <Button state={"default"} type={"text"}>
                Зарегистрироваться
              </Button>
            </Link>
          </div>
          <div className={styles.button_forget}>
            <Link to={"/password_reset"}>
              <Button state={"default"} type={"text"}>
                Забыли пароль?
              </Button>
            </Link>
          </div>
        </div>
        {isCaptcha ? <Captcha className={styles.captcha}/> : null}
      </div>
    </>
  );
}

export default withAuthLayout(Login);
