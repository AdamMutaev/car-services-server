const initialState = {
  error: null,
  signingUp: false,
  signingIn: false,
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case "authentication/signup/pending":
      return {
        ...state,
        signingUp: true,
        error: null,
      };
    case "authentication/signup/fulfilled":
      return {
        ...state,
        signingUp: false,
      };
    case "authentication/signup/rejected":
      return {
        ...state,
        signingUp: false,
        error: action.error,
      };
    case "authentication/signin/pending":
      return {
        ...state,
        signingIn: true,
        error: null,
      };
    case "authentication/signin/fulfilled":
      return {
        ...state,
        signingIn: false,
        id: action.payload.json.id,
        token: action.payload.json.token,
      };
    case "authentication/signin/rejected":
      return {
        ...state,
        signingIn: false,
        error: action.error,
      };
    case "authentication/logout/fulfilled":
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};

export const createService = (
  email,
  password,
  name,
  city,
  street,
  number,
  phone,
  text
) => {
  return async (dispatch) => {
    dispatch({ type: "authentication/signup/pending" });

    const res = await fetch("/carservice/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
        city,
        street,
        number,
        phone,
        text,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await res.json();
    if (json.error) {
      dispatch({ type: "authentication/signup/rejected", error: json.error });
    } else {
      dispatch({ type: "authentication/signup/fulfilled", payload: json });
    }
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "authentication/signin/pending" });

    const res = await fetch("/carservice/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await res.json();

    if (json.error) {
      dispatch({ type: "authentication/signin/rejected", error: json.error });
    } else {
      dispatch({
        type: "authentication/signin/fulfilled",
        payload: { json },
      });
      localStorage.setItem("token", json.token);
      localStorage.setItem("id", json.id);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: "authentication/logout/fulfilled" });
    localStorage.clear();
  };
};
