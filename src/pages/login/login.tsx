import Surface from "../../components/Surface/Surface.tsx";
import styles from "./login.module.css";
import {useForm} from "react-hook-form";
import {login} from "../../api/AuthApi.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const {register, handleSubmit} = useForm();
    const [passwordIncorrect, setPasswordIncorrect] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit = (values: { password: string }) => {
        login(values)
            .then(data => {
                if (data.accessToken != null) {
                    localStorage.setItem("access_token", data.accessToken);
                    navigate("/admin");
                } else {
                    setPasswordIncorrect(true);
                }
            })
            .catch(error => {
                console.error(error);
                setPasswordIncorrect(true);
            })
    }

    return (
        <main>
            <div className={styles.centeredContainer}>
                <Surface isPrimary={true}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.content}>
                            <h1>Хуй?</h1>
                            <input
                                className={`${styles.textInput} ${passwordIncorrect ? styles.passwordIncorrect : ""}`}
                                type={"password"}
                                placeholder={"Пароль"}
                                {...register("password", {onChange: () => setPasswordIncorrect(false)})}/>
                            {passwordIncorrect && <label className={styles.errorLabel}>
                                Неверный пароль,<br/>
                                перестань пожалуйста 🥺
                            </label>}
                            <button className={styles.loginButton}>Войти</button>
                        </div>
                    </form>
                </Surface>
            </div>
        </main>
    )
}

export default Login;