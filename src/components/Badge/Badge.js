import styles from './Badge.module.css';
import cn from "classnames";
import Htag from "../Htag/Htag.module.css"
export const Badge = ({ type, children,checked,onChange, size = "default", className, ...props }) => {

    const handleClick = () => {
        if (onChange) {
            onChange(children);
        }
  };

    switch (type) {
    case "category": {
      return (
        <>
          {children && <input className={cn(styles.input, styles.category)} id={children.toString()} type="checkbox" checked={checked} onChange={handleClick}/>}
          <label
            htmlFor={children?.toString()}
            className={cn(styles.div, className, Htag.body, {
              [styles.category]: type === "category",
            })}

          >
            {children}
          </label>
        </>
      );
    }
    case "tag": {
      return (
        <>
          {children && <input className={cn(styles.input, styles.tag)} id={children.toString()} type="checkbox" checked={checked} onChange={handleClick}/>}
          <label
            htmlFor={children?.toString()}
            className={cn(styles.div, className, Htag.body, {
              [styles.tag]: type === "tag",
            })}
          >
            {children}
          </label>
        </>
      );
    }
    default:
      return <></>;
  }
};