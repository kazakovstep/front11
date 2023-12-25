import styles from "./Filter.module.css";
import cn from "classnames";
import React from "react";
import Arrow from "../../images/arrow_down.svg";
import {H} from "../Htag/Htag";
import {Input} from "../Input/Input";
import {Badge} from "../Badge/Badge";
import {useState} from "react";

const tags = [
    "Мужчина",
    "Женщина",
    "Существо"
];

const categories = [
  "Супергерои",
    "Песонажи боевиков",
    "Персонажи комедии",
    "Персонажи детективов",
    "Персонажи ужасов",
    "Персонажи фантастики",
    "Персонажи приключений"
];

export const Filter = ({state = "default",
                        type,
                        className,
                           ...props
                       }): JSX.Element => {
    const[visibleTags, setVisibleTags] = useState(false);
    const[visibleCategories, setVisibleCategories] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(false);
    const handleVisibleTagsClick = () => {
        setVisibleTags(!visibleTags);
        setArrowRotation(!arrowRotation);
    }

    const handleVisibleCategoriesClick = () => {
        setVisibleCategories(!visibleCategories);
        setArrowRotation(!arrowRotation);
    }

    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const paramValue = param.get('category');

    const [selectedCategories, setSelectedCategories] = useState(paramValue ? [paramValue] : []);

    const handleBadgeChangeCategories = (value: string) => {
      if (selectedCategories.includes(value)) {
        setSelectedCategories(selectedCategories.filter((item) => item !== value));
      } else {
        if (selectedCategories.length < 1) {
          setSelectedCategories([...selectedCategories, value]);
        }
      }
    };


    return (
        <div className={cn(styles.filter_container, className)}>
            <div className={styles.filter} onClick={
                type === "tags" ? handleVisibleTagsClick : handleVisibleCategoriesClick
            }>
                <div>
                {type === "category" ? <H type={"body"}>Категории</H> :
                    <H type={"body"}>Теги</H>}
                </div>
                    <img src={Arrow} alt={"arrow"} className={cn(styles.arrowIcon, {
                        [styles.arrow]: arrowRotation,
                    })}/>
            </div>
            {type === "tags" ?
                    <div className={cn({
                        [styles.tags_click_sex]: visibleTags,
                        [styles.tags_sex]: !visibleTags,
                    })}>
                        <div className={cn(styles.badge_list)}>
                            {tags.map((tag, index) => (
                                <Badge key={index} type="tag" size="small">
                                  {tag}
                                </Badge>
                              ))}
                        </div>
                    </div>
                    :
                        <div className={cn({
                        [styles.tags_click]: visibleCategories,
                        [styles.tags]: !visibleCategories,
                    })}>
                        <div className={cn(styles.badge_list)}>
                            {categories.map((category, index) => (
                              <Badge key={index} type="category" size="small" checked={selectedCategories.includes(category)}
                                     onChange={handleBadgeChangeCategories}>
                                {category}
                              </Badge>
                            ))}
                        </div>
                    </div>}
                <></>
        </div>
    );
};
