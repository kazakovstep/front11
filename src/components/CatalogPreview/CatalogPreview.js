import styles from "./CatalogPreview.module.css";
import cn from "classnames";
import {H} from "../Htag/Htag";
import HStyle from "../Htag/Htag.module.css"
import {Badge} from "../Badge/Badge";
import {Button} from "../Button/Button";
import Eye from "../../images/eye.svg";
import Heart from "../../images/heart.svg"
import BadgeStyle from "../Badge/Badge.module.css"
import React, {useEffect, useState} from "react";
import Favourite from "../../images/favourite.svg"
import Spider from "./spider-man.jpg"
import {Link} from "react-router-dom";
export const CatalogPreview = ({
  children,
    className,
    data,
    link,
    status = "actual",
  ...props
}): JSX.Element => {

  const[isFavorite, setFavorite] = useState(false);

  const handleSetFavorite = (event) => {
    setFavorite(!isFavorite);
  };

   const [advertsData, setAdvertsData] = useState();
   useEffect(()=>{
       setAdvertsData(data);
   },[data])


  return (
      <>
          <div className={cn(styles.actual_block)}>
              <Link to={link} className={cn(styles.link_block)}>
                  <div className={cn(styles.img_container)}>
                        <img src={advertsData?.heroPics[0] ?? Spider} alt={"Spider"} className={styles.img}/>
                  </div>
                  <div className={cn(styles.info_container)}>
                      <div className={styles.title_block}>
                          <H type={"h3"}>{advertsData?.heroName ?? "Человек-паук"}</H>
                      </div>
                      <div className={styles.description_block}>
                          <H type={"body"} className={cn(HStyle.body, styles.description)}>{advertsData?.heroDesc ?? "Питер Паркер – обыкновенный школьник. Однажды он отправился с классом на экскурсию, где его кусает странный паук-мутант. Через время парень почувствовал в себе нечеловеческую силу и ловкость в движении, а главное – умение лазать по стенам и метать стальную паутину."}</H>
                      </div>
                      <div className={styles.badges}>
                          <div className={styles.badge_row}>
                            <Badge
                              type={"category"}
                              className={cn(BadgeStyle.category, styles.category)}
                            >
                                {advertsData?.selectedCategories ?? "Супергерой"}
                            </Badge>
                            <Badge
                              type={"tag"}
                              className={cn(BadgeStyle.tag, styles.tag)}
                            >
                              {advertsData?.selectedTags ?? "Мужчина"}
                            </Badge>
                          </div>
                      </div>
                  </div>
              </Link>
            <div className={styles.like_container}>
                <div className={styles.stats_blocks}>
                     <div className={styles.stats_block}>
                         {isFavorite ? <img src={Favourite} alt={"FavouriteHeart"}/> : <img src={Heart} alt={"Heart"}/>}
                        <H type={"body"}>{isFavorite ? "1" : "0"}</H>
                    </div>
                </div>
                {isFavorite ?
                    <Button type={"text"} state={"default"} onClick={handleSetFavorite}>В избранном</Button> :
                    <Button type={"text"} state={"default"} onClick={handleSetFavorite}>Добавить в избранное</Button>
                }
            </div>
        </div>
      </>
  );
};
