import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../../redux/features/authentication";
import styles from "./header.module.css";
import { Link } from "react-scroll";
import wheel from "../../assets/disk.png";

const Header = () => {
  const token = useSelector((state) => state.authentication.token);
  const id = useSelector((state) => state.authentication.id);
  const carServices = useSelector((state) => state.carService.carServices);

  const carService = carServices.find((carService) => id === carService._id);

  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.loading}>
          <img width={100} src={wheel} alt="" />
        </div>
        <div className={styles.header__main}>
          <div className={styles.header__row}>
            {!token ? (
              <button className={styles.signin}>
                <NavLink to="/signin">Войти</NavLink>
              </button>
            ) : (
              <button className={styles.signin} onClick={handleClickLogout}>
                Выйти
              </button>
            )}
            {token ? (
              <NavLink
                to={`/card/${id}`}
                style={{
                  color: "#6da0f5",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                {carService ? carService.name : null}
              </NavLink>
            ) : null}
            <NavLink to="/about">О нас</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
            <NavLink to="/faq">Вопросы</NavLink>
            <NavLink to="/review">Игра</NavLink>
          </div>
        </div>
        <div className={styles.header__title}>
          <h1 className={styles.headerAnimation}>
            Поиск выгодного автосервиса для решения проблем вашего авто
          </h1>
          <button className={styles.button_23}>
            <Link to="carts" smooth={true} duration={700}>
              список автосервисов
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
//
