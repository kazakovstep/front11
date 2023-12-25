import React from "react";
import { withAuthLayout } from "../../Layout/AuthLayout/AuthLayout";
import styles from "../../style/password_reset.module.css";
import cn from "classnames";
import { H } from "../../components/Htag/Htag";
import Htag from "../../components/Htag/Htag.module.css";
import button from "../../components/Button/Button.module.css";
import { Button } from "../../components/Button/Button";
import {Logo} from "../../components/Logo/Logo";
import {Link} from "react-router-dom";
import Arrow from "../../images/arrow.svg"
function verify(): JSX.Element {
  return (
    <>
      <div className={cn(styles.auth)}>
        <Logo/>
          <Link to={"/password_reset"} className={styles.back}>
              <img src={Arrow} alt={"arrow"}/>
            <Button state={"default"}
                    type={"back"}
                    className={cn(
                      button.default,
                      button.back,
                      button.button
                    )}>Назад</Button></Link>
        <H type={"h2"} className={cn(styles.title, Htag.h2)}>
          Проверьте<br></br>указанный e-mail
        </H>
        <H type={"body"} className={cn(styles.text, Htag.body)}>Если письма нет, или вы не помните e-mail,<br></br> указанный при регистрации, <span className={cn(styles.text_a, Htag.body)}>свяжитесь с нами</span></H>
        <div className={cn(styles.form)}>
            <Link to={"/login"}>
                    <Button
                state={"default"}
                type={"primary"}
                className={cn(
                  styles.form_item_button,
                  button.default,
                  button.primary,
                  button.button
                )}
              >
                Вернуться на главную
              </Button>
            </Link>
        </div>
      </div>
    </>
  );
}

export default withAuthLayout(verify);
