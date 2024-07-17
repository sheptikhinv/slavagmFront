import styles from "./error.module.css";
import {Link} from "react-router-dom";

const error = () => {
    return (
        <div className={styles.centeredContainer}>
            <div className={styles.content}>
                <h1>Бро, что ты тут забыл?</h1>
                <h2>Давай назад, зацени сколько приколов я сделал</h2>
                {/*<button className={styles.homeButton}>На главную</button>*/}
                <Link to={"/"}>На главную</Link>
            </div>
        </div>
    )
}

export default error;