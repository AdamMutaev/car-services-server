import React from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";

import styles from "./serviceList.module.css";
import { useParams } from "react-router-dom";
import { deleteService } from "../../../redux/features/carService";

const ServiceList = () => {
  const carServices = useSelector((state) => state.carService.carServices);
  const token = useSelector((state) => state.authentication.token);
  const carServiceId = useSelector((state) => state.authentication.id);
  const { id } = useParams();
  const carService = carServices.find((carService) => carService._id === id);

  const dispatch = useDispatch();

  const handleDelete = (id, serviceId) => {
    dispatch(deleteService(id, serviceId));
  };

  const loading = useSelector((state) => state.carService.loading);

  return (
    <>
      <Input />
      <div className={styles.services}>
        <div>
          {loading
            ? "идет загрузка..."
            : carService.service.map((service) => {
                return (
                  <div className={styles.service__body} key={service._id}>
                    <div className={styles.service__container}>
                      <div className={styles.service__main}>
                        <div className={styles.name}>
                          <span>{service.name}</span>
                        </div>
                        <div className={styles.div_delete}>
                          <span>от {service.price}₽</span>
                          {carServiceId !==
                          carService._id ? null : !token ? null : (
                            <button
                              className={styles.btn_delete}
                              onClick={() => handleDelete(id, service._id)}
                            >
                              удалить
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>{" "}
    </>
  );
};

export default ServiceList;
