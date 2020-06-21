import axios from "axios";
import config from "../../config";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOADING,
} from "./authReducer";
import { REGISTER, REGISTER_SUCCESS, REGISTER_ERROR } from "./authReducer";

export const loading = (tokenLocal) => async (dispatch) => {
  await dispatch({
    type: LOADING,
    payload: {
      token: tokenLocal,
    },
  });
};
export const loginAction = (form) => async (dispatch, getState) => {
  console.log("Login: ", form);
  dispatch({
    type: LOGIN,
  });
  const loginform = {
    email: "customer@correo.com",
    password: "123456",
  };

  // try {
  const response = await axios.post(`${config.API_URL}/login`, loginform);

  if (response.data.ok === true) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response.data.data,
        token: response.data.token,
      },
    });

    localStorage.setItem("token", response.data.token);
    return response;
  }

  dispatch({
    type: LOGIN_ERROR,
    payload: { message: response.data.err.message },
  });
};

export const logoutAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOGOUT,
      payload: {
        user: {},
        token: "",
      },
    });

    localStorage.removeItem("token");
  } catch (error) {}
};

export const registerAction = (form) => async (dispatch, getState) => {
  console.log("Register: ", form);
  dispatch({
    type: REGISTER,
  });

  try {
    const response = await axios.post(`${config.API_URL}/register`, form);
    // console.log('Success Register: ', response.data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { message: response.message },
    });

    return response;
  } catch (error) {
    console.log("Error Register: ", error);
    dispatch({
      type: REGISTER_ERROR,
      payload: { message: "Ocurrió un error en el registro" },
    });

    return error;
  }
};
