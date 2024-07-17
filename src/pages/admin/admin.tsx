import styles from "./admin.module.css";

import {randomPhrase, timeGreeting} from "../../utlis/mems.ts";
import Collapsible from "../../components/Collapsible/Collapsible.tsx";
import {useEffect, useState} from "react";
import {Skill} from "../../types/skill.ts";
import {CardType} from "../../types/cardType.ts";
import {getSkills} from "../../api/SkillsApi.ts";
import {getCards} from "../../api/CardsApi.ts";
import RecursiveList from "../../components/RecursiveList/RecursiveList.tsx";

const Admin = () => {
    const [skills, setSkills] = useState<Array<Skill>>([]);
    const [cards, setCards] = useState<Array<CardType>>([]);

    useEffect(() => {
        getSkills()
            .then(response => setSkills(response))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        getCards()
            .then(response => setCards(response))
            .catch(error => console.error(error));
    }, []);

    return (
        <main className={styles.admin}>
            <div className={styles.memBlock}>
                <h1>{`${timeGreeting()}`}</h1>
                <h2>{`${randomPhrase()}`}</h2>
            </div>
            <div className={styles.collapsiblesBlock}>
                <Collapsible title={"Изображение"}>
                    <h3>Блин это вообще хз когда</h3>
                </Collapsible>
                <Collapsible title={"Обо мне"}>
                    <h3>Ну однажды можно будет менять наверное хз</h3>
                </Collapsible>
                <Collapsible title={"Скиллы"}>
                    <h3>Надо будет скиллы сделать</h3>
                </Collapsible>
                <Collapsible title={"Карточки"}>
                    <h3>Надо будет карточки сделать</h3>
                </Collapsible>
            </div>
        </main>
    )
}

export default Admin;