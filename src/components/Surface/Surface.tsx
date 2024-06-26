import {JSX} from "react";
import styles from "./Surface.module.css";

const Surface = ({children, isPrimary}: { children: JSX.Element; isPrimary: boolean }) => {
    return (
        <div className={`${styles.surfaceContainer} ${isPrimary ? "primary-bg" : "secondary-bg"}`}>
            <div className={styles.surfaceContent}>
                {children}
            </div>
        </div>
    );
};

export default Surface;