import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./input.module.css";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { addService } from "../../../redux/features/carService";

const Input = () => {
  const carServices = useSelector((state) => state.carService.carServices);
  const token = useSelector((state) => state.authentication.token);
  const carServiceId = useSelector((state) => state.authentication.id);
  const { id } = useParams();
  const carService = carServices.find((carService) => carService._id === id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  const handleService = (e) => {
    setName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleClick = () => {
    dispatch(addService(name, price, id));
    setName("");
    setPrice("");
  };

  return (
    <div className={styles.input__body}>
      <div className={styles.input__container}>
        {carServiceId !== carService._id ? null : !token ? null : (
          <div className={styles.input__main}>
            <div>
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Введите услугу"
                type="text"
                value={name}
                name="name"
                placeholder="Введите услугу..."
                onChange={(e) => handleService(e)}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Укажите стоимость"
                variant="outlined"
                type="text"
                value={price}
                name="price"
                placeholder="Введите цену..."
                onChange={(e) => handlePrice(e)}
              />
            </div>
            <div>
              <button
                className={styles.input__button}
                type="button"
                onClick={handleClick}
                disabled={!name || !price}
              >
                добавить услугу
              </button>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
