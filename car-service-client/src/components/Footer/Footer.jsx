import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import styles from "./footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <YMaps>
        <div>
          <Map
            width={"100%"}
            height={"300px"}
            defaultState={{ center: [43.278369, 45.692419], zoom: 10 }}
          >
            <Placemark geometry={[43.318369, 45.692419]} />
            <Placemark geometry={[43.292665, 45.867438]} />
            <Placemark geometry={[43.351882, 46.103535]} />
            <Placemark geometry={[43.130749, 45.541297]} />
          </Map>
        </div>
      </YMaps>
      <div className={styles.bgFooter}></div>
    </div>
  );
}
export default Footer;
