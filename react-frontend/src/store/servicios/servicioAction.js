import axios from "axios";
import config from "../../config";
import { SERVICIO, SERVICIO_SUCCESS, SERVICIO_ERROR } from "./servicioReducer";

export const fetchServiciosAction = () => async (dispatch, getState) => {
  dispatch({
    type: SERVICIO,
  });

  try {
    const response = await axios.get(`${config.API_URL}/servicios`);
    dispatch({
      type: SERVICIO_SUCCESS,
      payload: {
        servicios: response.data.data,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: SERVICIO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const getServicioAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: SERVICIO,
  });

  try {
    const response = await axios.get(`${config.API_URL}/servicio/${id}`);
    dispatch({
      type: SERVICIO_SUCCESS,
      payload: {
        servicio: response.data,
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: SERVICIO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const createServicioAction = (form) => async (dispatch, getState) => {
  dispatch({
    type: SERVICIO,
  });

  try {
    const response = await axios.post(`${config.API_URL}/servicio`, form);
    dispatch({
      type: SERVICIO_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: SERVICIO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const updateServicioAction = (id, form) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: SERVICIO,
  });

  try {
    const response = await axios.update(
      `${config.API_URL}/servicio/${id}`,
      form
    );
    dispatch({
      type: SERVICIO_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: SERVICIO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const deleteServicioAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: SERVICIO,
  });

  try {
    const response = await axios.delete(`${config.API_URL}/servicio/${id}`);
    dispatch({
      type: SERVICIO_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: SERVICIO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const searchServicioAction = (termino) => async (dispatch, getState) => {
  dispatch({
    type: SERVICIO,
  });

  try {
    const response = await axios.get(
      `${config.API_URL}/servicios/buscar/${termino}`
    );
    dispatch({
      type: SERVICIO_SUCCESS,
      payload: {
        search: response.data,
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: SERVICIO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};
