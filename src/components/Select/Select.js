import styles from "./Select.module.css";
import cn from "classnames";
import React, {useState, useRef, useEffect} from "react";
import Arrow from "../../images/arrow_down.svg";

export const Select = ({state = "default",
                        hint,
                        className,
                        children,
                        placeholder,
                        searchPlaceholder,
    onChange,
                        value,
                           ...props
                       }) => {
    const [isFocused,
           setIsFocused] = useState(false);
    const [selectedValue,
           setSelectedValue] = useState("");
    const [isOptionsVisible,
           setIsOptionsVisible] = useState(false);
    const inputRef = useRef(null);
  const [isFilled, setIsFilled] = useState(!!value);

    const handleToggleOptions = () => {
        setIsOptionsVisible(!isOptionsVisible);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleOptionClick = (value: string) => {
        setSelectedValue(value);
        setIsOptionsVisible(false);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
        setIsOptionsVisible(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

     useEffect(() => {
    setSelectedValue(value || "");
    setIsFilled(!!value);
  }, [value]);

    const isDisabledEmpty = state === "disabled-empty";
    const isDisabledFilled = state === "disabled-filled";

    return (
        <>
            <div className={cn(styles.selectWrapper,className)}>
            <div className={cn(styles.inputContainer)}>
                <input
                    ref={inputRef}
                    type="text"
                    className={cn(styles.select, {
                        [styles.default]: state === "default",
                        [styles.filled]: isFilled || selectedValue!=="",
                        [styles.error_filled]: state === "error-filled",
                        [styles.disabled_empty]: isDisabledEmpty,
                        [styles.disabled_filled]: isDisabledFilled,
                        [styles.p_filled]: selectedValue !== "",
                    })}
                    value={selectedValue}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    readOnly
                    {...props}
                />
                <img src={Arrow} alt={"Arrow"}
                    className={cn(styles.arrowIcon, {
                        [styles.arrowIcon_open]: isOptionsVisible,
                    })}
                    onClick={handleToggleOptions}
                />
            </div>
            <div>
                    <ul
                    className={cn(styles.optionsList, {
                        [styles.optionsListVisible]: isOptionsVisible,
                    })}
                >
                    {searchPlaceholder}
                    {children &&
                        React.Children.map(children, (child, index) => {
                            if (React.isValidElement(child)) {
                                return (
                                    <li
                                        key={index}
                                        className={cn(styles.option, {
                                            [styles.selected]: child.props.value === selectedValue,
                                        })}
                                        onClick={() => handleOptionClick(child.props.value)}
                                    >
                                        {child.props.children}
                                    </li>
                                );
                            }
                            return null;
                        })}
                </ul>
            </div>

            {!hint || hint === "" || hint === undefined ? null : (
                <p
                    className={cn(styles.p, className, {
                        [styles.p_default]: state === "default",
                        [styles.p_focus]: isFocused,
                        [styles.p_filled]: state === "filled",
                        [styles.p_error_filled]: state === "error-filled",
                        [styles.p_disabled_empty]: isDisabledEmpty,
                        [styles.p_disabled_filled]: isDisabledFilled,
                    })}
                >
                    {hint}
                </p>
            )}
            </div>
        </>
    );
};
