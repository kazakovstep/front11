import React, { useState } from "react";
import { withAuthLayout } from "../../Layout/AuthLayout/AuthLayout";
import styles from "../../style/password_reset.module.css";
import cn from "classnames";
import { H } from "../../components/Htag/Htag";
import Htag from "../../components/Htag/Htag.module.css";
import { Input } from "../../components/Input/Input";
import button from "../../components/Button/Button.module.css";
import { Button } from "../../components/Button/Button";
import {Logo} from "../../components/Logo/Logo";
import {Link} from "react-router-dom";
import Arrow from "../../images/arrow.svg";
function PasswordReset(): JSX.Element {
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState("default");
  const [link, setLink] = useState("");

  const handleCheckEmail = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(email)) {
      setEmailState("default");
    } else {
      setEmailState("error-filled");
    }

    if (emailRegex.test(email)) {
      setLink("/password_reset/verify");
    } else {
      setLink("");
    }
  };

  return (
    <>
      <div className={cn(styles.auth)}>
        <Logo />
        <Link to={"/register"} className={styles.back}>
          <img src={Arrow} alt={"Arrow"} />
          <Button state={"default"} type={"back"} className={cn(button.default, button.back, button.button)}>Назад</Button>
        </Link>
        <H type={"h2"} className={cn(styles.title, Htag.h2)}>
          Восстановить пароль
        </H>
        <H type={"body"} className={cn(styles.text, Htag.body)}>
          Введите e-mail, указанный при регистрации — на него<br></br>
          придет письмо с ссылкой на сброс пароля
        </H>
        <div className={cn(styles.form)}>
          <Input
            type={"email"}
            state={emailState}
            label={"E-mail"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Link to={link !== "" ? link : null}>
            <Button
              state={"default"}
              type={"primary"}
              className={cn(styles.form_item_button, button.default, button.primary, button.button)}
              onClick={handleCheckEmail}
            >
              Отправить ссылку
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default withAuthLayout(PasswordReset);
