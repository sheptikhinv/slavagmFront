import {JSX, useState} from "react";
import styles from "./Collapsible.module.css";

const Collapsible = ({title, children}: { title: string, children: JSX.Element }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    }

    return <div>
        <button className={`${styles.collapsibleHeader} ${isOpen ? styles.collapsibleHeader__open : ""}`}
                onClick={toggleSection}>{title}</button>
        <div className={`${styles.collapsibleContent} ${isOpen ? styles.collapsibleContent__open : ""}`}>
            <div>{children}</div>
        </div>
    </div>
}

export default Collapsible;