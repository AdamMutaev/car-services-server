import React from "react";
import styles from "./linksStyles/about.module.css";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about__body}>
      <div className={styles.about__container}>
        <div className={styles.about__header}>
          <h1 className={styles.about__title}>О нас.</h1>
          <div className={styles.about__text}>
            <p>
              Cover is a one-page template for building simple and beautiful
              home pages. Download, edit the text, and add your own fullscreen
              background photo to make it your own.
            </p>
          </div>
          <button className={styles.about__button}> <NavLink className={styles.about__toHome} to="/"> На главную </NavLink></button>
          <div className={styles.about__footer}>
            Cover template for Bootstrap, by @mdo.
          </div>
        </div>
      </div>
      <div className={styles.about__container}>
        <div className={styles.about__header}>
          <h1 className={styles.about__title}>Как создавался этот сайт.</h1>
          <div className={styles.about__text}>
            <p>
            При заполнении сайта разделу «О нас» зачастую не уделяют должного внимания. Но если посетитель планирует заказать товар или услугу, он почти всегда заходит на эту страницу. Не стоит его разочаровывать. Разбираем, как сделать страницу полезной для пользователя, что на ней должно быть и чего размещать не следует.
            При заполнении сайта разделу «О нас» зачастую не уделяют должного внимания. Но если посетитель планирует заказать товар или услугу, он почти всегда заходит на эту страницу. Не стоит его разочаровывать. Разбираем, как сделать страницу полезной для пользователя, что на ней должно быть и чего размещать не следует.
            </p>
          </div>
          <div className={styles.about__footer}>
            Cover template for Bootstrap, by @mdo.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
