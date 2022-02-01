import { logIn } from "../../../redux/features/authentication";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

function SignIn() {
  const signIn = useSelector((state) => state.authentication.signin);
  const error = useSelector((state) => state.authentication.error);
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [passwordShown, setPasswordShown] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(logIn(email, password));
  };

  if (token) {
    navigate('/')
  }

  const handleLogin = (e) => {
    e.preventDefault();
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(String(e.target.value).toLowerCase())) {
      setErrorEmail('Invalid Email');
    } else {
      setErrorEmail('')
    }
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    if (password.length < 3 || password.length > 20) {
      setErrorPassword("Пароль должен быть минимум 3 буквы и максимум 20 букв")
    } else {
      setErrorPassword("")
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.image}>
          <img src="https://service.bots.urent.ru/img/img-01.452e4503.png" alt="" />
        </div>
        <div className={styles.block}>
          <h2>Авторизация</h2>
          <h3 className={styles.error__authorization}>{error}</h3>
          <h4 className={styles.error__authorization}>{errorEmail}</h4>
          <h4 className={styles.error__authorization}>{errorPassword}</h4>
          <div>
            <TextField
              id="standard-basic"
              label="email"
              variant="standard"
              type="email"
              value={email}
              placeholder="Введите email"
              onChange={handleChangeEmail}
            />
          </div>
          <div className={styles.password}>
            <TextField
              id="standard-basic"
              label="password"
              variant="standard"
              type={passwordShown ? "text" : "password"}
              value={password}
              placeholder="Введите пароль"
              onChange={handleChangePassword}
            />
            <img src="https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-eye-9.png"
              alt=""
              className={styles.eye}
              onClick={togglePassword} />
          </div>
          <div>
            <button
              className={styles.btn}
              disabled={!email || !password || signIn}
              onClick={handleSubmit}
            >
              Войти
            </button>
          </div>
          <span>У вас нет акаунта?</span>
          <Link to="/signup">Регистрация</Link>
          <div className={styles.homeButton}>
            <Link to="/">Главное меню</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
