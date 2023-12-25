import React, {useState} from "react";
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

function NewPassword(): JSX.Element {

    const [password, setPassword] = useState("");
    const [passwordState, setPasswordState] = useState("default");

    const [link, setLink] = useState("");

    const handleCreatePassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]{8,}$/;

  if (passwordRegex.test(password)) {
  setPasswordState("default");
  } else {
  setPasswordState("error-filled");
  }

  if (passwordRegex.test(password)) {
      setLink("/login");
    } else {
      setLink("");
    }
};


  return (
    <>
      <div className={cn(styles.auth)}>
        <Logo/>
        <H type={"h2"} className={cn(styles.title, Htag.h2)}>
          Придумайте<br></br>новый пароль
        </H>
        <div className={cn(styles.form)}>
          <Input
              type={"password"}
            className={cn(styles.input)}
            state={passwordState}
            label={"Пароль"}
            placeholder={"Пароль"}
              hint={"Верхний/нижний регистр, цифры, спец.знак, 8 символов"}
              onChange={(e) => setPassword(e.target.value)}
          ></Input>
             <Link to={link !== "" ? link : null}>
                      <Button
                  state={"default"}
                  type={"primary"}
                  className={cn(
                    styles.form_item_button,
                    button.default,
                    button.primary,
                    button.button
                  )}
                  onClick={handleCreatePassword}
                >
                  Сохранить
                      </Button></Link>
        </div>
      </div>
    </>
  );
}

export default withAuthLayout(NewPassword);
