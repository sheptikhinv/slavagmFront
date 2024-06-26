import Header from "../../components/Header/Header.tsx";
import Surface from "../../components/Surface/Surface.tsx";
import RecursiveList from "../../components/RecursiveList/RecursiveList.tsx";
import {useEffect, useState} from "react";
import {getSkills} from "../../api/SkillsApi.ts";
import {Skill} from "../../types/skill.ts";
import {CardType} from "../../types/cardType.ts";
import {getCards} from "../../api/CardsApi.ts";
import Card from "../../components/Card/Card.tsx";
import styles from "./index.module.css";

const Index = () => {
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
        <>
            <Header/>
            <main>
                <section className={styles.about}>
                    <Surface isPrimary={true}>
                        <>
                            <h2 className={styles.containerTitle}>Обо мне</h2>
                            <div className={styles.aboutContainer}>
                                <div className={styles.imageContainer}>
                                    <img src={"bigLogo.png"}/>
                                </div>
                                <div className={styles.info}>
                                    <ul>
                                        <li>Студент УрФУ ИРИТ-РТФ, 2023-2027</li>
                                        <li>09.03.04 Программная инженерия</li>
                                        <li>Опыт в программировании более 19 лет</li>
                                    </ul>
                                    <p>
                                        "все ****** мы гении"<br/>
                                        "все ****** мы ******"<br/>
                                        "маус ивент?"<br/>
                                    </p>
                                </div>
                            </div>
                        </>
                    </Surface>
                    <Surface isPrimary={false}>
                        <div className={styles.skillsContainer}>
                            <h2 className={styles.containerTitle}>Мой стэк</h2>
                            {skills ? <RecursiveList items={skills}/> : "Loading"}
                        </div>
                    </Surface>
                </section>

                <section className={styles.cards}>
                    {cards.map((card: CardType) => (
                        <Card key={card.id} card={card}/>
                    ))}
                </section>
            </main>
        </>
    );
}

export default Index;