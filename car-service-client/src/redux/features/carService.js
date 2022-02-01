const initialState = {
  carServices: [],
  loading: false,
  error: null,
};

export const carService = (state = initialState, action) => {
  switch (action.type) {
    case "carService/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "carService/load/fulfilled":
      return {
        ...state,
        carServices: action.payload,
        loading: false,
      };
    case "carService/load/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "carService/create/pending":
      return {
        ...state,
        loading: true,
      };
    case "carService/create/fulfilled":
      return {
        ...state,
        carServices: [...state.carServices, action.payload],
        loading: false,
      };
    case "carService/create/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "carService/delete/pending":
      return {
        ...state,
        loading: true,
      };
    case "carService/delete/fulfilled":
      return {
        ...state,
        carServices: state.carServices.filter((item) => {
          if (item._id !== action.payload) {
            return item;
          }
          return state;
        }),
        loading: false,
      };
    case "carService/delete/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "carService/update/pending":
      return {
        ...state,
        loading: true,
      };
    case "carService/update/fulfilled":
      return {
        ...state,
        carServices: state.carServices.map((item) => {
          if (item._id === action.payload) {
            return item;
          }
          return item;
        }),
      };

    case "carService/update/image/fulfilled":
      return {
        ...state,
        carServices: state.carServices.map((item) => {
          if (item._id === action.payload._id) {
            item.img = action.payload.img;
            return item;
          }
          return state.carServices;
        }),
      };

    case "service/create/fulfilled":
      return {
        ...state,
        carServices: state.carServices.map((item) => {
          if (item._id === action.payload._id) {
            item = action.payload;
            return item;
          }
          return state;
        }),
      };

    case "service/delete/fulfilled":
      return {
        ...state,
        carServices: state.carServices.map((item) => {
          if (item._id === action.payload._id) {
            item = action.payload;
            return item;
          }
          return state;
        }),
      };

    default:
      return state;
  }
};

export const deleteService = (id, serviceId) => {
  return async (dispatch) => {
    dispatch({ type: "service/delete/pending" });
    try {
      const res = await fetch(`/delete/one/service/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ _id: serviceId }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await res.json();

      dispatch({ type: "service/delete/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "service/delete/rejected", payload: e });
    }
  };
};

export const addService = (name, price, id) => {
  return async (dispatch) => {
    dispatch({ type: "service/create/pending" });
    try {
      const res = await fetch(`/carservice/add/services/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name, price }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await res.json();

      dispatch({ type: "service/create/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "service/create/rejected", payload: e });
    }
  };
};

export const uploadAvatar = (file, id) => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({ type: "carService/update/image/pending" });
    try {
      const formData = new FormData();
      formData.append("img", file);
      const res = await fetch(`/carservice/${id}/avatar`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${state.authentication.token}`,
        },
      });
      const data = await res.json();

      dispatch({ type: "carService/update/image/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "carService/update/image/rejected", payload: error });
    }
  };
};

export const loadCarServices = () => {
  return async (dispatch) => {
    dispatch({ type: "carService/load/pending" });
    try {
      const res = await fetch("/carservice");
      const carServices = await res.json();

      dispatch({ type: "carService/load/fulfilled", payload: carServices });
    } catch (e) {
      dispatch({ type: "carService/load/rejected", payload: e });
    }
  };
};
