import React, {useEffect, useRef, useState} from 'react';
import styles from "./Captcha.module.css"
import {H} from "../Htag/Htag";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import InputStyle from "../Input/Input.module.css"
import HStyle from "../Htag/Htag.module.css"
import cn from "classnames";

const Captcha = ({className, ...props}) => {
    const [attempt, setAttempt] = useState(1);
    const inputRef = useRef(null);
      const [isError, setError] = useState(false);

      function generateRandomString(length) {
          const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
          let randomString = '';

          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
          }

          return randomString;
      }
        const randomString = generateRandomString(5);
      const handleCheck = () => {
          const Answer = document.querySelector('input[placeholder="Введите CAPTCHA"]').value;
          if(attempt === 1){
             if(randomString === Answer){
                window.location.href = "Filmheros/";
              } else {
                 setError(true);
                  setAttempt(2);
              }
          } else {
              if(randomProblemAnswer === parseInt(Answer,10)){
                    window.location.href = "Filmheros/";
              } else {
                  setError(true);
                  setAttempt(1);
              }
          }
      }

      const N = Math.floor(Math.random() * 10) + 1;
      const M = Math.floor(Math.random() * 10) + 1;
      const randomProblemAnswer = N + M;
      function generateRandomProblem() {
          return `${N} + ${M}`;
      }
      const randomProblem = generateRandomProblem();


      return(
          <div className={cn(styles.captcha, className)}>
              <H type={"h2"}>CAPTCHA</H>
              {attempt===1 ?
                  <>
                      <H type={"h3"} className={cn(HStyle.h3, styles.copy)}>Введите данную строку: {randomString}</H>
                      <div className={styles.form}>
                          <Input type={"text"} state={"default"} placeholder={"Введите CAPTCHA"} ref={inputRef} hint={isError ? <p className={InputStyle.p_error_filled}>Неверная капча</p> : null}/>
                          <Button type={"primary"} state={"default"} onClick={handleCheck}>Проверить</Button>
                      </div>
                  </> :
                  <>
                      <H type={"h3"} className={cn(HStyle.h3, styles.copy)}>Введите данную строку: {randomProblem}</H>
                      <div className={styles.form}>
                          <Input type={"text"} state={"default"} placeholder={"Введите CAPTCHA"} ref={inputRef} hint={isError ? <p className={InputStyle.p_error_filled}>Неверная капча</p> : null}/>
                          <Button type={"primary"} state={"default"} onClick={handleCheck}>Проверить</Button>
                      </div>
                  </>}
          </div>
      );
};

export default Captcha;