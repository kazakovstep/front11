import cn from "classnames";
import styles from "../../style/summary.module.css";
import {H} from "../../components/Htag/Htag";
import Htag from "../../components/Htag/Htag.module.css";
import React, {useEffect, useState} from "react";
import {withSummaryAdvertLayout} from "../../Layout/SummaryAdvertLayout/SummaryAdvertLayout";
import {List} from "../../components/List/List";
import {Badge} from "../../components/Badge/Badge";
import list from "../../components/List/List.module.css"
import {Button} from "../../components/Button/Button";
import {Link, useLocation} from "react-router-dom";
import {getDataAll} from "../advert/advert";
export function AdvertCatalog(): JSX.Element {

    const [heroName, setHeroName] = useState("");
    const [heroDesc, setHeroDesc] = useState("");
    const [actorName, setActorName] = useState("");
    const [filmYear, setFilmYear] = useState("");
    const [filmName, setFilmName] = useState("");
    const [facts, setFacts] = useState([]);
    const [importantFact, setImportantFact] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [heroPics, setHeroPics] = useState([]);
    const [actorPic, setActorPic] = useState("");

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const advertId = params.get("advert_id");

    useEffect(() => {
        getDataAll().then((storedData) => {
            if (storedData) {
                const ad = storedData[advertId];
                setHeroDesc(ad.heroDesc);
                setHeroName(ad.heroName);
                setActorName(ad.actorName);
                setFilmName(ad.filmName);
                setFilmYear(ad.filmYear);
                setFacts(ad.facts);
                setImportantFact(ad.importantFact);
                setHeroPics(ad.heroPics);
                setActorPic(ad.actorPic);
                setSelectedCategories(ad.selectedCategories);
                setSelectedTags(ad.selectedTags);
            }
        });
}, [advertId]);


    return <>
        <div className={cn(styles.title_block)}>
            <H type={"h2"} className={cn(styles.title, Htag.h2)}>Приятного чтения интересных фактов о {heroName}</H>
            <H type={"h3"} className={cn(styles.title_mobile, Htag.h3)}>Приятного чтения интересных фактов о {heroName}</H>
            <H type={"body"} className={cn(styles.text, Htag.body)}>Если вы с чем-то не согласны, не судите автора строго,<br/>напишите в поддержку на главной странице сайта</H>
        </div>
        <div className={cn(styles.advert)}>
            <List orientation={"vertical"} className={cn(list.v_ul, styles.ul)}>
                <div className={cn(styles.advert_block)}>
                    <div className={styles.mainInfo}>
                        <H type={"h2"} className={cn(Htag.h2, styles.first_title)}>{heroName}</H>
                        <div className={styles.badges}>
                            <List orientation={"horizontal"} className={cn(styles.tags)}>
                                {selectedCategories.map((category, index) => (
                                    <Badge key={index} type={"category"} checked={false}>{category}</Badge>
                                ))}
                            </List>
                            <List orientation={"horizontal"} className={cn(styles.tags)}>
                                {selectedTags.map((tag, index) => (
                                    <Badge key={index} type={"tag"} checked={false}>{tag}</Badge>
                                ))}
                            </List>
                        </div>
                    </div>
                    <H type={"body"}>{heroDesc}</H>
                </div>
            </List>
        </div>
        <div className={styles.film_info}>
            <H type={"h3"}>Актер: {actorName}</H>
            <div className={styles.film_info_name}>
                <H type={"h3"}>Фильм: {filmName}</H>
                <H type={"h3"}>Год: {filmYear}</H>
            </div>
        </div>
        <div className={styles.img_block}>
            <div className={styles.img_container}>
                <img src={actorPic} alt={"actorPic"} className={styles.img}/>
            </div>
            <H type={"h2"} className={cn(Htag.h2, styles.arrow)}>➜</H>
            {heroPics.map((pic, index) => (
                <div key={index} className={styles.img_container}>
                    <img src={pic} alt={"heroPic"} className={styles.img}/>
                </div>
            ))}
        </div>
        <div className={styles.Fact}>
            <H type={"h2"}>Главный факт:</H>
            <div className={styles.fact}>
                <H type={"h3"}>{importantFact[0]?.fact}</H>
                <H type={"body"}>{importantFact[0]?.desc}</H>
            </div>
        </div>
        {facts.length >= 1 ?
        <div className={styles.Fact}>
            <H type={"h2"}>Факты:</H>
            {facts.map((fact, index)=>(
                <div key={index} className={styles.fact}>
                    <H type={"h3"}>{fact?.fact}</H>
                    <H type={"body"}>{fact?.desc}</H>
                </div>
            ))}
        </div> : null}
        <div className={cn(styles.buttons, styles.catalogAdvert)}>
            <div></div>
            <Link to={"/catalog"}>
                <Button state={"default"} type={"primary"} className={cn(styles.button)}>В каталог</Button>
            </Link>
        </div>
    </>
}

export default withSummaryAdvertLayout(AdvertCatalog);