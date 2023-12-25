import BellSVG from "../../images/bell.svg";
import styles from "./Bell.module.css"
import cn from "classnames";
import {useEffect, useState} from "react";
import {Button} from "../Button/Button";
import {H} from "../Htag/Htag";
import {Input} from "../Input/Input";
export const Bell = (className) => {

    const [isPressed, setPressed] = useState(false);
    const[isPressed2, setPressed2] = useState(false);
    const[isPressedClose, setPressedClose] = useState(false);

    const handleClick = () => {
      setPressed(true);
    };

    const handleClick2 = () => {
        setPressed2(true);
    }

    const handleClose = () => {
        setPressedClose(true);
    }

    ////////////////////////////////////////////////////////////////////////////////
    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationTexts, setNotificationTexts] = useState([]);


    /*useEffect(() => {
      let interval;

      if (isPressed) {
        setTimeout(() => {
          interval = setInterval(() => {
            const texts = ['Появились новые статьи!', 'Вышло обновление!', 'Новые сообщения!', 'Уведомление о событии!'];
            const randomText = texts[Math.floor(Math.random() * texts.length)];
            setNotificationTexts(prevTexts => [...prevTexts, randomText]);
            setNotificationCount(prevCount => prevCount + 1);
          }, 3000);
        }, 10000);
      } else {
        interval = setInterval(() => {
          const texts = ['Появились новые статьи!', 'Вышло обновление!', 'Новые сообщения!', 'Уведомление о событии!'];
          const randomText = texts[Math.floor(Math.random() * texts.length)];
          setNotificationTexts(prevTexts => [...prevTexts, randomText]);
          setNotificationCount(prevCount => prevCount + 1);
        }, 3000);
      }

      return () => {
        clearInterval(interval);
      };
    }, [isPressed]);*/


    const showNotification = (options) => {
      const notification = document.createElement('div');
      notification.classList.add('notification');
      notification.textContent = options.content;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
        handleRemoveNotification(options.content);
      }, 1500);
      setNotificationTexts(prevTexts => [...prevTexts, options.content]);
      setNotificationCount((prevCount) => prevCount + 1);
    };
    const handleRemoveNotification = (content) => {
      setNotificationTexts(prevTexts => prevTexts.filter(text => text !== content));
      setNotificationCount(prevCount => prevCount - 1);
    }


    const handleAddNote = () => {
        const inputValue = document.querySelector('input[placeholder="Добавить"]')?.value;
        showNotification({content: inputValue});
    }

    return (
    <>
        <div className={cn(styles.bell_container, className, { [styles.active]: isPressed, [styles.active2]: isPressedClose })} onClick={handleClick}>
            {(isPressed && !isPressed2) ?
                <>
                    <div className={cn(styles.question_container, { [styles.close]: isPressed2 })}>
                        {/*<H type={"body-bold"}>Какой фильм вы смотрели в последний раз?</H>*/}
                        {/*<div className={styles.column}>*/}
                        {/*    <Button type={"primary"} state={"default"} onClick={handleClick2}>Комедия</Button>*/}
                        {/*    <Button type={"primary"} state={"default"} onClick={handleClick2}>Детектив</Button>*/}
                        {/*    <Button type={"primary"} state={"default"} onClick={handleClick2}>Фантастика</Button>*/}
                        {/*    <Button type={"primary"} state={"default"} onClick={handleClick2}>Ужасы</Button>*/}
                        {/*    <Button type={"primary"} state={"default"} onClick={handleClick2}>Приключения</Button>*/}
                        {/*    <Button type={"primary"} state={"default"} onClick={handleClick2}>Боевик</Button>*/}
                        {/*</div>*/}
                        <Input state={"default"} placeholder={"Добавить"}/>
                        <Button state={"default"} type={"primary"} onClick={handleAddNote}>Добавить</Button>
                        {notificationTexts.map((text, index) => (
                          <Button key={index} state={"default"} type={"primary"} onClick={handleClick2}>{text}</Button>
                        ))}
                    </div>
                </>
                : ((isPressed2 && !isPressedClose) ?
                    <div className={cn(styles.question_container_2)}>
                        <H type={"h3"}>Спасибо за уделенное время!</H>
                        <Button type={"secondary"} state={"default"} onClick={handleClose}>Закрыть</Button>
                    </div>
                    : (isPressedClose ? <img src={BellSVG} alt={"Bell"}/> : <img src={BellSVG} alt={"Bell"}/>)
                    )}
            <div className={styles.count}>
                {notificationCount}
            </div>
        </div>
    </>
);
};