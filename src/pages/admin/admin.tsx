import styles from "./admin.module.css";

import {randomPhrase, timeGreeting} from "../../utlis/mems.ts";
import Collapsible from "../../components/Collapsible/Collapsible.tsx";
import {useNavigate} from "react-router-dom";
import {isTokenValid, removeToken} from "../../utlis/auth.ts";

const Admin = () => {
    const navigate = useNavigate();

    if (!isTokenValid()) {
        removeToken();
        navigate("/login");
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
                    <h3>Ушли на доработку</h3>
                </Collapsible>
                <Collapsible title={"Карточки"}>
                    <h3>Надо будет карточки сделать</h3>
                </Collapsible>
            </div>
        </main>
    )
}

export default Admin;
