import styles from "./admin.module.css";

import {randomPhrase, timeGreeting} from "../../utlis/mems.ts";
import Collapsible from "../../components/Collapsible/Collapsible.tsx";
import CollapsibleSkillList from "../../components/CollapsibleRecursiveList/CollapsibleSkillList.tsx";
import {useEffect, useState} from "react";
import {getSkills} from "../../api/SkillsApi.ts";
import {Skill} from "../../types/skill.ts";
import {useNavigate} from "react-router-dom";
import {isTokenValid, removeToken} from "../../utlis/auth.ts";

const Admin = () => {
    const [skills, setSkills] = useState<Array<Skill>>();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            removeToken();
            navigate("/login");
        } else {
            setIsAuthChecked(true);
        }
    }, [navigate]);

    useEffect(() => {
        if (isAuthChecked) {
            getSkills()
                .then(response => setSkills(response))
                .catch(error => console.error(error));
        }
    }, [isAuthChecked]);

    if (!isAuthChecked) {
        return null;
    }


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
                    {skills ? <CollapsibleSkillList items={skills}/> : <b>"Loading"</b>}
                </Collapsible>
                <Collapsible title={"Карточки"}>
                    <h3>Надо будет карточки сделать</h3>
                </Collapsible>
            </div>
        </main>
    )
}

export default Admin;