import Surface from "../../components/Surface/Surface.tsx";
import styles from "./login.module.css";
import {useForm} from "react-hook-form";
import {login} from "../../api/AuthApi.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../utlis/auth.ts";

interface FormValues {
    password: string;
}

const Login = () => {
    const {register, handleSubmit} = useForm<FormValues>();
    const [passwordIncorrect, setPasswordIncorrect] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit = (values: FormValues) => {
        login(values)
            .then(data => {
                if (data.token != null) {
                    setToken(data.token);
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
                                id={"password"}
                                placeholder={"Пароль"}
                                {...register("password", {onChange: () => setPasswordIncorrect(false)})}/>
                            {passwordIncorrect && <label htmlFor="password" className={styles.errorLabel}>
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
