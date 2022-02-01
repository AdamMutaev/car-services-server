import { createService } from "../../../redux/features/authentication";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./signUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

function SignUp() {
  const signingUp = useSelector((state) => state.authentication.signingUp);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const handleSubmit = () => {
    dispatch(
      createService(email, password, name, city, street, number, phone, text)
    );
    navigate("/signin");
  };
  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
      let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regEmail.test(String(e.target.value).toLowerCase())){
        setErrorEmail('Invalid Email');
      } else {
        setErrorEmail('')
      }
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    if(password.length < 3 || password.length > 20) {
      setErrorPassword("Пароль должен быть минимум 3 буквы и максимум 20 букв")
    } else {
      setErrorPassword("")
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.form} onSubmit={handleLogin}>
        <div className={styles.block}>
          <h1>Регистрация</h1>
          <h3 className={styles.error__authorization}>{errorEmail}</h3>
          <h3 className={styles.error__authorization}>{errorPassword}</h3>
          <div>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              type="email"
              value={email}
              placeholder="Введите email"
              onChange={(e) => handleChangeEmail(e)}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="password"
              variant="standard"
              type="password"
              value={password}
              placeholder="Введите пароль"
              onChange={handleChangePassword}
            />
          </div>
          <div className={styles.inputTop}>
            <TextField
              id="standard-basic"
              label="name"
              variant="standard"
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h2>Номер телефона</h2>
            <TextField
              id="standard-basic"
              label="phone"
              variant="standard"
              type="tel"
              value={phone}
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <h2>Адрес</h2>
            <TextField
              id="standard-basic"
              label="city"
              variant="standard"
              type="text"
              value={city}
              placeholder="city"
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="street"
              variant="standard"
              type="text"
              value={street}
              placeholder="street"
              onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="number"
              variant="standard"
              type="number"
              value={number}
              placeholder="number"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            <textarea
              className={styles.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              name=""
              id=""
              cols="30"
              placeholder="text"
              rows="10"
            />
          </div>
          <div>
            <button
              className={styles.btn}
              disabled={
                signingUp ||
                !email ||
                !password ||
                !name ||
                !city ||
                !street ||
                !number ||
                !phone ||
                !text 
              }
              onClick={handleSubmit}
            >
              Регистрация
            </button>
          </div>
          <span>Уже есть аккаунт?</span>
          <Link to="/signin">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
