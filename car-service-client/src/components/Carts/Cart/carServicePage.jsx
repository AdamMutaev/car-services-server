import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./carService.module.css";
import { loadCarServices, uploadAvatar } from "../../../redux/features/carService";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import inputIcon from "../../../assets/input__file__icon.png";
import ServiceList from "../services/ServiceList";

const CarServicePage = () => {
  const carServices = useSelector((state) => state.carService.carServices);
  const token = useSelector((state) => state.authentication.token);
  const carServiceId = useSelector((state) => state.authentication.id);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadCarServices());
  }, [dispatch]);

  const handleChangeImg = (e) => {
    dispatch(uploadAvatar(e.target.files[0], id));
  };

  const carService = carServices.find((carService) => carService._id === id);

  if (!carServices.length) {
    return "загрузка";
  }

  return (
    <div className={styles.bodyCar}>
      <div>
        <div className={styles.imageCar}>
          <div className={styles.nameCar}>
            <div className={styles.mright}>{carService.name} </div>
            {carServiceId !== carService._id ? null : !token ? null : (
              <div className={styles.input__wrapper}>
                <input
                  onChange={(e) => handleChangeImg(e)}
                  name="file"
                  type="file"
                  id="input__file"
                  className={`${styles.input} ${styles.input__file}`}
                  multiple
                />
                <label
                  htmlFor="input__file"
                  className={styles.input__file_button}
                >
                  <span className={styles.input__file_button_text}>
                    <img
                      className={styles.input__file_icon_wrapper}
                      src={inputIcon}
                      alt=""
                    />
                  </span>
                </label>
              </div>
            )}
          </div>
          {carService.img ? (
            <img src={`/${carService.img}`} alt="avatar" />
          ) : (
            <img
              src="https://www.sdeuropean.co.nz/edit/image_cache/shutterstock_7271708712_2000x1335c0pcenter.jpg"
              alt=""
            />
          )}
          <div className={styles.shadow}></div>
        </div>
        <div>
          <div className={styles.addressBody}>
            <div className={styles.addressCard}>
              <button className={styles.cardButton}>
                <NavLink to="/">На главную</NavLink>
              </button>
              <hr />
              <h2>Адрес:</h2>
              <div className={styles.addressCar}>
                <div className={styles.addressCarText}>
                  г.{carService.address.city}, ул.
                  {carService.address.street}, {carService.address.number}
                </div>
              </div>
              <h2>Описание:</h2>
              <div className={styles.addressCar}>
                <div className={styles.textCar}>{carService.text}</div>
              </div>
            </div>
          </div>

          <div className={styles.addressBody}>
            <div className={styles.addressCard}>
              <h2>Почта:</h2>
              <div className={styles.addressCar}>
                <div className={styles.qwerr}>{carService.email}</div>
              </div>
              <h2>Телефон:</h2>
              <div className={styles.addressCar}>
                <div className={styles.qwerr}>{carService.phone}</div>
              </div>
            </div>
          </div>
        </div>
        <ServiceList />
      </div>
      <YMaps>
        <div>
          <Map
            width={"100%"}
            height={"300px"}
            defaultState={{ center: [carService.address.coordinate.lat, carService.address.coordinate.long], zoom: 11 }}
          >
            <Placemark geometry={[carService.address.coordinate.lat, carService.address.coordinate.long]} />
          </Map>
        </div>
      </YMaps>
    </div>
  );
};

export default CarServicePage;
